import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneProperty, updateProperty, removeProperty } from "../../api/properties";
import { Spinner, Container, Card, Button, Form } from "react-bootstrap";
// import { addToCart } from "../../api/products";
import EditPropertiesModel from "./EditProperties";
// import ReviewForm from '../reviews/ReviewForm'
import ShowReview from '../reviews/ShowReview'
import GiveReviewModal from "../reviews/CreateReview";
import MessageModal from "../messages/CreateMessage";
import ShowMessage from "../messages/ShowMessages";
import Contact from "../messages/Contact";

const ShowProperty = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const [messageModalOpen, setMessageModalOpen] = useState(false)
    const [property, setProperty] = useState(null)
    const {propertyId} = useParams()
    const { user, msgAlert } = props
    const navigate = useNavigate()

    const formControlStyle = {
        width: '4%'
    }

    useEffect(() => {
        getOneProperty(propertyId)
            .then(res => {
                console.log('THIS IS PROPERTY', res.data.property)
                setProperty(res.data.property)
            })
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

    const showAmenities = () => {
        const amenities = property.amenities
        return amenities.map((amenity) => {
            return (
                <li>{amenity}</li>
            )
        })
    }


    let reviews
    
    if(property) {
        if(property.reviews.length > 0) {
            reviews = property.reviews.map(review => (
                <ShowReview key={review._id} updated={updated} review={review} property={property} user={user}
                triggerRefresh={()=> setUpdated(prev => !prev)}
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
                        <Button onClick={() => removeTheProperty()} className="m-2" variant="danger">
                            Delete Property Listing
                        </Button>
                    </>
                    :
                    null
                    }                    
                </Card.Body>
                    <h3><b>Seller: {property.owner.fullName}</b> <button className="messageB" onClick={()=> setMessageModalOpen(true)}>Contact Agent</button></h3>
                    <Card.Img className='imgSP' style={{width:'18rem'}}
                        src={property.image1}
                        alt='property image1'
                    />
                    <h4>{property.address}</h4>
                    <p>${property.price}</p>
                    <p>Bedrooms: {property.bedrooms}</p>
                    <p>Bathrooms: {property.bathrooms}</p>
                    <p>Amenities:</p>
                    <ul>
                        {showAmenities()}
                    </ul>
                        <button className="reviewB" onClick={()=> setReviewModalOpen(true)}> Leave a Seller Review</button>
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
            <MessageModal
                user={user}
                show= {messageModalOpen}
                property={property}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={()=> setMessageModalOpen(false)}
            />
            <Contact />
        </div>
        </>
    )
}

export default ShowProperty