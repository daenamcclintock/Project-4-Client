import React from 'react'
import Logo from '../../images/realestate.png'
import '../../Styleing/MobileNav.css'

const MobileNav = () => {
  return (
    <div className='MobileNav_container'>
        <img src={Logo} alt='Company Logo' />
    </div>
  )
}

export default MobileNav