import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: {},
        price: 0
    }

    componentDidMount() {
        const ingredientsParams = new URLSearchParams(this.props.location.search);
        const ingredientsObject = {};
        let price = 0;
        ingredientsParams.forEach((val, key) => {
            if(key === 'price') {
                price = +val;
            } else {
                ingredientsObject[key] = +val;
            }
        })
        this.setState({ingredients: ingredientsObject, price: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={`${this.props.match.path}/contact-data`} render={(props) => {
                    return (<ContactData {...props} ingredients={this.state.ingredients} totalPrice={this.state.price}/>)
                }}/>
            </div>
        )
    }
}

export default Checkout
