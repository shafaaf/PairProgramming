import React from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {Link} from 'react-router';

const Header = () => {
  return (
    <Navbar>
      <Nav>
        <NavItem>
          <Link to={'/'}>challenges</Link>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default Header;
