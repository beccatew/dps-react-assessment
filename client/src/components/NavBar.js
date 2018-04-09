import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class NavBar extends Component {
  activeItem = (navPath) => {
    return navPath === this.props.location.pathname;
  }

  render() {
    return (
      <div>
        <Menu pointing stackable>
          <Link to='/'>
            <Menu.Item name='home' active={this.activeItem('/')} />
          </Link>
          <Menu.Menu position='left'>
            <Link to='/beers'>
              <Menu.Item name='Beers' />
            </Link>
            <Link to='/breweries'>
              <Menu.Item name='Breweries' />
            </Link>
            <Link to='/'>
              <Menu.Item name='Locations' />
            </Link>
            <Link to='/'>
              <Menu.Item name='Glassware' />
            </Link>
          </Menu.Menu>
          <Menu.Menu position='right'>
          <Link to='/'>
            <Menu.Item name='Search' />
          </Link>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default withRouter(NavBar);
