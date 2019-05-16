import React from 'react'
import classes from './DrawerToggle.module.scss'

const drawerToggle = ({clicked}) => {
  return (
    <div className={classes.DrawerToggle} onClick={clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}


export default drawerToggle
