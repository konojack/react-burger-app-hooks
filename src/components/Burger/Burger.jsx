import React from 'react'
import PropTypes from 'prop-types'
import classes from './Burger.module.scss'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ({ ingredients }) => {

    let transformedIngredients = [];
    Object.keys(ingredients).forEach(
        item => {
            for (let i = 0; i < ingredients[item]; i++) {
                transformedIngredients.push(
                    <BurgerIngredient key={item + i} type={item} />
                );
            }
        }
    );

    transformedIngredients = transformedIngredients.length ? transformedIngredients : <p>Please start adding ingredients!</p>

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

burger.propTypes = {
    ingredients: PropTypes.object
}

export default burger
