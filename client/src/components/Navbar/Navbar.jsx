import React  from "react";
import { Link} from "react-router-dom";
import style from "./NavBar.module.css";
import logo from "./logo.png";

import SearchBar from "../Search/SearchBar";



const NavBar = (props) => {
  

    return (
        <nav className={style.navbar}>
            <div className={style.logo}>
                <Link to="/"><img src={logo} alt="Logo" /></Link>
            </div>
            <div className={style.links}>
                <Link to="/home">HOME</Link>
                <Link to="/create">FORM</Link>
                <Link to="/recipe/:id">DETAIL</Link>
            </div>
            {/* <div className={style.search}>
                <input type="text" placeholder="Search" value={recipes} onChange={e => handleChangeName(e)} ></input>
                <button className={style.button} type="submit" onClick={e => handleSubmit(e)}>Search</button>
               
            </div> */}
           <SearchBar/>
        </nav>
    )
}
export default NavBar;

// import React from "react";
// import { Link, Redirect } from "react-router-dom";
// import style from "./NavBar.module.css";
// import logo from "./logo.png";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { getRecipeName, allRecipes } from "../../redux/actions";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";

// const dispatch = useDispatch();
// const recipes = useSelector((state) => state.recipes);
// const [name, setName] = useState('');

// const handleChangeRecipe = (e) => {
//   setName(e.target.value);
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   dispatch(filterRecipes(name));
// };

// useEffect(() => {
//   if (name === '') {
//     // Si no hay ninguna búsqueda, mostrar todas las recetas
//     dispatch(allRecipes());
//   } else {
//     // Realizar la búsqueda con el nombre especificado
//     dispatch(filterRecipes(name));
//   }
// }, [dispatch, name]);

// const filteredRecipes = recipes.filter((recipe) =>
//   recipe.name.toLowerCase().includes(name.toLowerCase())
// );
// const NavBar = () =>{

// return (
//   <nav className={style.navbar}>
//              <div className={style.logo}>
//                  <Link to="/">
//                      <img src={logo} alt="Logo"/></Link>
//              </div>
//              <div className={style.links}>
//              <Link to="/home">HOME</Link>
//              <Link to="/create">FORM</Link>
//              <Link to="/recipe/:id">DETAIL</Link>
//              </div>
//     <div className={style.search}>
//       <input
//         type="text"
//         placeholder="Search"
//         value={name}
//         onChange={handleChangeRecipe}
//       ></input>
//       <button className={style.button} type="submit" onClick={handleSubmit}>
//         Search
//       </button>
//     </div>
//   </nav>
// )};

// export default NavBar;