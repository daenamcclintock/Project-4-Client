import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeMessage } from '../../api/messages'

const ShowMessage = (props) => {
    // most of these are simply to pass to edit modal
    const { user, message, triggerRefresh } = props

    const destroyMessage = () => {
        removeMessage(user, user._id, message._id)
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(console.error)
    }

    // function to map through the message details and display on a card
    const displayMessages = () => {
        let messages = user.messages
        return messages.map((message) => {
            console.log('THIS IS MESSAGE', message)
            return (
                <Card className="m-2">
                    <Card.Header>
                        <h4><b>Name:</b> {message.fullName}</h4>
                        <h5><b>Email:</b> {message.email}</h5>
                        <h5><b>Phone Number:</b> {message.phoneNumber}</h5>
                    </Card.Header>
                    <Card.Body>
                        <div>
                            <h5>Message:</h5>
                            <p>{message.message}</p>
                            <br></br>
                        </div>
                        <Button onClick={() => destroyMessage()} variant="outline-danger" size='sm'>
                            Delete Message    
                        </Button>
                    </Card.Body>
                </Card>
            )
        })
    } 

    return (
        <>
          {displayMessages()}
        </>
    )
}

export default ShowMessage