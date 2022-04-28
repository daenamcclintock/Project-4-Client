import React from 'react'
import Logo from '../../images/realestate.png'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const MobileNav = () => {
  return (
    <div className='MobileNav_container'>
        <img src={Logo} alt='Company Logo' />
    </div>
  )
}

export default MobileNav