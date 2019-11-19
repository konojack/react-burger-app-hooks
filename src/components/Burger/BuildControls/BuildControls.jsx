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

const buildControls = ({ ingredientAdded, ingredientRemoved, disabled, totalPrice, purchaseable, ordered, isAuth }) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{totalPrice.toFixed(2)}</strong></p>
            {controls.map((control, id) => (
                <BuildControl
                    label={control.label}
                    key={control.label + id}
                    added={() => ingredientAdded(control.type)}
                    removed={() => ingredientRemoved(control.type)}
                    disabled={disabled[control.type]} />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!purchaseable}
                onClick={ordered}>{isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    )
}

buildControls.propTypes = {
    ingredientAdded: PropTypes.func,
    ingredientRemoved: PropTypes.func,
    totalPrice: PropTypes.number
}


export default buildControls
