import axios from "axios";
import { ALL_RECIPES, DETAIL_RECIPE, RECIPE_BY_NAME, LOCAL_HOST, GET_DIETS, CREATE_RECIPE } from "./actionsTypes";

export const allRecipes = () =>{
    return async function(dispatch){
        const apiData = await axios.get(`${LOCAL_HOST}/recipes/`);
        const recipes = apiData.data;
        return dispatch({ type: ALL_RECIPES, payload: recipes })
    };
};

export const detailRecipe = (idRecipe) =>{
    return async function(dispatch){
        const apiData = await axios.get(`${LOCAL_HOST}/recipes/${idRecipe}`);
        const detail = apiData.data;
        return dispatch({ type: DETAIL_RECIPE, payload: {detail}})

    }
}
export const getDiet = () =>{
    return async function (dispatch){
       const apiData = await axios.get(`${LOCAL_HOST}/diets/`)
       const diets = apiData.data;
        return dispatch({ type: GET_DIETS, payload: diets })
    }
}

export const getRecipeName = (recipeName) =>{
    return async function(dispatch){
        const apiData = await axios.get(`${LOCAL_HOST}/recipes/?name=${recipeName}`)
        // const name = apiData.data;
        return dispatch({type: RECIPE_BY_NAME, payload: apiData.data})
    }
}



export const cleanRecipeDetails = (payload) =>{
    return (dispatch) => {
        dispatch({ type: 'CLEAN_RECIPE_DETAILS', payload})
    }
};

export const postRecipe = (payload) =>{
    return async (dispatch) => {
        const apiData = await axios.post('http://localhost:3001/recipes', payload)
        return dispatch({ type:'POST_RECIPE', payload: apiData.data})
    }
}

export const filterCreated = (payload)=> {
    return {
        type: 'FILTER_CREATED', payload
    }
}

export const filterByDiet = (payload) =>{
    return{type: 'FILTER_BY_DIET', payload }
}

export const orderByName = (payload) => {
    return{
        type: 'FILTER_BY_NAME', payload
    }
}

export const orderByHealthScore = (payload) => {
    return{
        type: 'FILTER_BY_HEALTHSCORE', payload
    }
}

export const cleanAllFilters = () => {
    return dispatch => {
        dispatch({ type: 'CLEAN_FILTERS' })
    }
};

export const changeCurrentPage = payload => {
    return dispatch => {
        dispatch({ type: 'CURRENT_PAGE', payload})
    }
};

export const createRecipe = payload =>{
    return async dispatch =>{
        const apiData = await axios.post(`${LOCAL_HOST}/recipes`, payload);
        const newRecipe = apiData.data;
        dispatch({type: CREATE_RECIPE, payload: newRecipe})
    }
}



