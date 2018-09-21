import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import logo from '../logo.svg';

class Navigation extends Component {

  state = {
    navIsOpen: false
  };

  render() {
    const { topics } = this.props;
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <img src={logo} className="d-inline-block align-top mr-3" width="30" height="30" alt="NC News" />
          NC News
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNav} />
        <Collapse isOpen={this.state.navIsOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            {
              topics.map(topic => {
                return (
                  <NavItem key={topic.slug}>
                    <NavLink href={`/topics/${topic.slug}`}>{topic.title}</NavLink>
                  </NavItem>
                )
              })
            }
            <NavItem>
              <NavLink href="/somewhere/">Broken</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                User
                </DropdownToggle>
              <DropdownMenu right>
                {
                  topics.map(topic => {
                    return (
                      <DropdownItem key={topic.slug}>
                        <NavLink href={`/topics/${topic.slug}`}>{topic.title}</NavLink>
                      </DropdownItem>
                    )
                  })
                }
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                  </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

  toggleNav = () => {
    this.setState({
      navIsOpen: !this.state.navIsOpen
    });
  }
}

export default Navigation;