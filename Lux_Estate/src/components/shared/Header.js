import React from 'react'
import Nav from 'react-bootstrap/Nav'
import {Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../styling/Style.css'


const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

// Header options that are only displayed while the user is currently logged in
const authenticatedOptions = ({ user, property }) => (
	<>
		<Nav.Item className='m-2'>
			<Link to='/properties/mine' style={linkStyle}>
				My Property Listings
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='/addProperty' style={linkStyle}>
				List New Property
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to={`/messages`} style={linkStyle}>
				My Messages
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

// Header options that are only displayed while the user is not currently signed in
const unauthenticatedOptions = (
	<>
        <Nav.Item className='m-2'>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='m-2'>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

// Header options that are always displayed
const alwaysOptions = (
	<>
		<Nav.Item className='m-2'>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='/properties' style={linkStyle}>
				All Property Listings
			</Link>
		</Nav.Item>
	</>
)

// Function to create the header
const Header = ({ user }) => (
	<Navbar className='background-header' variant='dark' expand='md'>
		<Navbar.Brand className='m-2'>
            <Link to='/' style={linkStyle}>
                LuxEstate
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.username}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions({user}) : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header