import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'


const PropertyForm = (props) => {
    const {property, handleChange, handleSubmit, heading} = props

    return(
        <div className='userNameT'>
        <Container className="justify-content-center">
             <h3>{heading}</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Label>Property Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Property Address"
                    value={property.address}
                    name='address'
                    onChange={handleChange}
                />
                <Form.Label>Price of Property</Form.Label>
                <Form.Control
                    type='number'
                    placeholder="Property Price"
                    value={property.price}
                    name='price'
                    onChange={handleChange}
                />
                <Form.Label>Number of Bedrooms</Form.Label>
                <Form.Control
                    type='number'
                    placeholder="Number of Bedrooms"
                    value={property.bedrooms}
                    name='bedrooms'
                    onChange={handleChange}
                />
                <Form.Label>Number of Bathrooms</Form.Label>
                <Form.Control
                    type='number'   
                    placeholder="Number of Bathrooms"
                    value={property.bathrooms}
                    name='bathrooms'
                    onChange={handleChange}
                />
                <Form.Label>Square Footage</Form.Label>
                <Form.Control
                    placeholder="Square Footage"
                    value={property.squareFootage}
                    name='squareFootage'
                    onChange={handleChange}
                />
                <Form.Label>Image</Form.Label>
                <Form.Control
                    placeholder="Image URL"
                    value={property.image}
                    name='image'
                    onChange={handleChange}
                />
                <Form.Label>Amentities</Form.Label>
                <Form.Control
                    placeholder="Pool, Tennis Court, Water Views"
                    value={property.amentities}
                    name='amenities'
                    onChange={handleChange}
                />
                <br></br>
                <Button className='signInB' type='submit'>Submit</Button>
            </Form>
        </Container>
        </div>
    )
}

export default PropertyForm