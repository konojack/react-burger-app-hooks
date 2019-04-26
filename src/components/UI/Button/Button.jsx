import React from 'react'
import PropTypes from 'prop-types'
import classes from './Button.module.scss'

const button = ({ children, clicked, btnType }) => (
    <button
        className={`${classes.Button} ${classes[btnType]}`}
        onClick={clicked}>{children}</button>
)

button.propTypes = {
    children: PropTypes.string,
    clicked: PropTypes.func,
    btnType: PropTypes.string
}

export default button
