import React, { useState, useEffect } from 'react'
import { Card, Dropdown, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { getMyProperties } from '../../api/properties'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const MineProperties = (props) => {
    const [myProperties, setMyProperties] = useState(null)
    const {user} = props
    const [property, setProperty] = useState(null)
    

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
        propertyCards = myProperties.map(property => (
            <Card key={property._id} style={{ width: '25%' }} className="m-2">
                <Card.Img variant="top" src="" />
                <Card.Title className='m-2'>{property.name}</Card.Title>
                <Card.Body>
                    <Card.Text>Seller: {!property.owner ? null : property.owner.username}</Card.Text>
                        <Link to={`/properties/${property._id}`}>
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
            </Card>
        ))
    }

    // return (
    //     <>
    //         <h3 className='titleText'>Browse My Properties</h3>
    //         <Dropdown>
    //             <Dropdown.Toggle id="dropdown-basic-button-2">
    //                 Categories
    //             </Dropdown.Toggle>

    //             <Dropdown.Menu>
    //                 <Link to = {`/products/clothing`} style={{textDecoration:'none' , color:'black'}}>Clothing</Link><br/>
    //                 <Link to = {`/products/collectibles`} style={{textDecoration:'none', color:'black' }}>Collectibles</Link><br/>
    //                 <Link to = {`/products/electronics`} style={{textDecoration:'none', color:'black'}}> Electronics </Link>
    //             </Dropdown.Menu>
    //         </Dropdown>
    //         <div style={cardContainerLayout}>
    //             {productCards}
    //         </div>
    //     </>
    // )
}

export default MineProperties