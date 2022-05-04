import apiUrl from '../apiConfig'
import axios from 'axios'

// POST -> Create function
export const addMessage = (user, propertyId, newMessage) => {
    return axios({
        url: `${apiUrl}/messages/${propertyId}`,
        method: 'POST',
        header: {
            Authorization:`Token token=${user.token}`
        },
        data: { message: newMessage }
    })
}

// // PATCH -> Update function
// export const updateMessage = (user, propertyId, messageId, updatedMessage) => {
//     return axios({
//         url: `${apiUrl}/messages/${propertyId}/${messageId}`,
//         method: 'PATCH',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         data: { message: updatedMessage }
//     })
// }

// DELETE -> remove function
export const removeMessage = (user, userId, messageId) => {
    return axios({
        url: `${apiUrl}/messages/${userId}/${messageId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}