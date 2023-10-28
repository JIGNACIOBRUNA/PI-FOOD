import NavBar from "../../components/Navbar/Navbar";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiet, postRecipe, allRecipes, filterByDiet, createRecipe } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";


function validate(input){
    let error = {}
    if(!input.name.trim()){error.name = 'Add a name to your recipe'}
    else if(parseInt(input.name)){error.name = 'Invalid name, should contain at least one letter at the beginning'}
    if(!input.image){error.image = 'Upload an image'}
    if(!input.summary.trim()){error.summary = 'Add a summary of your recipe'}
    else if(parseInt(input.summary)){error.summary = 'Summary should contain at least one letter at the beginning'}
    if(input.healthScore < 0 || input.healthScore > 100){error.healthScore = 'The healtscore should be a number between 1 and 100'}
    if(!input.step){error.step = 'Add the steps for your recipe'}
    if(!input.diets.length){error.diets = 'You must select at least one diet type'}
    return error;
}

const Form = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state) => state.diets)
    const recipeInDatabase = useSelector((state) => state.recipes)
    const [dietsDB, setDietsDB] = useState([]);
    const [ errors, setErrors ] = useState({})
    const [ input, setInput] = useState({
        name: '',
        summary: '',
        healthScore:'',
        image: '',
        stepByStep: '',
        diets: []
    })
    
    useEffect(()=>{
        console.log(diets);
    if (!diets || !diets.length) dispatch(getDiet())
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const handleSubmit = (e) =>{ 
        e.preventDefault();
        const recipeExistsInDatabase = recipeInDatabase.some((recipes) => recipes.name.toLowerCase() === input.name.toLowerCase());
        if (recipeExistsInDatabase) {
            alert("¡Esta receta ya existe en la base de datos!");
        } else if (!input.name && !input.summary && !input.healthScore && !Object.keys(errors).length) {
            alert("Completar formulario");
        } else if (!errors.name && !errors.summary && !errors.healthScore && !errors.image && !errors.step) {
            const newRecipe = { 
                ...input, 
                name: input.name.trim(), 
                image: input.image.trim(), 
                diets: dietsDB,   
               };
            dispatch(createRecipe(newRecipe));
            alert("Se creo correctamente la nueva receta");

            setInput({
                name: "",
                image: "",
                summary: "",
                healthScore: "",
                stepByStep: "",
                temperament: [],
            });
            setDietsDB([]);
        } else {
            alert("Completar el formulario");
        }
        document.querySelector('select[name="form-diets"]').selectedIndex = 0; // seleciona el elemento de la lista y establece su indice en cero
        // e.preventDefault();     
        // dispatch(postRecipe(input))    
        // dispatch(allRecipes())  
        // alert('Recipe created successfully!')
        // history.push('/home')
    };
    const handleChange = (e) =>{
        setInput({...input, [ e.target.name ]: e.target.value})
        setErrors(validate({...input, [ e.target.name ]: e.target.value}))
    }
    
    const handleSelect = (e) =>{
        if (!dietsDB.includes(e.target.value))
        setDietsDB([...dietsDB, e.target.value]);
};

    const handleDelete = (e) =>{
        setInput({
            ...input,
            diets: input.diets.filter( d => d !== e)
        })
        setErrors(validate({
            ...input,
            diets: input.diets.filter( d => d !== e)
        }))
    }

    
    const disabled = Object.keys(errors).length 
    return(
        <div>
            <NavBar />
            <h1>Form</h1>
            <div className="fondoCreate">
                <div>
                    <Link to='/home'><button className="buttonBackRecipes" >Back to recipes</button></Link>
                    <h3 className="titleCreate">Create your recipe</h3>
                </div>
                <div className='containerCreate'>
                    <form onSubmit={e => handleSubmit(e)}>
                        <div>
                            <label >Name:</label>
                            <input type='text' className="input" value={input.name} name='name' onChange={e => handleChange(e)} />
                            {errors.name && (<span className="error">{errors.name}</span>)}
                        </div>
                        <div>
                            <label>Image:</label>
                            <input type='text' className="input" value={input.image} name='image' onChange={e => handleChange(e)} />
                            {errors.image && (<span className="error">{errors.image}</span>)}
                        </div>
                        <div>
                            <label>Summary:</label>
                            <input type='text' className="input" value={input.summary} name='summary' onChange={e => handleChange(e)} />
                            {errors.summary &&
                                (<span className="error">{errors.summary}</span>)}
                        </div>
                        <div>
                            <label>StepByStep:</label>
                            <textarea type="text" className="input" value={input.step} name="step" rows="4" cols="40" onChange={e => handleChange(e)} />
                            {errors.step && (<span className="error">{errors.step}</span>)}
                        </div>
                        <div>
                            <label>Healt score:</label>
                            <input type='number' className="input" value={input.healthScore} name='healthScore' onChange={e => handleChange(e)} />
                            {errors.healthScore && (<span className="error">{errors.healthScore}</span>)}
                        </div>
                        <div>
                            <label>Diets</label>
                        </div>
                        <select
                            defaultValue="DEFAULT"
                            name="form-diets"
                            onChange={handleSelect}
                        >
                            <option value="DEFAULT" disabled>
                                Select diets...
                            </option>
                            {diets.map((diet) => (
                                <option
                                    key={diet.id}
                                    value={diet.diet}
                                >
                                    {diet.diet}
                                </option>
                            ))}
                        </select>
                        <ul>
                            {dietsDB.map((diets, id) => (
                                <li key={id}>
                                    {diets}
                                </li>
                            ))}
                        </ul>
                        <div>
                            <button type="submit">Create recipe</button>
                        </div>
                    </form>
                </div>

                {/* {input.diets.map((e, i) => {
                    return (
                        <div key={i} className="input">
                            <span>{e} <button className="buttonXdiets" onClick={() => handleDelete(e)}>X</button> </span>
                        </div>
                    )
                }
                )} */}
            </div>
        </div>
    )
}
    export default Form;