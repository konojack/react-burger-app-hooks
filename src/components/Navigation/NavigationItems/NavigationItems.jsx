import React from 'react'
import classes from './NavigationItems.module.scss'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <li><a href="/" className={classes.active}>Burger Builder</a></li>
        <li><a href="/">Checkout</a></li>
    </ul>
)

export default navigationItems
