import NavBar from "../../components/Navbar/Navbar";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiet, postRecipe, allRecipes } from "../../redux/actions";
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
    return error
}

const Form = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state) => state.diets)
    const [ error, setError ] = useState({})
    const [ input, setInput] = useState({
        name: '',
        summary: '',
        healthScore:'',
        image: '',
        step: '',
        diets: []
    })
    
    useEffect(()=>{
        if(!diets || !diets.length) dispatch(getDiet())
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const handleChange = (e) =>{
        setInput({
            ...input,
            [ e.target.name ]: e.target.value
        })
        setError(validate({
            ...input,
            [ e.target.name ]: e.target.value
        }))
    }
    
    const handleSelect = (e) =>{
        setInput({
            ...input,
            diets: [ ...input.diets, e.target.value ]
        })
        setError(validate({
            ...input,
            diets: [ ...input.diets, e.target.value ]
        }))
    }

    const handleDelete = (e) =>{
        setInput({
            ...input,
            diets: input.diets.filter( d => d !== e)
        })
        setError(validate({
            ...input,
            diets: input.diets.filter( d => d !== e)
        }))
    }

    const handleSubmit = (e) =>{ 
        e.preventDefault();     
        dispatch(postRecipe(input))    
        dispatch(allRecipes())  
        alert('Recipe created successfully!')
        history.push('/home')
    };
    
    const disabled = Object.keys(error).length 
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
                            {error.name && (<span className="error">{error.name}</span>)}
                        </div>
                        <div>
                            <label>Summary:</label>
                            <input type='text' className="input" value={input.summary} name='summary' onChange={e => handleChange(e)} />
                            {error.summary &&
                                (<span className="error">{error.summary}</span>)}
                        </div>
                        <div>
                            <label>Image:</label>
                            <input type='text' className="input" value={input.image} name='image' onChange={e => handleChange(e)} />
                            {error.image && (<span className="error">{error.image}</span>)}
                        </div>
                        <div>
                            <label>Steps:</label>
                            <textarea type="text" className="input" value={input.step} name="step" rows="4" cols="40" onChange={e => handleChange(e)} />
                            {error.step && (<span className="error">{error.step}</span>)}
                        </div>
                        <div>
                            <label>Healt score:</label>
                            <input type='number' className="input" value={input.healthScore} name='healthScore' onChange={e => handleChange(e)} />
                            {error.healthScore && (<span className="error">{error.healthScore}</span>)}
                        </div>
                        <div className='formDiets'>
                            <select onChange={e => handleSelect(e)}>
                                {diets.map((e, i) => (
                                    <option key={i} value={e.name}>{e}</option>
                                ))}
                                {error.diets && (<option>{error.diets}</option>)}
                            </select>
                        </div>
                        <div>
                            <button disabled={disabled} className="buttonCreate" type="submit">Create recipe</button>
                        </div>
                    </form>
                </div>

                {input.diets.map((e, i) => {
                    return (
                        <div key={i} className="input">
                            <span>{e} <button className="buttonXdiets" onClick={() => handleDelete(e)}>X</button> </span>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}
    export default Form;