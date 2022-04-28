import React from 'react'
import DesktopNavBar from './DesktopNavBar'

const NavBar = () => {
  return (
    <div>
        <BrowserView>
            <h1>This is rendered only in browser</h1>
            <DesktopNavBar />
        </BrowserView>
        <MobileView>
            <h1>This is rendered only on mobile</h1>
        </MobileView>
    </div>
  )
}

export default NavBar