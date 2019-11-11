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

export const startPurchasingBurger = (orderData) => {
    return async dispatch => {
        try {
            dispatch(burgerPending());
            const postOrder = await axios.post('/orders.json', orderData);
            dispatch(purchaseBurgerSuccess(postOrder.data.name, orderData));
        } catch (err) {
            dispatch(purchaseBurgerFail(err));
        }
    }
}