import React, { Fragment } from 'react'

const orderSummary = ({ ingredients }) => {
    const ingredientSummary = Object.keys(ingredients)
        .map((igKey, id) => {
            return (
                <li key={`${igKey}_${id}`}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ingredients[igKey]}
                </li>
            )
        })
    return (
        <Fragment>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Fragment>
    );
}

export default orderSummary
