import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios-orders.js';
import { connect } from "react-redux";

import * as actions from '../../store/actions/';

import Burger from 'components/Burger/Burger';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import Spinner from 'components/UI/Spinner/Spinner';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';

export const BurgerBuilder = (props) => {

  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const purchaseHandler = () => {
    if(props.isAuthenticated) {
      setPurchasing(false);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.onPurchaseInit();
    props.history.push('/checkout');
  }

  const updatePurchaseState = () => {
    const ingredients = {
      ...props.ingredients
    };

    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  }

  const disabledInfo = {
    ...props.ingredients
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }



  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

  let orderSummary = null;

  if (props.ingredients) {
    burger = (<Fragment>
      <Burger ingredients={props.ingredients} />
      <BuildControls
        ingredientAdded={props.onIngredientAdded}
        ingredientRemoved={props.onIngredientRemoved}
        disabled={disabledInfo}
        purchaseable={updatePurchaseState()}
        ordered={purchaseHandler}
        isAuth={props.isAuthenticated}
        totalPrice={props.totalPrice} />
    </Fragment>)

    orderSummary = (
      <OrderSummary
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        ingredients={props.ingredients}
        totalPrice={props.totalPrice} />
    )
  }

  return (
    <Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
