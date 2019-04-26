import React, { Fragment } from 'react'
import Button from 'components/UI/Button/Button'

const orderSummary = ({ ingredients, purchaseCanceled, purchaseContinued, totalPrice }) => {
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
            <p><strong>Total Price: {totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={purchaseCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={purchaseContinued}>CONTINUE</Button>
        </Fragment>
    );
}

export default orderSummary
