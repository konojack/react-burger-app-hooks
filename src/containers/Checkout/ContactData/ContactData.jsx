import React, { useState } from 'react'
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index';

import Spinner from 'components/UI/Spinner/Spinner'
import Button from 'components/UI/Button/Button'
import Input from 'components/UI/Input/Input'
import classes from './ContactData.module.scss'
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = (props) => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Postal Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'email',
            elementConfig: {
                type: 'text',
                placeholder: 'Your E-mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            valid: true
        }
    })

    const [isFormValid, setIsFormValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        }

        props.onOrderBurger(order, props.token);

    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const myEventTargetValue = event.target.value;

        let isFormValid = true;

        // checking validity of each field
        for (let inputIdentifiers in orderForm) {
            if (inputIdentifiers === inputIdentifier) {
                isFormValid = checkValidity(myEventTargetValue, orderForm[inputIdentifiers].validation) && isFormValid;
            } else {
                isFormValid = checkValidity(orderForm[inputIdentifiers].value, orderForm[inputIdentifiers].validation) && isFormValid;
            }
        }



        // this.setState(prevState => ({
        //     orderForm: updateObject(prevState.orderForm, {
        //         [inputIdentifier]: updateObject(prevState.orderForm[inputIdentifier], {
        //             value: myEventTargetValue,
        //             valid: checkValidity(myEventTargetValue, prevState.orderForm[inputIdentifier].validation),
        //             touched: true,
        //         })
        //     }),
        //     isFormValid: isFormValid
        // }))

        setOrderForm(updateObject(orderForm, {
            [inputIdentifier]: updateObject(orderForm[inputIdentifier], {
                value: myEventTargetValue,
                valid: checkValidity(myEventTargetValue, orderForm[inputIdentifier].validation),
                touched: true,
            })
        }))
        setIsFormValid(isFormValid);
    }


    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(e) => inputChangedHandler(e, formElement.id)} />
            ))}
            <Button btnType="Success" disabled={!isFormValid}>ORDER</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />;
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.startPurchasingBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
