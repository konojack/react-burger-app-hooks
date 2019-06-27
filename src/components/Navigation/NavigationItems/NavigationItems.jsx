import React from 'react'
import classes from './NavigationItems.module.scss'
import { NavLink } from 'react-router-dom'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <li><NavLink to="/" exact activeClassName={classes.active}>Burger Builder</NavLink></li>
        <li><NavLink to="/checkout" activeClassName={classes.active}>Checkout</NavLink></li>
        <li><NavLink to="/orders" activeClassName={classes.active}>Orders</NavLink></li>
    </ul>
)

export default navigationItems
