import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import logo from '../logo.svg';
import NavUser from './NavUser';

class Navigation extends Component {

  state = {
    navIsOpen: false
  };

  render() {
    const {
      currentUser,
      signOut,
      topics
    } = this.props;
    return (
      <Navbar color="light"
        light expand="md">
        <NavbarBrand tag={Link} to="/">
          <img src={logo}
            className="d-inline-block align-top mr-3"
            width="30"
            height="30"
            alt="NC News" />
          NC News
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNav} />
        <Collapse isOpen={this.state.navIsOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">Home</NavLink>
            </NavItem>
            {
              topics.map(topic => {
                return (
                  <NavItem key={topic.slug}>
                    <NavLink tag={Link} to={`/topics/${topic.slug}`}>
                      {topic.title}
                    </NavLink>
                  </NavItem>
                )
              })
            }
            <NavUser currentUser={currentUser} signOut={signOut} />
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

Navigation.propTypes = {
  currentUser: propTypes.object,
  topics: propTypes.arrayOf(propTypes.object).isRequired,
  signOut: propTypes.func
}

export default Navigation;