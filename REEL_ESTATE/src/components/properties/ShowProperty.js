import React, { useState, useEffect } from "react";
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom";
import { getOneProperty, updateProperty, removeProperty } from "../../api/properties";
import { Spinner, Container, Carousel, Card, Button, Form } from "react-bootstrap";
// import { addToCart } from "../../api/products";
import EditPropertiesModel from "./EditProperties";
// import ReviewForm from '../reviews/ReviewForm'
import ShowReview from '../reviews/ShowReview'
import GiveReviewModal from "../reviews/CreateReview";
import MessageModal from "../messages/CreateMessage";
import ShowMessage from "../messages/ShowMessages";
import Contact from "../messages/Contact";
import '../../styling/HouseDescription.css'

const ShowProperty = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const [messageModalOpen, setMessageModalOpen] = useState(false)
    const [property, setProperty] = useState(null)
    const {propertyId} = useParams()
    const { user, msgAlert } = props
    const navigate = useNavigate()

    // ********** Email Contact Agent **********
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

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

    // ********** Email Contact Agent **********
    const resetForm = () => {
        setEmail("");
        setMessage("");
        setSubject("");
        navigate("/");
      };
    
    const sendMessage = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("email", email);
        data.append("subject", subject);
        data.append("message", message);

    const dev_url = "http://127.0.0.1:3000/contact";
    const production_url = "/contact"
    axios
        .post(production_url, data)
        .then((response) => {
        console.log(response);
        }, resetForm())
        .catch((error) => {
        console.log(error);
        });
    };


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

    return (
        <>
            <div className="House__detailContainer">
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
                <div className="House__details">
                    <h4>Seller: {property.owner.fullName}</h4>
                    <h4 className="house__price"><b>{`${property.address}`}</b></h4>
                    <div className="House__detail" key={property._id}>
                        <Carousel>
                            <Carousel.Item>
                                <img width={700} height={500} src={property.image1} alt="Property Image" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} src={property.image2} alt="Property Image" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} src={property.image3} alt="Property Image" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} src={property.image4} alt="Property Image" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img width={900} height={500} src={property.image5} alt="Property Image" />
                            </Carousel.Item>
                        </Carousel>
                    <div className="info">
                        <h4 className="house__price"><b>{`$${property.price/1000000} M`}</b></h4>
                        <h4 className="houseBedsAndState">{`${property.bedrooms} Bedroom house in ${property.address} for $${property.price/1000000} M`}</h4>
                        <h4 className="house__location">{`House located at: ${property.address}`}</h4>
                        <div className="more__info">
                        <div className="bedRoomCount">
                            {/* <HotelIcon /> */}
                            <h5>{property.bedrooms}</h5>
                        </div>
                        <div className="showersCount">
                            {/* <BathtubIcon /> */}
                            <h5>{property.bedrooms}</h5>
                        </div>
                        {/* <div className="parkingSpace">
                            <DriveEtaIcon />
                            <h5>{property.garages}</h5>
                        </div> */}
                        </div>
                    </div>
                    <div className="House__textDetail">
                        <h4>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Aliquam tempore, ullam nulla architecto dolorem soluta
                        labore esse minus in reiciendis, eius deleniti officia
                        ratione voluptate atque illo ab assumenda odit dolor! Beatae
                        debitis distinctio libero?
                        </h4>
                    </div>
                    </div>
                </div>
                <div className="Contact__agentForm">
                    <form className="Contact__AgentForm">
                    <h3>Contact Agent</h3>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <label>Subject</label>
                    <input
                        type="text"
                        placeholder="Enter the subject of message"
                        required
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <br />
                    <label>Message</label>
                    <textarea
                        cols="30"
                        rows="5"
                        required
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <br />
            
                    <button onClick={sendMessage}>SEND MESSAGE</button>
                    </form>
                </div>
            </div>
        </>
    )
}

    // return(
    //     <>
    //     <div className="userNameT">
    //         <Container>
    //             <Card.Body>
    //                 {
    //                 user && (property.owner == user._id)
    //                 ?
    //                 <>
    //                     <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
    //                         Edit Property Listing
    //                     </Button>
    //                     <Button onClick={() => removeTheProperty()} className="m-2" variant="danger">
    //                         Delete Property Listing
    //                     </Button>
    //                 </>
    //                 :
    //                 null
    //                 }                    
    //             </Card.Body>
    //                 <h3><b>Seller: {property.owner.fullName}</b> <button className="messageB" onClick={()=> setMessageModalOpen(true)}>Contact Agent</button></h3>
    //                 <Card.Img className='imgSP' style={{width:'18rem'}}
    //                     src={property.image1}
    //                     alt='property image1'
    //                 />
    //                 <h4>{property.address}</h4>
    //                 <p>${property.price}</p>
    //                 <p>Bedrooms: {property.bedrooms}</p>
    //                 <p>Bathrooms: {property.bathrooms}</p>
    //                 <p>Amenities:</p>
    //                 <ul>
    //                     {showAmenities()}
    //                 </ul>
    //                     <button className="reviewB" onClick={()=> setReviewModalOpen(true)}> Leave a Seller Review</button>
    //         </Container>
            
    //         <h3 className="titleText">Reviews: </h3>
    //         {reviews}
    //         <GiveReviewModal
    //             user={user}
    //             show= {reviewModalOpen}
    //             property={property}
    //             triggerRefresh={() => setUpdated(prev => !prev)}
    //             handleClose={()=> setReviewModalOpen(false)}
    //         />
    //         <EditPropertiesModel 
    //             property={property}
    //             show={modalOpen}
    //             user={user}
    //             triggerRefresh={() => setUpdated(prev => !prev)}
    //             updateProperty={updateProperty}
    //             handleClose={() => setModalOpen(false)}
    //         />
    //         <MessageModal
    //             user={user}
    //             show= {messageModalOpen}
    //             property={property}
    //             triggerRefresh={() => setUpdated(prev => !prev)}
    //             handleClose={()=> setMessageModalOpen(false)}
    //         />
    //         <Contact />
    //     </div>
    //     </>
    // )

export default ShowProperty