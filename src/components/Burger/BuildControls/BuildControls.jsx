import React from 'react'
import classes from './BuildControls.module.scss'
import BuildControl from './BuildControl/BuildControl'
import PropTypes from 'prop-types'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = ({ ingredientAdded, ingredientRemoved, disabled }) => {
    return (
        <div className={classes.BuildControls}>
            {controls.map((control, id) => (
                <BuildControl
                    label={control.label}
                    key={control.label + id}
                    added={() => ingredientAdded(control.type)}
                    removed={() => ingredientRemoved(control.type)}
                    disabled={disabled[control.type]} />
            ))}
        </div>
    )
}

buildControls.propTypes = {
    ingredientAdded: PropTypes.func,
    ingredientRemoved: PropTypes.func
}


export default buildControls