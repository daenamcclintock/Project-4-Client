import apiUrl from '../apiConfig'
import axios from 'axios'

// POST -> Create function
export const addReview = (user, propertyId, newReview) => {
    return axios({
        url: `${apiUrl}/reviews/${propertyId}`,
        method: 'POST',
        header: {
            Authorization:`Token token=${user.token}`
        },
        data: { review: newReview }
    })
}

// PATCH -> Update function
export const updateReview = (user, propertyId, reviewId, updatedReview) => {
    return axios({
        url: `${apiUrl}/reviews/${propertyId}/${reviewId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { review: updatedReview }
    })
}

// DELETE -> remove function
export const removeReview = (user, propertyId, reviewId) => {
    return axios({
        url: `${apiUrl}/reviews/${propertyId}/${reviewId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}