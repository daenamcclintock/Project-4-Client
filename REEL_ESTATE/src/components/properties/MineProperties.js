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
        propertyCards = myProperties.map(property => { 
            return (<Card key={property._id} style={{ width: '25%' }} className="m-2">
                <Card.Img 
                src={property.image1} 
                alt='property image' />
                <Card.Body>
                        <Link to={`/properties/${property._id}`}>
                            <div className='imgIP'>
                                <Card.ImgOverlay>
                                    <Card.Title className='seller'>Seller: {property.owner.fullName}</Card.Title>
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

    return (
        <>
            <h3 className='titleText'>Browse My Properties</h3>
            <div style={cardContainerLayout}>
                {propertyCards}
            </div>
        </>
    )
}

export default MineProperties