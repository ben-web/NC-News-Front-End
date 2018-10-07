import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from 'reactstrap';

const NavUser = ({ currentUser, signOut }) => {
  if (!currentUser) return (
    <NavItem>
      <NavLink href="/">Sign In</NavLink>
    </NavItem>
  )
  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        {currentUser.name}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to="/new-article">
          New Article
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/"
          onClick={() => signOut()}>
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

NavUser.propTypes = {
  currentUser: propTypes.object,
  signOut: propTypes.func
}

export default NavUser;