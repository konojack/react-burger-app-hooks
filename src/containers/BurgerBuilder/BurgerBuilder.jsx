import React, { useState, useEffect, useCallback, Fragment } from 'react'
import axios from 'axios-orders.js';
import { useDispatch, useSelector } from "react-redux";

import * as actions from '../../store/actions/';

import Burger from 'components/Burger/Burger';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import Spinner from 'components/UI/Spinner/Spinner';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';

export const BurgerBuilder = (props) => {

  const [purchasing, setPurchasing] = useState(false);

  const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.burgerBuilder.isAuthenticated);
    
  const dispatch = useDispatch();

  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()), 
    [dispatch]);

  const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
  const onIngredientRemoved = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
  const onPurchaseInit = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseHandler = () => {
    if(isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    onPurchaseInit();
    props.history.push('/checkout');
  }

  const updatePurchaseState = () => {
    const ings = {
      ...ingredients
    };

    const sum = Object.keys(ings).map(igKey => {
      return ings[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  }

  const disabledInfo = {
    ...ingredients
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }



  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />

  let orderSummary = null;

  if (ingredients) {
    burger = (<Fragment>
      <Burger ingredients={ingredients} />
      <BuildControls
        ingredientAdded={onIngredientAdded}
        ingredientRemoved={onIngredientRemoved}
        disabled={disabledInfo}
        purchaseable={updatePurchaseState()}
        ordered={purchaseHandler}
        isAuth={isAuthenticated}
        totalPrice={totalPrice} />
    </Fragment>)

    orderSummary = (
      <OrderSummary
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        ingredients={ingredients}
        totalPrice={totalPrice} />
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


export default withErrorHandler(BurgerBuilder, axios);
