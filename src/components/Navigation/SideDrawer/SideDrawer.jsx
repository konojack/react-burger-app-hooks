import React from 'react'
import PropTypes from 'prop-types'
import Logo from 'components/Logo/Logo'
import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems'
import classes from './SideDrawer.module.scss'

const sideDrawer = (props) => {
  return (
    <div className={classes.SideDrawer}>
      <div className={classes.Logo}>
          <Logo />
      </div>
      <nav>
          <NavigationItems />
      </nav>
    </div>
  )
}

sideDrawer.propTypes = {

}

export default sideDrawer
