import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import '../../index.css'


const PropertyForm = (props) => {
    const {property, handleChange, handleSubmit, heading} = props

    return(
        <div className='PropertyForm'>
        <Container className="justify-content-center">
             <h3>{heading}</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Label>Property Address</Form.Label>
                <Form.Control
                    className='form_control'
                    type="text"
                    placeholder="Property Address"
                    value={property.address}
                    name='address'
                    onChange={handleChange}
                />
                <Form.Label>Price of Property</Form.Label>
                <Form.Control
                    className='form_control'
                    type='number'
                    placeholder="Property Price"
                    value={property.price}
                    name='price'
                    onChange={handleChange}
                />
                <Form.Label>Number of Bedrooms</Form.Label>
                <Form.Control
                    className='form_control'
                    type='number'
                    placeholder="Number of Bedrooms"
                    value={property.bedrooms}
                    name='bedrooms'
                    onChange={handleChange}
                />
                <Form.Label>Number of Bathrooms</Form.Label>
                <Form.Control
                    className='form_control'
                    type='number'   
                    placeholder="Number of Bathrooms"
                    value={property.bathrooms}
                    name='bathrooms'
                    onChange={handleChange}
                />
                <Form.Label>Square Footage</Form.Label>
                <Form.Control
                    className='form_control'
                    type='number'
                    placeholder="Square Footage"
                    value={property.squareFootage}
                    name='squareFootage'
                    onChange={handleChange}
                />
                <Form.Label>Image 1</Form.Label>
                <Form.Control
                    className='form_control'
                    type="text"
                    placeholder="Image URL"
                    value={property.image1}
                    name='image1'
                    onChange={handleChange}
                />
                <Form.Label>Image 2</Form.Label>
                <Form.Control
                    className='form_control'
                    type="text"
                    placeholder="Image URL"
                    value={property.image2}
                    name='image2'
                    onChange={handleChange}
                />
                <Form.Label>Image 3</Form.Label>
                <Form.Control
                    className='form_control'
                    type="text"
                    placeholder="Image URL"
                    value={property.image3}
                    name='image3'
                    onChange={handleChange}
                />
                <Form.Label>Image 4</Form.Label>
                <Form.Control
                    className='form_control'
                    type="text"
                    placeholder="Image URL"
                    value={property.image4}
                    name='image4'
                    onChange={handleChange}
                />
                <Form.Label>Image 5</Form.Label>
                <Form.Control
                    className='form_control'
                    type="text"
                    placeholder="Image URL"
                    value={property.image5}
                    name='image5'
                    onChange={handleChange}
                />
                {/* <Form.Label>Amentities</Form.Label>
                <Form.Control
                    className='form_control'
                    type="text"
                    placeholder="Pool, Tennis Court, Water Views"
                    value={property.amentities}
                    name='amenities'
                    onChange={handleChange}
                /> */}
                <Form.Label>Description</Form.Label>
                <Form.Control
                    className='form_control'
                    type="text"
                    placeholder="Features an open concept floor plan which features 4 Fireplaces, a lush Primary suite with custom built dressing room and marble clad en suite bath, an expansive deck off of the Great Room, and panoramic city + water views from your private roof deck."
                    value={property.description}
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