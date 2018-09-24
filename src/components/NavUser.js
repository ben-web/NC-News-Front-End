import React from 'react';
import propTypes from 'prop-types';
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const NavUser = ({currentUser, signOut}) => {
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
        <DropdownItem>
          <NavLink href={"/new-article"}>New Article</NavLink>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={() => signOut()}>
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