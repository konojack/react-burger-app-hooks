import React, { Component, Fragment } from 'react'
import axios from 'axios-orders.js';
import { connect } from "react-redux";

import * as actionTypes from '../../store/actions';

import Burger from 'components/Burger/Burger';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import Spinner from 'components/UI/Spinner/Spinner';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('/ingredients.json')
    //   .then(resp => {
    //     this.setState({ ingredients: resp.data })
    //   })
    //   .catch(error => {
    //     this.setState({error: true})
    //   })
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  updatePurchaseState = () => {
    const ingredients = {
      ...this.props.ingredients
    };

    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }



    let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    if (this.props.ingredients) {
      burger = (<Fragment>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          purchaseable={this.updatePurchaseState()}
          ordered={this.purchaseHandler}
          totalPrice={this.props.totalPrice} />
      </Fragment>)

      orderSummary = (
        <OrderSummary
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice} />
      )
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName }),
    onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
