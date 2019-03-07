import React from 'react'
import PropTypes from 'prop-types'
import classes from './BuildControl.module.scss'

const buildControl = ({label, added}) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button className={classes.Less}>Less</button>
      <button className={classes.More} onClick={added}>More</button>
    </div>
  )
}

buildControl.propTypes = {
    label: PropTypes.string,
    added: PropTypes.func
}

export default buildControl
