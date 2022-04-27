import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeMessage } from '../../api/messages'

const ShowMessage = (props) => {
    // most of these are simply to pass to edit modal
    const { message, user, property, triggerRefresh } = props



    const destroyMessage = () => {
        removeMessage(user, property._id, message._id)
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(console.error)
    }

    // const displayMessages = () => {
    //     let messages = user.messages
    //     messages.map((message) => {
    //         return (
    //             <h4>{message}</h4>
    //         )
    //     })
    // }

    console.log('THIS IS THE USER', user)
    console.log('THIS IS THE PROPERTY', property)
    console.log('THIS IS THE MESSAGE', message)
    

console.log('here is our message owner', message.owner) 
// console.log('here is our message owner username', message.owner.username) 

    return (
        <>
            <Card className="m-2">
                <Card.Body>
                        {/* {displayMessages()} */}
                    {
                        user && (user.id === property.owner.id)
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