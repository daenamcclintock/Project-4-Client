import React, { useState, useEffect } from 'react'
import { Card, Dropdown,DropdownButton, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAllProperties } from '../../api/properties'

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
        propertyCards = properties.map(property => { 
            return (<Card key={property._id} style={{ width: '25%' }} className="m-2">
                <Card.Img 
                src={property.image1} 
                alt='property image' />
                <Card.Body>
                        <Link to={`/property/${property._id}`}>
                            <div className='imgIP'>
                                <Card.ImgOverlay>
                                    <Card.Title>Seller: {property.owner.fullName}</Card.Title>
                                </Card.ImgOverlay>
                            </div>
                        </Link>
                </Card.Body>
                <Card.Footer>
                    <Card.Text>
                        <Link to={`/properties/${property._id}`}>
                            <Button variant="outline-dark">View Property</Button>
                        </Link>
                    </Card.Text>
                    <Card.Text>
                        {property.address}
                    </Card.Text>
                    <Card.Text>
                        ${property.price}
                    </Card.Text>
                </Card.Footer>
            </Card>)
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
            <h3 className='titleText'>Filters</h3>
            <div className="filters">
                <div className="city">
                    <label for='city'>City</label>
                    <div className="filter-options">
                        <select name='city' className='city-filter'>
                            <option value="All">All</option>
                            {cityOptions()}
                        </select>
                    </div>
                </div>
                <br></br>
                <div className="bedrooms">
                    <label for='bedrooms'>Bedrooms</label>
                    <div className="filter-options">
                        <select name='city' className='city-filter'>
                            {bedroomsOptions()}
                        </select>
                    </div>
                </div>
                <br></br>
                <div className="bathrooms">
                    <label for='bathrooms'>Bathrooms</label>
                    <div className="filter-options">
                        <select name='bathrooms' class='city-filter'>
                            {bathroomOptions()}
                        </select>
                    </div>
                </div>
                <br></br>
                <div class='filters square-footage'>
                    <span class='label'>Square Footage</span>
                    <div className="min-sqft">
                        <input type='text' name='min-square-footage' class='min-square-footage' value='0'></input>
                    </div>
                    <div className="max-sqft">
                        <input type='text' name='max-square-footage' class='max-square-footage' value='15000'></input>
                    </div>
                </div>
                <br></br>
                <div className="filters price">
                    <label for="customRange2" class="form-label">Price</label>
                    <input type="range" class="form-range" min="0" max="5" id="customRange2"></input>
                </div>

                <div style={cardContainerLayout}>
                    {propertyCards}
                </div>
            </div>
        </>
    )
}


export default IndexProperties