import { Modal } from 'bootstrap'
import React, { useState, useEffect } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { addMessage, removeMessage } from '../../api/messages'

const MessageForm = (props) => {
    
    const { handleChange, handleSubmit, message } = props

    return (
        <Container className="justify-content-center">
        <div className='fixed-left'>
        <Form onSubmit={handleSubmit}>
            <Form.Label >Full Name</Form.Label>
            <Form.Control as='input'
                type="text" 
                placeholder="John Doe"        
                // value={message.message}
                name='fullname'
                onChange={handleChange}
            />
            <Form.Label >Email Address</Form.Label>
            <Form.Control as='input' 
                type="text"
                placeholder="Enter Email Address"        
                // value={message.message}
                name='email'
                onChange={handleChange}
            />
            <Form.Label >Phone Number</Form.Label>
            <Form.Control as='input'
                type='number'
                placeholder="Enter Phone Number"        
                // value={message.message}
                name='email'
                onChange={handleChange}
            />
            <Form.Label >Message to Agent</Form.Label>
            <Form.Control as='textarea' 
                placeholder="Send Seller a Message"        
                value={message.message}
                name='message'
                onChange={handleChange}
            />
            <Button type='submit'>Submit</Button>
        </Form>
        </div>
        </Container> 
    )
}

export default MessageForm