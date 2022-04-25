import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { createProperty } from '../../api/properties'
import { useNavigate } from 'react-router-dom'
import PropertyForm from '../shared/PropertyForm'


const CreateProperty = (props) => {
    const [property, setProperty] = useState({ address:'', price:'', bedrooms:'', bathrooms:'', squareFootage:'', image:''})
    const {user, msgAlert} = props
    const navigate = useNavigate()

    const handleChange = (e) => {
        e.persist()

        setProperty(prevProperty => {
            const name = e.target.name
            let value = e.target.value
            
            const updatedValue = { [name]:value }

            return {...prevProperty, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createProperty(user, property)
            .then(res => {navigate(`/properties/${res.data.property._id}`)})
            // .then(res => console.log('property id: ', res.data.property.))
            // Then we send success message
            .then( () =>
                msgAlert({
                    heading: 'Success!',
                    message: 'Property Listing Added Successfully',
                    variant: 'success',
            }))
            // if there is an error, we'll send an error message
            .catch( () =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Property could not be added',
                    variant: 'danger',
            }))
    }

    return (
        <container className='createB'>
        <div>
            <PropertyForm
                property={property}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                heading="Add A New Property Listing!"
            />
        </div>
        </container>
    )
}

export default CreateProperty