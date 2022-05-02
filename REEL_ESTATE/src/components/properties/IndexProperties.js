import React, { useState, useEffect } from 'react'
import { Card, Dropdown,DropdownButton, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAllProperties } from '../../api/properties'
import FilterPanel from '../shared/FilterPanel'
import SearchBar from '../shared/SearchBar'
import '../../styling/Search.css'
import { BsSearch } from "react-icons/bs";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const categoryLinks = {
    color: 'black',
    textDecoration: 'none'
}

const IndexProperties = (props) => {
    const [properties, setProperties] = useState(null)
    const [cities, setCities] = useState(null)
    const [bedrooms, setBedrooms] = useState()
    const [bathrooms, setBathrooms] = useState()
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect(() => {
        getAllProperties()
            .then(res => {
                console.log('THIS IS PROPERTIES', res.data.properties)
                setProperties(res.data.properties)
            })
            .catch(console.error)
    }, [])

    if (!properties) {
        return <p>loading...</p>
    }
    else if (properties.length === 0) {
        return <p>Upload a Property</p>
    }

    let propertyCards

    if(properties.length > 0) {
        propertyCards = properties.filter((property) => {
            if (searchTerm == '') {
                return property
            }
            else if (property.address.split(',')[1].toLowerCase().includes(searchTerm.toLowerCase())) {
                return property
            }
            if (cities == 'All') {
                return property
            }
            else if (property.address.split(',')[1].toLowerCase() == cities) {
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

const cityFilter = () => {
    properties.map(property => {
        const city = property.address.split(',')[1]
        
    })
}

const cityOptions = () => {
    return properties.map(property => {
        const city = property.address.split(',')
        console.log('this is city', city[1])
        return (
            <option key={city[1]} value={city[1]}>{city[1]}</option>
        )
    })
}
        
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
                        <br></br>
                        <h3 className='titleText'>Property Filters</h3>
                        <br />
                    </div>
                    <div className="filter">
                    <>
                    <div className="filter-panel">
                        <div className='city-filter'>
                            <label for='city'>City</label>
                        </div>
                        <br></br>
                        <div className="filter-options">
                            <select name='city' className='city-filter' onChange={(e) => {setCities(e.target.value)}}>
                                <option value="All">All</option>
                                {cityOptions()}
                            </select>
                        </div>
                        <br></br>
                        <div className='bedrooms-filter'>
                            <label for='bedrooms'>Bedrooms</label>
                        </div>
                        <div className="filter-options">
                            <select name='city' className='city-filter' onChange={(e) => {setBedrooms(e.target.value)}}>
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
                        <br></br>
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
                        <br></br>
                        <label class='price-filter'>Price </label>
                        <div className="min-price">
                            <input type='text' name='min-square-footage' class='min-square-footage' value='0'></input>
                        </div>
                        <br />
                        <div className="max-price">
                            <input type='text' name='max-square-footage' class='max-square-footage' value='15000'></input>
                        </div>
                    </div>
                </>
            </div>
        </div>
        <br></br>
        <div style={cardContainerLayout}>
            {propertyCards}
        </div>
    </>
    )
}


export default IndexProperties