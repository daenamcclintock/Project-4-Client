import React from 'react'
import DesktopNavBar from './DesktopNavBar'
import MobileNav from './MobileNav'
import { BrowserView, MobileView } from 'react-device-detect'

const NavBar = () => {
  return (
    <div>
        <BrowserView>
            <DesktopNavBar />
        </BrowserView>
        <MobileView>
            <MobileNav />
        </MobileView>
    </div>
  )
}

export default NavBar