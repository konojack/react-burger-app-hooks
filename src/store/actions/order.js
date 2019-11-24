import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const burgerPending = () => {
    return {
        type: actionTypes.PENDING_BURGER
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const startPurchasingBurger = (orderData, token) => {
    return async dispatch => {
        try {
            dispatch(burgerPending());
            const postOrder = await axios.post('/orders.json?auth=' + token, orderData);
            dispatch(purchaseBurgerSuccess(postOrder.data.name, orderData));
        } catch (err) {
            dispatch(purchaseBurgerFail(err));
        }
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token) => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchOrdersStart());
            const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${getState().auth.userId}"`
            const orders = await axios.get(`/orders.json${queryParams}`);
            const fetchedOrders = [];
            for (let key in orders.data) {
                fetchedOrders.push({
                    ...orders.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        } catch(err) {
            dispatch(fetchOrdersFail(err));
        }
    }
}