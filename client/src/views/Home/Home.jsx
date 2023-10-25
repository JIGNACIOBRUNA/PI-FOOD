import React from 'react'
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import style from "./Home.module.css";
import { useEffect, useState } from "react"; //hook que nos ayuda a controlar las funcionalidades de la pagina 
import { useDispatch, useSelector } from "react-redux"; //
import { allRecipes, changeCurrentPage, getDiet, filterCreated, filterByDiet, orderByName, orderByHealthScore, cleanAllFilters} from "../../redux/actions";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";



const Home = () =>{
    const dispatch = useDispatch();

    const recipes = useSelector((state) => state.recipes)
    const diets = useSelector((state) => state.diets)
    const page = useSelector(state => state.currentPage)
    const [ , setOrder ] = useState('')
  

    //paginado
    const recipesPerPage = 10
    const lastRecipe = page * recipesPerPage // 1 * 9 = 9
    const firstRecipe = lastRecipe - recipesPerPage // 9 - 9 = 0
    const recipesPage = recipes.slice(firstRecipe, lastRecipe)
    console.log(recipes);


    //nuevo 
    useEffect( () => {
        if(!recipes.length) dispatch(allRecipes())
        if(!diets || !diets.length) dispatch(getDiet())
    },[])

    const handleClick = (e) =>{
        e.preventDefault()
        dispatch(cleanAllFilters())
    }
    
    const handleFilterCreated = (e) =>{
         e.preventDefault();
         dispatch(filterCreated(e.target.value));
         dispatch(changeCurrentPage(1));
         setOrder(e.target.value)}
    
    const handleFilterbyDiets = (e)=>{
        dispatch(filterByDiet(e.target.value))
        dispatch(changeCurrentPage(1));
    }
    
    const handleSortName = (e) =>{
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setOrder(e.target.value)
    }
    
    const handleSortHealth = (e) =>{
        e.preventDefault()
        dispatch(orderByHealthScore(e.target.value))
        setOrder(e.target.value)
    }

    

    return(
        <div>
            <NavBar />
            <div className={style.filter}> 
                <span className={style.title}>Filter by</span>
                    <select className={style.filters} onChange={(e) => handleFilterbyDiets(e)}>
                    <option value= 'all diets'>All diets</option>
                        <option value= 'gluten free'>Gluten free</option>
                        <option value= 'ketogenic'>Ketogenic</option>
                        <option value= 'vegetarian'>Vegetarian</option>
                        <option value= 'lacto vegetarian'>Lacto vegetarian</option>
                        <option value= 'lacto ovo vegetarian'>Lacto ovo vegetarian</option>
                        <option value= 'vegan'>Vegan</option>
                        <option value= 'pescatarian'>Pescatarian</option>
                        <option value= 'paleolithic'>Paleolithic</option>
                        <option value= 'primal'>Primal</option>
                        <option value= 'fodmap firendly'>Fodmap firendly</option>
                        <option value= 'whole 30'>Whole 30</option>
                    </select>
               
                <span className={style.title}>Order by</span>
                <select className={style.filters} onChange={e => handleSortName(e)}>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>

                <select className={style.filters} onChange={e => handleSortHealth(e)}>
                    <option value='asc'>Healt score</option>
                    <option value='asc'>Ascendent</option>
                    <option value='desc'>Descendent</option>
                </select>
            
                <span className={style.title}>Created/Existent</span>
                <select className={style.filters} onChange={e => handleFilterCreated(e)}>
                    <option value='All'>All</option>
                    <option value='Created'>Created</option>
                    <option value='Api'>Existent</option>
                </select>
                <button className={style.filters} onClick={e => handleClick(e)}>Back to all recipes</button>   
            </div>
            <div className={style.card}>
                {recipesPage?.map(props => {
                    return (
                        <Link to={`/recipe/${props.id}`} key={props.id}>
                            <div>
                                <Card
                                    name={props.name}
                                    image={props.image}
                                    diets={props.diets}
                                    healthScore={props.healthScore}
                                    id={props.id}
                                />
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div>
                <Pagination recipesPerPage={recipesPerPage} recipes={recipes.length} />
            </div>
        </div>
    )
}
export default Home