import './App.css';
import { Home, Landing, Detail, Form } from "./views";
import {Route, useLocation} from "react-router-dom";
//utilizo exact para en la ruta / solo aparezca Landing 
function App() {
  const location = useLocation();
 
  return (
    
    <div className="App">
      <Route exact path="/"><div className={"landing-bg"}><Landing/></div></Route>

       <Route exact path="/create"><div className={"fondo"}><Form/></div></Route> 

       <Route exact path="/recipe/:id"><div className={"fondo"}><Detail/></div></Route>

      <Route path="/home"><div className={"fondo"}><Home/></div></Route>
      
      
    </div>
  );
}

export default App;
