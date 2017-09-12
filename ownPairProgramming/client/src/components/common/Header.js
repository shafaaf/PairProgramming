import React from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {Link} from 'react-router';

const Header = (props) => {
  	return (
	    <Navbar>
	      <Nav>
	        <NavItem>
	          <Link to={'/'}>All Challenges</Link>
	        </NavItem>
	      </Nav>
	    </Navbar>
  	)
}

export default Header;
