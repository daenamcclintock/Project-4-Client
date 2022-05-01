import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MessageForm from '../shared/MessageForm.js'
import { addMessage } from '../../api/messages'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import { useNavigate } from 'react-router-dom';

const MessageModal = (props) => {
    const { user, property, show, handleClose, msgAlert, triggerRefresh } = props
    const [ message, setMessage ] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        // e === event
        e.persist()

        setMessage(prevMessage => {
            const name = e.target.name
            let value = e.target.value

            const updatedValue = { [name]: value }

            return {...prevMessage, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        addMessage( user, property._id, message)
            .then(() => handleClose())
            .then(() => triggerRefresh())
            .then( () =>
                msgAlert({
                    heading: 'Success!',
                    message: 'Message Sent Successfully!',
                    variant: 'success',
            }))
            .then(() => navigate('/messages'))
            // if there is an error, send an error message
            .catch( () =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Message Could Not Be Sent!',
                    variant: 'danger',
            }))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>Contact Seller</Modal.Header>
            <Modal.Body>
                <MessageForm
                    message={message}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Message Realtor"
                />
            </Modal.Body>
        </Modal>
    )
}

export default MessageModal