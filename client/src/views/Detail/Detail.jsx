//hook que nos ayuda a controlar las funcionalidades de la pagina 
import { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux"; //
import { detailRecipe } from "../../redux/actions";
import { useParams } from "react-router-dom";
import NavBar from "../../components/Navbar/Navbar";
import style from "./Detail.module.css";


const Detail = () =>{
    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail)     
    const {id} = useParams();

    useEffect(()=>{
         dispatch(detailRecipe(id));
         },[id, dispatch])

    return(
        <div key={id}>
            <NavBar />
            <div className={style.contenedor}>
                <h2>Id: {detail.id}</h2>
                <h2>Name: {detail.title}</h2>
                <img className={style.image} src={detail.image} />
                <h2>Summary: {detail.summary}</h2>
                <h2>healthScore: {detail.healthScore}</h2>
                <h2>StepByStep: {detail.instructions}</h2>
            </div>
        </div>
    )
}
export default Detail;  