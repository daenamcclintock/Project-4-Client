import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAllProperties } from '../../api/properties'
import '../../styling/Search.css'
import { BsSearch } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

// Creates the styling for the card containers
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexProperties = (props) => {
    const [properties, setProperties] = useState(null)
    const [cities, setCities] = useState(null)
    const [bedrooms, setBedrooms] = useState(null)
    const [bathrooms, setBathrooms] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)

    console.log('this is cities', cities)
    console.log('this is bedrooms', bedrooms)
    console.log('this is bathrooms', bathrooms)
    console.log('THIS IS MIN PRICE', minPrice)
    console.log('THIS IS MAX PRICE', maxPrice)

    // Calls getAllProperties Axios call and sets seeded data to properties state
    useEffect(() => {
        getAllProperties()
            .then(res => {
                console.log('THIS IS PROPERTIES', res.data.properties)
                setProperties(res.data.properties)
            })
            .catch(console.error)
    }, [])

    // If the API call is unsuccessful, display a loading screen
    if (!properties) {
        return <p>loading...</p>
    }
    // If there are no properties, display a link to list a new property
    else if (properties.length === 0) {
        return (
            <Link to='/addProperty'>
                <p>List New Property</p>
            </Link>
        ) 
    }

    let propertyCards

    // If properties exist, run the below logic
    if(properties.length > 0) {
        // Logic for the property filters
        propertyCards = properties.filter((property) => {
            // Search filter
            if (searchTerm == '') {
                return property
            }
            else if (property.address.split(',')[1].toLowerCase().includes(searchTerm.toLowerCase())) {
                return property
            }
        })
        // City filter
        .filter((property) => {
            if (cities == 'All' || cities == null) {
                return property
            }
            else if (property.address.split(',')[1] == cities) {
                return property
            }
        })
        // Bedrooms filter
        .filter((property) => {
            if (bedrooms == null) {
                return property
            }
            else if (property.bedrooms >= bedrooms) {
                return property
            }
        })
        // Bathrooms filter
        .filter((property) => {
            if (bathrooms == null) {
                return property
            }
            else if (property.bathrooms >= bathrooms) {
                return property
            }
        })
        // Minimum price filter
        .filter((property) => {
            if (minPrice == null || minPrice == '') {
                return property
            }
            else if (property.price >= minPrice) {
                return property
            }
        })
        // Maximum price filter
        .filter((property) => {
            if (maxPrice == null || maxPrice == '') {
                return property
            }
            else if (property.price <= maxPrice) {
                return property
            }
        })
        // Mapping through each property in the properties array to create a card containing the data
        .map((property) => {
            return (
                <Card key={property._id} style={{ width: '30%' }} className="container m-2">
                    <Card.Body>
                        <Link to={`/properties/${property._id}`}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-20 col-sm-24">
                                        <div className="box">
                                            <img src={property.image1}/>
                                            <div className="box-content">
                                                <div className="overlay-img">
                                                    <img src={property.image1}/>
                                                </div>
                                                <div className="inner-content">
                                                    <h3 className="title">{property.address} </h3>
                                                    <span className="post">Seller: {property.owner.fullName}</span>
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
                                    <h6 className='property-price'>${property.price / 1000000} M &nbsp;&nbsp;&nbsp; <span><FaBed /> {property.bedrooms}</span> &nbsp;&nbsp;<span><FaBath /> {property.bathrooms}</span></h6>
                                </div>
                            </Card.Text>
                        </Card.Footer>
                </Card>

            )
    })
}

// Function to create the city filter options based on the cities listed in the properties data addresses
const cityOptions = () => {
    return properties.map(property => {
        const city = property.address.split(',')
        console.log('this is city', city[1])
        return (
            <option key={city[1]} value={city[1]}>{city[1]}</option>
        )
    })
}

        // Returns the real estate filters as well as the property cards
        return (
        <>
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
                <div className="filter">
                    <Card>
                        <Card.Body>
                            <h3 className='titleText'>Property Filters</h3>
                        </Card.Body>
                        <Card.Footer>
                            <div className="filter-panel">
                                <div className='city-filter'>
                                    <label for='city'>City</label>
                                </div>
                                <div className="filter-options">
                                    <select name='city' className='city-filter' onChange={(e) => {setCities(e.target.value)}}>
                                        <option value="All">All</option>
                                        {cityOptions()}
                                    </select>
                                </div>
                                <div className='bedrooms-filter'>
                                    <label for='bedrooms'>Bedrooms</label>
                                </div>
                                <div className="filter-options">
                                    <select name='city' className='bedrooms-filter' onChange={(e) => {setBedrooms(e.target.value)}}>
                                        <option value='1'>1+</option>
                                        <option value='2'>2+</option>
                                        <option value='3'>3+</option>
                                        <option value='4'>4+</option>
                                        <option value='5'>5+</option>
                                        <option value='6'>6+</option>
                                        <option value='7'>7+</option>
                                        <option value='8'>8+</option>
                                        <option value='9'>9+</option>
                                        <option value='10'>10+</option>
                                    </select>
                                </div>
                                <div className='bathrooms-filter'>
                                    <label for='bathrooms'>Bathrooms</label>
                                </div>
                                <div className="filter-options">
                                    <select name='bathrooms' class='city-filter' onChange={(e) => {setBathrooms(e.target.value)}}>
                                        <option value='1'>1+</option>
                                        <option value='2'>2+</option>
                                        <option value='3'>3+</option>
                                        <option value='4'>4+</option>
                                        <option value='5'>5+</option>
                                        <option value='6'>6+</option>
                                        <option value='7'>7+</option>
                                        <option value='8'>8+</option>
                                        <option value='9'>9+</option>
                                        <option value='10'>10+</option>
                                    </select>
                                </div>
                                <label class='price-filter'>Price </label>
                                <div className="min-price">
                                    <input type='text' name='min-square-footage' className='min-square-footage' placeholder='Min' onChange={(e) => {setMinPrice(e.target.value)}}></input>
                                </div>
                                <div className="max-price">
                                    <input type='text' name='max-square-footage' className='max-square-footage' placeholder='Max' onChange={(e) => {setMaxPrice(e.target.value)}}></input>
                                </div>
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
            <div style={cardContainerLayout}>
                {propertyCards}
            </div>
        </>
    )
}


export default IndexProperties