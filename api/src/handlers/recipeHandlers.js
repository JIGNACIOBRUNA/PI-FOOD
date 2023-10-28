const { UUID, INTEGER } = require("sequelize");
const { v4: UUIDV4, validate } = require("uuid");
const { Recipes, Diets } = require("../db");
const { getRecipeById, createRecipe, getTotalRecipes, getApiRecipes } = require("../controllers/recipeControllers");


// const allRecipes = async (req, res) =>{
//     try {
//         const recipes = await getApiRecipes();
//         console.log(recipes);
//         res.status(200).json(recipes)
//       } catch (error) {
//         console.log(error);
//         res.status(400).send("Error al obtener las recetas");
// }
// }

const getRecipeName = async (req, res) =>{
    const{ name } = req.query;
    const recipeTotal = await getTotalRecipes();
    try {
        if(!name){
            res.status(200).json(recipeTotal);
        }else{
            let recipeName = recipeTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            recipeName.length ? res.status(200).json(recipeName) : res.status(404).send("El nombre de la receta no existe")
        }
    } catch (error) {
        next(error)
    }
     
};

const getRecipeHandler = async(req, res) =>{
    const { idRecipe } = req.params;
    const origin = isNaN(idRecipe) ? "DB" : "API" // si no es numero su origen es Db por el uuid
    try {
        const recipe = await getRecipeById(idRecipe, origin);
        res.status(200).json(recipe);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "No se encontro la receta con el ID indicado" });
        
    }
};




const postRecipe = async (req, res) =>{
    try {
        const { name, image, summary, healthScore, stepByStep, diets } = req.body;
        const newRecipe = await createRecipe( name, image, summary, healthScore, stepByStep)
        
        const dietCreated = await Diets.findAll({
            where:{
                name: diets
            }
        })
        await newRecipe.addDiet(dietCreated)
            res.status(200).json(newRecipe);
            console.log(newRecipe);
    } catch (error) {
        console.log(error)
        res.status(400).send("No se creo la nueva receta");
    }
};

module.exports = {
    getRecipeHandler,
    getRecipeName,
    postRecipe,
    // allRecipes
}