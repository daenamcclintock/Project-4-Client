import React from 'react'
import '../../Styling/CreateProperty.css'

const CreateProperty = () => {
  return (
    <div className='PropertyListing_container'>
        <div className="form">
            <label>Price</label>
            <input type='number' placeholder='Property Price' />
            <label>Address</label>
            <input type='text' placeholder='Property Address' />
            <label>Sell or Rent</label>
            <select>
                <option>...</option>
                <option>SELL</option>
                <option>RENT</option>
            </select>
            <label>Number of Bedrooms</label>
            <input type='number' placeholder='Number of Bedrooms' />
            <label>Number of Bathrooms</label>
            <input type='number' placeholder='Number of Bathrooms' />
            <label>Number of Garages</label>
            <input type='number' placeholder='Number of Garages' />
            <label>Price</label>
            <input type='number' placeholder='Property Price' />
            
        </div>
    </div>
  )
}

export default CreateProperty