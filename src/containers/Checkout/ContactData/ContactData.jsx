import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios-orders.js';

import Spinner from 'components/UI/Spinner/Spinner'
import Button from 'components/UI/Button/Button'
import classes from './ContactData.module.scss'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = () => {
        console.log(this.props.ingredients);

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Dawid Konojacki',
                address: {
                    street: "Teststreet 1",
                    zipCode: '3423',
                    country: "Poland"
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => console.log(error));
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="email" name="email" placeholder="Your Email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Postal Code" />
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </div>
        )
    }
}

export default ContactData
