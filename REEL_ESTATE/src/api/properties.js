import apiUrl from '../apiConfig'
import axios from 'axios'

// GET -> Index function
export const getAllProperties = () => {
    return axios(`${apiUrl}/properties`)
}

// GET -> MINE - Index Route
export const getMyProperties = (user) => {
    return axios({
        url:`${apiUrl}/properties/mine`,
        method: 'GET',
        headers: {
            Authorization:`Token token=${user.token}`
        }
    })
}

// GET -> SHOW function
export const getOneProperty = (propertyId) => {
    return axios(`${apiUrl}/properties/${propertyId}`)
}

// POST -> CREATE function
export const createProperty = (user, newProperty) => {
    console.log(`user ${user} created a new property`)
    return axios({
        url: `${apiUrl}/properties`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },  
        data: { property: newProperty }
    })
}

// PATCH -> Update function
export const updateProperty = (user, updatedProperty) => {
    console.log(`user ${user} edited a property`)
    return axios({
        url: `${apiUrl}/properties/${updatedProperty._id}/edit`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { property: updatedProperty}
    })
}

// DELETE -> Remove function
export const removeProperty = (user, propertyId) => {
    console.log(`user ${user} deleted a property`)
    return axios({
        url: `${apiUrl}/properties/${propertyId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}