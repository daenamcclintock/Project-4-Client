import React, { useState, useEffect } from "react";
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom";
import { getOneProperty, updateProperty, removeProperty } from "../../api/properties";
import { Spinner, Container, Carousel, Button } from "react-bootstrap";
// import { addToCart } from "../../api/products";
import EditPropertiesModel from "./EditProperties";
import MessageModal from "../messages/CreateMessage";
import ShowMessage from "../messages/ShowMessages";
import Contact from "../messages/Contact";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";

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


    // Function to show the property amenitites
    // let propertyAmenities = property.amenities
    // const showAmenities = () => {
    //     return propertyAmenities.map((amenity) => {
    //         return (
    //             <li>{amenity}</li>
    //         )
    //     })
    // }

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
                    <h4>Seller: {property.owner.fullName} <button className="messageB" onClick={()=> setMessageModalOpen(true)}>Message Seller Directly</button></h4>
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
                        <br></br>
                        <h4 className="houseBedsAndState">{`${property.bedrooms} Bedroom house in ${property.address.split(',')[1] + ',' + property.address.split(',')[2]} for $${property.price/1000000} M`}</h4>
                        <br></br>
                        <h4 className="house__location">{`House located at: ${property.address}`}</h4>
                        <br></br>
                        <div className="more__info">
                        <div className="bedRoomCount">
                            <h4><FaBed /> {property.bedrooms}</h4>
                        </div>
                        <div className="showersCount">
                            <h4><FaBath /> {property.bedrooms}</h4>
                        </div>
                        {/* <div className="parkingSpace">
                            <DriveEtaIcon />
                            <h5>{property.garages}</h5>
                        </div> */}
                        </div>
                    </div>
                    <div className="amenities">
                    {/* Amenitites: */}
                        <ul>
                            {/* {showAmenities()} */}
                        </ul>
                    </div>
                    <div className="House__textDetail">
                        <h4>
                            <u>Description</u>
                            <br></br>
                            {property.description}
                        </h4>
                    </div>
                    </div>
                </div>
                <div className="Contact__agentForm">
                    <form className="Contact__AgentForm">
                    <h3>Email Agency</h3>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
            
                    <Button variant="secondary" size="lg" onClick={sendMessage}>SEND MESSAGE</Button>
                    
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
                        msgAlert = {msgAlert}
                    />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ShowProperty