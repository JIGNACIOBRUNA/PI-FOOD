import { ALL_RECIPES, CLEAN_RECIPE_DETAIL, GET_DIETS, RECIPE_BY_NAME, DETAIL_RECIPE, CREATE_RECIPE } from "./actionsTypes";

const intialState = { // al inicio de la app este es el estado global
    currentPage: 1,
    recipes: [],
    diets : [],
    detail: [],
    allRecipes: [],
    recipesByName: [],
}

const rootReducer = (state = intialState, action) =>{
    switch(action.type){
        case ALL_RECIPES:
            console.log("Estado de recipes antes de la actualización:", state.recipes);
            console.log("Nuevo valor de action.payload:", action.payload);
            const newState = { ...state, recipes: action.payload, allRecipes: action.payload };
            return newState;
        
        case DETAIL_RECIPE:
            return{ ...state, detail: action.payload.detail};
            
        case RECIPE_BY_NAME:
            return{...state, recipes: action.payload}       

        case GET_DIETS:
            return {...state, diets: action.payload }    

        case CLEAN_RECIPE_DETAIL:
            return{...state, detail: action.payload}  
            
        case 'FILTER_CREATED':
            const filterCreated = action.payload === 'Created' ? 
            state.allRecipes.filter(e => e.createdInDB) 
            : state.allRecipes.filter( e => !e.createdInDB)
            return {
                ...state,
                recipes: action.payload === 'All'? state.allRecipes 
                : filterCreated }

        case 'FILTER_BY_DIET':
            const recipes = state.recipes
            const filterByDiet = action.payload === 'all diets'? recipes : recipes.filter(e => e.diets?.some(d => d.toLowerCase() === action.payload.toLowerCase()))
            return{
                ...state,
                recipes: filterByDiet
            }        

        case 'FILTER_BY_NAME':
            const sortedArr = action.payload === 'asc' ?
                state.recipes.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                sortedArr}; 

        case 'FILTER_BY_HEALTHSCORE':
            const sortedArrHealth = action.payload === 'desc' ? state.recipes.sort((a, b) => {
                if (a.healthScore > b.healthScore) {
                    return 1;
                }
                if (b.healthScore > a.healthScore) {
                    return -1;
                }
                return 0;
            }) :
            state.recipes.sort((a, b) => {
                if (a.healthScore > b.healthScore) {
                    return -1;
                }
                if (b.healthScore > a.healthScore) {
                    return 1;
                }
                return 0;
            });
            return {
                ...state,
                recipes: sortedArrHealth };

        case 'CLEAN_FILTERS':
            return {...state, recipes: state.recipes, currentPage: 1}   
                

        case 'CURRENT_PAGE':
            return {...state, currentPage: action.payload}    

        case CREATE_RECIPE:
            return {...state, allRecipes: action.payload};    
              
        default:
            return{...state};

    }
};

export default rootReducer;