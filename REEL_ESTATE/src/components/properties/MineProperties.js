import React, { useState, useEffect } from 'react'
import { Card, Dropdown, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { getMyProperties } from '../../api/properties'
import { BsSearch } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const MineProperties = (props) => {
    const [myProperties, setMyProperties] = useState(null)
    const {user} = props
    const [property, setProperty] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    

    useEffect(() => {
        getMyProperties(user)
            .then(res => {
                setMyProperties(res.data.properties)
            })
            .catch(console.error)
    }, [])

    if (!myProperties) {
        return <p>loading...</p>
    }
    else if (myProperties.length === 0) {
        return <Link to='/addProperty' > <h4 className="text-center"> Looks like you have no property listings. Click here to add one! </h4> </Link>
    }




    
    let propertyCards

    if(myProperties.length > 0) {
        propertyCards = myProperties.filter((property) => {
            if (searchTerm == '') {
                return property
            }
            else if (property.address.split(',')[1].toLowerCase().includes(searchTerm.toLowerCase())) {
                return property
            }
        }).map((property) => {
            let cityState =  property.address.split(',')[1] + property.address.split(',')[2]
            return (
                <Card key={property._id} style={{ width: '30%' }} className="container m-2">
                    <Card.Body>
                        <Link to={`/properties/${property._id}`}>
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-20 col-sm-24">
                                        <div class="box">
                                            <img src={property.image1}/>
                                            <div class="box-content">
                                                <div class="overlay-img">
                                                    <img src={property.image1}/>
                                                </div>
                                                <div class="inner-content">
                                                    <h3 class="title">{property.address} </h3>
                                                    <span class="post">Seller: {property.owner.fullName}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Card.Body>
                        <Card.Footer>
                            <Card.Text>
                                <div className='city-state'>
                                    <h6><MdLocationOn /> {property.address.split(',')[1] + property.address.split(',')[2]}</h6>
                                </div>
                                <div className='property-metrics'>
                                    <Link to={`/properties/${property._id}`}>
                                        <Button variant="outline-dark">View Property</Button>
                                    </Link>
                                    <h6 className='property-price'>${property.price / 1000000} M &nbsp;&nbsp;&nbsp; <span><FaBed /> {property.bedrooms}</span> &nbsp;&nbsp;<span><FaBath /> {property.bedrooms}</span></h6>
                                </div>
                            </Card.Text>
                        </Card.Footer>
                </Card>

            )
    })
}

    return (
        <>
            <h3 className='titleText'>My Property Listings</h3>
            <div className='SearchBar_container'>
                <div className="searchBar_fields">
                    <div className="search_text">
                        <h3>Search Luxury Real Estate</h3>
                    </div>
                    <div className="search_input">
                        <input className='search_bar' type='text' placeholder='search by city' onChange={(e) => {setSearchTerm(e.target.value)}}/>
                        <BsSearch />
                    </div>
                </div>
            </div>
            <div style={cardContainerLayout}>
                {propertyCards}
            </div>
        </>
    )
}

export default MineProperties