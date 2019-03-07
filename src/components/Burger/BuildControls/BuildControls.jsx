import React from 'react'
import classes from './BuildControls.module.scss'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type : 'salad'},
    { label: 'Bacon', type : 'bacon'},
    { label: 'Cheese', type : 'cheese'},
    { label: 'Meat', type : 'meat'}
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      {controls.map((control, id) => {
         return <BuildControl label={control.label} key={control.label + id}/>
      })}
    </div>
  )
}


export default buildControls
