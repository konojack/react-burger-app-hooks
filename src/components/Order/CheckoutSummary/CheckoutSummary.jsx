import React from 'react'
import Burger from 'components/Burger/Burger'
import Button from 'components/UI/Button/Button'
import classes from './CheckoutSummary.module.scss'

const CheckoutSummary = ({ingredients, checkoutCancelled, checkoutContinued}) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={ingredients}/>
            </div>
            <Button clicked={checkoutCancelled} btnType='Danger'>CANCEL</Button>
            <Button clicked={checkoutContinued} btnType='Success'>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary
