import React, { useState, useEffect } from 'react'
import { Card, Dropdown,DropdownButton, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAllProperties } from '../../api/properties'
import FilterPanel from '../shared/FilterPanel'

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
                        <Link to={`/properties/${property._id}`}>
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
                        ${property.price / 1000000} M
                    </Card.Text>
                </Card.Footer>
            </Card>)
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
            <FilterPanel properties={properties}/>
            <div style={cardContainerLayout}>
                {propertyCards}
            </div>
        </>
    )
}


export default IndexProperties