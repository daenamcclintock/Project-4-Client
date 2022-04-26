import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import {Navbar, InputGroup, FormControl, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'


const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const categoryLinkStyle = {
    color: 'black',
    textDecoration: 'none',
}

const authenticatedOptions = ({user}) => (
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
		<Nav.Item>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to={`/favorites/${user._id}`} style={linkStyle}>
				My Favorites
			</Link>
		</Nav.Item>
		<InputGroup className="mb-3">
			<FormControl
			placeholder="Search Zip Code"
			aria-label="Recipient's username"
			aria-describedby="basic-addon2"
			/>
			<Button variant="outline-secondary" id="button-addon2">
			Search
			</Button>
		</InputGroup>
		<Nav.Item className='m-2'>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

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

const Header = ({ user }) => (
	
	<Navbar className='background-header' variant='dark' expand='md'>
		<Navbar.Brand className='m-2'>
            <Link to='/' style={linkStyle}>
                REEL ESTATE
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