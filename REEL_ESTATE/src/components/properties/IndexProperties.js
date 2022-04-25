import React, { useState, useEffect } from 'react'
// import { Card, Dropdown,DropdownButton, Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAllProperties } from '../../api/properties'

// const cardContainerLayout = {
//     display: 'flex',
//     justifyContent: 'center',
//     flexFlow: 'row wrap'
// }

// const categoryLinks = {
//     color: 'black',
//     textDecoration: 'none'
// }

const IndexProperties = (props) => {
    const [properties, setProperties] = useState(null)
    
    useEffect(() => {
        getAllProperties()
            .then(res => {
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
            return (<Card key={property._id} style={{ width: '25%'  }} className="m-2">
                <Card.Img variant="top" src="" />
                <Card.Title className='m-2'>{property.name}</Card.Title>
                <Card.Body>
                    <Card.Text>Seller: {!property.owner ? null : property.owner.username}</Card.Text>
                        <Link to={`/property/${property._id}`}>
                            <div className='imgIP'>
                                <Card.Img 
                                src={property.image}
                                alt='property image'
                                />
                            </div>
                        </Link>
                    <Card.Text>
                        <Link to={`/properties/${property._id}`}><button className='viewI'>View {property.name}</button></Link>
                    </Card.Text>
                </Card.Body>
            </Card>)
        })
    }

    // return (
    //     <>
    //         <h3 className='titleText'>Browse Some Properties</h3>
    //         <DropdownButton id="dropdown-basic-button-2" title="Categories" >
	// 			<Dropdown.Item><Link to='/products/clothing' style={categoryLinks}>Clothing</Link></Dropdown.Item>
	// 			<Dropdown.Item><Link to='/products/electronics' style={categoryLinks}>Electronics</Link></Dropdown.Item>
	// 			<Dropdown.Item><Link to='/products/collectibles' style={categoryLinks}>Collectibles</Link></Dropdown.Item>
	// 		</DropdownButton>
    //         <div style={cardContainerLayout}>
    //             {propertyCards}
    //         </div>
    //     </>
    // )
}


export default IndexProperties