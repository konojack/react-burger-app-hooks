import React from 'react'
import classes from './Toolbar.module.scss'
import Logo from 'components/Logo/Logo'
import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems'
import DrawerToggle from 'components/Navigation/SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = ({drawerToggleClicked}) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)



export default toolbar
