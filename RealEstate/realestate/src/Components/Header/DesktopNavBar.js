import React from 'react'
import Logo from '../../images/realestate.png'
import '../../Styling/DesktopNav.css'
import { Link } from 'react-router-dom'

const DesktopNavBar = () => {
  return (
    <div className='DesktopNav_container'>
        <div className='DesktopNavLeft_container'>
            <img src={Logo} alt='Company Logo' />
        </div>

        <div className='DesktopNavRight_container'>
            <h3 className='link'>For Sale</h3> 
            <h3 className='link'>For Rent</h3> 
            <Link className='link' to='/createproperty' style={{textDecoration: 'none', color: 'black'}}>
                <h3>Post Your Property</h3> 
            </Link>
            <h3 className='link'>Contact Agency</h3> 
        </div>

    </div>
  )
}

export default DesktopNavBar