import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { removeMessage } from '../../api/messages'
import { useNavigate } from 'react-router-dom'

const ShowMessage = (props) => {
    const { user } = props
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()

    const triggerRefresh = () => {setUpdated(prev=> !prev)}

    let messages = user.messages
    const messageId = messages.map((message) => message._id)
    let userId = user._id
    console.log('userId', userId)
    console.log('messageId', messageId)

    const destroyMessage = () => {
        let messages = user.messages
        messages.map((message) => {
            let messageId = message._id
            console.log('THIS IS MESSAGE ID2', messageId)
        })
        removeMessage(user, user._id, messageId)
            // .then(() => navigate('/messages'))
            // .then(triggerRefresh())
            .then(() => triggerRefresh())
            // .then(() => window.location.reload(false))
            // if there is an error, we'll send an error message
            .catch(console.error)
    }

    // function to map through the message details and display on a card
    const displayMessages = () => {
        let messages = user.messages
        return messages.map((message) => {
            return (
                <Card className="m-4">
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