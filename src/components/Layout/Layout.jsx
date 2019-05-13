import React, { Fragment } from 'react'
import classes from './Layout.module.scss'
import Toolbar from 'components/Navigation/Toolbar/Toolbar'
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer'

const layout = props => {
    return (
        <Fragment>
            <Toolbar />
            <SideDrawer />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Fragment>
    )
}

export default layout
