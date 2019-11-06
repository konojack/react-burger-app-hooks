import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => ({type: actionTypes.ADD_INGREDIENT, ingredientName});
export const removeIngredient = (ingredientName) => ({type: actionTypes.REMOVE_INGREDIENT, ingredientName});
export const setIngredients = (ingredients) => ({type: actionTypes.SET_INGREDIENTS, ingredients});
export const fetchIngredientsFailed = () => ({type: actionTypes.FETCH_INGREDIENTS_FAILED});

export const initIngredients = () => {
    return async dispatch => {
        try {
            const getIngredients = await axios.get('/ingredients.json');
            const ingredients = getIngredients.data;
            dispatch(setIngredients(ingredients));
        } catch(err) {
            dispatch(fetchIngredientsFailed());
        }
    }
}