import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import { updateProperty } from '../../api/properties'
import PropertyForm from '../shared/propertyForm'

const EditPropertiesModel = (props) => {
    const { user, show, handleClose, updateProperty, triggerRefresh } = props
    const [property, setProperty] = useState(props.property)

    const handleChange = (e) => {
        e.persist()

        setProperty(prevProperty => {
            const name = e.target.name
            let value = e.target.value
    
            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }
            const updatedValue = { [name]: value }

            return {...prevProperty, ...updatedValue}
        })
    }



    const handleSubmit = (e) => {
        
        e.preventDefault()
        console.log('here is our user in edit', user)
        updateProperty(user, property)
            .then(() => handleClose())
            .then(()=> triggerRefresh())
            .catch(console.error)
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className='bg-dark text-info'>
                <PropertyForm 
                    property={property}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit Property Listing!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPropertiesModel