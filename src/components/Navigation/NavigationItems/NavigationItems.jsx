import React from 'react'
import PropTypes from 'prop-types'
import classes from './NavigationItems.module.scss'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <li><a href="/" className={classes.active}>Burger Builder</a></li>
        <li><a href="/">Checkout</a></li>
    </ul>
)

navigationItems.propTypes = {

}

export default navigationItems
