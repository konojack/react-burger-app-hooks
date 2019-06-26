import React, { Component } from 'react'
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
    state = {
        ingredients: {}
    }

    componentDidMount() {
        const ingredientsParams = new URLSearchParams(this.props.location.search);
        const ingredientsObject = {};
        ingredientsParams.forEach((val, key) => {
            ingredientsObject[key] = +val;
        })
        this.setState({ingredients: ingredientsObject});
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
            </div>
        )
    }
}

export default Checkout
