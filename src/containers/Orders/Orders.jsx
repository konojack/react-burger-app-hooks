import React, { useEffect } from 'react'
import axios from 'axios-orders.js'
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler'
import Order from 'components/Order/Order'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/';
import Spinner from '../../components/UI/Spinner/Spinner'

export const Orders = (props) => {

    useEffect(() => {
        props.onFetchOrders(props.token);
    }, []); 

        let orders = <Spinner />
        if (!props.loading) {
            orders = props.orders.map(order => {
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            })
        }

        return (
            <div>
                {orders}
            </div>
        )
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
