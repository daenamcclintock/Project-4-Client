import React from 'react'
import Logo from '../../images/realestate.png'
import '../../Styling/DesktopNav.css'

const DesktopNavBar = () => {
  return (
    <div className='DesktopNav_container'>
        <div className='DesktopNavLeft_container'>
            <img src={Logo} alt='Company Logo' />
        </div>

        <div className='DesktopNavRight_container'>
           <h3>For Sale</h3> 
           <h3>For Rent</h3> 
           <h3>Post Your Property</h3> 
           <h3>Contact Agency</h3> 
        </div>

    </div>
  )
}

export default DesktopNavBar