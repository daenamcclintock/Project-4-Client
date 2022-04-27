import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeMessage } from '../../api/messages'

const ShowMessage = (props) => {
    // most of these are simply to pass to edit modal
    const { message, user, property, triggerRefresh } = props



    const destroyMessage = () => {
        removeMessage(user, user._id, message._id)
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(console.error)
    }

    // const displayMessage = () => {

    // }

    const displayMessages = () => {
        let messages = user.messages
        return messages.map((message) => {
            console.log('THIS IS MESSAGE', message)
            return (
                <Card className="m-2">
                    <Card.Body>
                        <div>
                            <h4>Name: {message.fullName}</h4>
                            <h4>Email: {message.email}</h4>
                            <h4>Phone Number: {message.phoneNumber}</h4>
                            <h4>Message: {message.message}</h4>
                            <br></br>
                        </div>
                        <Button onClick={()=> destroyMessage()} variant="outline-danger" size='sm'>
                            Delete Message    
                        </Button>
                    </Card.Body>
                </Card>
            )
        })
    }

    let messages = user.messages
    console.log('message', messages.map((message) => message.message))
    console.log('fullName', messages.map((message) => message.fullName))
    console.log('phoneNumber', messages.map((message) => message.phoneNumber))
    console.log('Email', messages.map((message) => message.email))

    console.log(displayMessages())

    console.log('THIS IS THE USER', user)
    console.log('THIS IS MESSAGES', user.messages)
    console.log('THIS IS THE PROPERTY', property)
    console.log('THIS IS THE MESSAGE', message)
    

// console.log('here is our message owner', message.owner) 
// console.log('here is our message owner username', message.owner.username) 

    return (
        <>
            <Card className="m-2">
                <Card.Body>
                        {displayMessages()}
                    {
                        user && (user.id == true)
                        ?
                        <>
                    <Button onClick={()=> destroyMessage()} variant="outline-danger" size='sm'>
                        Delete Message    
                    </Button>
        </>
        :
        null
        }
            </Card.Body>
    </Card>
    </>
    )
}

export default ShowMessage