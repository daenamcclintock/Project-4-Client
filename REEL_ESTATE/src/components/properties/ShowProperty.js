import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneProperty, updateProperty, removeProperty } from "../../api/properties";
import { Spinner, Container, Card, Button, Form } from "react-bootstrap";
// import { addToCart } from "../../api/products";
import EditPropertiesModel from "./EditProperties";
// import ReviewForm from '../reviews/ReviewForm'
import ShowReview from '../reviews/ShowReview'
import GiveReviewModal from "../reviews/CreateReview";

const ShowProperty = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const [property, setProperty] = useState(null)
    const [quantity, setQuantity] = useState(0)
    const {propertyId} = useParams()
    const { user, msgAlert } = props
    const navigate = useNavigate()

    const formControlStyle = {
        width: '4%'
    }

    console.log('property ID', propertyId)

    useEffect( () => {
        getOneProperty(propertyId)
            .then( res => setProperty(res.data.property))
            .catch(console.error)
    }, [updated])

    console.log('property: ', property)

    const handleChange = (e) => {
        e.persist()

        setProperty(prevProperty => {
            const name = e.target.name
            let value = e.target.value
            
            const updatedValue = { [name]:value }

            return {...prevProperty, ...updatedValue}
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(typeof propertyId)

        addToCart(propertyId, user)
            // Then we send success message
            .then( () =>
                msgAlert({
                    heading: 'Success!',
                    message: 'Property Listing added successfully!',
                    variant: 'success',
            }))
            // if there is an error, we'll send an error message
            .catch( () =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Property could not be added',
                    variant: 'danger',
            }))
        console.log('submitted!')
    }

    const removeTheProperty = () => {
        removeProperty(user, property._id)
        .then(() => {
            msgAlert({
                heading: 'Property Listing Removed!',
                message: 'Property successfully deleted',
                variant: 'success',
            })
        })
            .then(()=> {navigate('/')})
            .catch(() => {
                msgAlert({
                    heading: 'Something Went Wrong',
                    message: 'Unable to delete',
                    variant: 'danger',
                })
            })
    }


    let reviews
    
    if(property) {
        if(property.reviews.length>0){
            reviews = property.reviews.map(review=> (
                <ShowReview key={review._id} updated={updated} review={review} property={property} user={user}
                triggerRefresh={()=> setUpdated(prev=> !prev)}
                />
            ))
        }
    }

    if(!property)
    {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }

    // When you click 'Add To Cart' you need to send the propertyId to an order route to push it to productsOrdered array
    return(
        <>
        <div className="userNameT">
            <Container>
                <Card.Body>
                    {
                    user && (property.owner == user._id)
                    ?
                    <>
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Property Listing
                        </Button>
                        <Button onClick={() => removeTheProduct()} className="m-2" variant="danger">
                            Delete Property Listing
                        </Button>
                    </>
                    :
                    null
                    }                    
                </Card.Body>
                    <h3><b>{property.name}</b></h3>
                    <Card.Img className='imgSP' style={{width:'18rem'}}
                        src={property.image}
                        alt='property image'
                    />
                    <p>${property.price}</p>
                    {property.stock === 0 ? <p>Out-of-stock</p> : <p>In-stock: {property.stock}</p>}
                    <p>{property.description}</p>
                    <Form onSubmit={handleSubmit}>
                        {property.stock === 0 ? 
                        <Button className="m-2" variant="primary" disabled>Add To Cart</Button>
                        :
                        <button className="signInB" type='submit'>Add To Cart</button>
                        }
                    </Form>
                        <button className="reviewB" onClick={()=> setReviewModalOpen(true)}> Leave a Review</button>
            </Container>
            
            <h3 className="titleText">Reviews: </h3>
                {reviews}
                <GiveReviewModal
                    user={user}
                    show= {reviewModalOpen}
                    property={property}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                    handleClose={()=> setReviewModalOpen(false)}
                />
            <EditPropertiesModel 
                property={property}
                show={modalOpen}
                user={user}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateProperty={updateProperty}
                handleClose={() => setModalOpen(false)}
            />
        </div>
        </>
    )
}

export default ShowProperty