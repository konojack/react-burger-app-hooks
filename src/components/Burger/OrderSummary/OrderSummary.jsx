import React, { Fragment } from 'react'
import Button from 'components/UI/Button/Button'


const OrderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
    .map((igKey, id) => {
        return (
            <li key={`${igKey}_${id}`}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
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
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    )
}

export default OrderSummary
