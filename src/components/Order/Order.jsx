import React from 'react'
import classes from './Order.module.scss'

const Order = ({ ingredients, price }) => {

    const ingredientsParsed = Object.keys(ingredients).map(ingredient => {
        return (
            <span className={classes.Ingredient}>
                {ingredient}({ingredients[ingredient]})
            </span>
        )
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsParsed}</p>
            <p>Price: <strong>USD {price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
