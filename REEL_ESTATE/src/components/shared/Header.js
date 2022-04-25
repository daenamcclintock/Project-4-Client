import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import {Navbar, DropdownButton, Dropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

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
			<InputGroup action='/properties/search' className="mb-3">
				<FormControl
					placeholder="Search Zip Code"
					aria-label="Zip Code Search"
					aria-describedby="basic-addon2"
				/>
				<Button variant="outline-secondary" id="button-addon2">
					Search
				</Button>
			</InputGroup>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to={`/favorites/${user._id}`} style={linkStyle}>
				My Favorites
			</Link>
		</Nav.Item>
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
		{/* <Nav.Item >
			<DropdownButton id="dropdown-basic-button" title="Categories" >
				<Dropdown.Item><Link to='/products/clothing' style={categoryLinkStyle}>Clothing</Link></Dropdown.Item>
				<Dropdown.Item><Link to='/products/electronics' style={categoryLinkStyle}>Electronics</Link></Dropdown.Item>
				<Dropdown.Item><Link to='/products/collectibles' style={categoryLinkStyle}>Collectibles</Link></Dropdown.Item>
			</DropdownButton>
		</Nav.Item> */}
	</>
)

const Header = ({ user }) => (
	
	<Navbar className='backgroundT' variant='dark' expand='md'>
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