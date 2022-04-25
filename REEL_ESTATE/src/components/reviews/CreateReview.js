import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import ReviewForm from '../shared/ReviewForm'
import {addReview} from '../../api/reviews.js'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const GiveReviewModal = (props) => {
    const { user, property, show, handleClose, msgAlert, triggerRefresh } = props
    const [ review, setReview ] = useState({})

    const handleChange = (e) => {
        // e === event
        e.persist()

        setReview(prevReview => {
            const name =e.target.name
            let value = e.target.value

            const updatedValue = { [name]: value }

            return {...prevReview, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        addReview( user, product._id, review)
        // if create is successful, we should navigate to the show page and refresh
            .then(() => handleClose())
            .then(() => triggerRefresh())
            // if there is an error, send an error message
            .catch(console.error)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>closeButton</Modal.Header>
            <Modal.Body>
                <ReviewForm
                    review={review}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Review Property"
                />
            </Modal.Body>
        </Modal>
    )
}

export default GiveReviewModal