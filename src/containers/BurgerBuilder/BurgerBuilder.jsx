import React, { Component, Fragment } from 'react'
import Burger from 'components/Burger/Burger';
import BuildControls from 'components/Burger/BuildControls/BuildControls';


class BurgerBuilder extends Component {
  state = {
    ingredients: {
      cheese: 1,
      meat: 1,
      bacon: 1,
      salad: 1,
    }
  }

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls />
      </Fragment>
    )
  }
}

export default BurgerBuilder
