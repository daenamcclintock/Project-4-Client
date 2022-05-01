import React, { useState, useEffect } from 'react'
import { Card, Dropdown,DropdownButton, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAllProperties } from '../../api/properties'
import FilterPanel from '../shared/FilterPanel'
import SearchBar from '../shared/SearchBar'

import '../../styling/Search.css'

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
        }).map((property) => { 
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
                                                    <h3 class="title">{property.address}</h3>
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
                                <Link to={`/properties/${property._id}`}>
                                    <Button variant="outline-dark">View Property</Button>
                                </Link>
                                <span className='property_price'>${property.price / 1000000} M</span>
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
    
    const bedroomsOptions = () => {
        return properties.map((property) => {
            return (
                <option key={property.bedrooms} value={property.bedrooms}>{property.bedrooms}+ BR</option>
                )
            })
        }
        
    const bathroomOptions = () => {
        return properties.map((property) => {
            return (
                <option key={property.bathrooms} value={property.bathrooms}>{property.bathrooms}+ BA</option>
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
                </div>
                <br></br>
                <h3 className='titleText'>Property Filters</h3>
                <br />
            </div>
            <div className="filter">
                <FilterPanel properties={properties}/>
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


// <Card key={property._id} style={{ width: '25%' }} className="container m-2">
//     <div className='card'>
//         <div className='imgContainer'>
//             <Card.Img
//             src={property.image1}
//             alt='property image' />
//         </div>
//     </div>
//     <div className='content'>
//         <Card.Body>
//                 <Link to={`/properties/${property._id}`}>
//                     <div className='imgIP'>
//                         <Card.ImgOverlay>
//                             <Card.Title className='seller'>Seller: {property.owner.fullName}</Card.Title>
//                         </Card.ImgOverlay>
//                     </div>
//                 </Link>
//         </Card.Body>
//         <Card.Footer>
//             <Card.Text>
//                 <Link to={`/properties/${property._id}`}>
//                     <Button variant="outline-dark">View Property</Button>
//                 </Link>
//             </Card.Text>
//             <Card.Text>
//                 {property.address}
//             </Card.Text>
//             <Card.Text>
//                 ${property.price / 1000000} M
//             </Card.Text>
//         </Card.Footer>
//     </div>
// </Card>