import { Route, Routes } from "react-router-dom";
import Login from "./forms/pages/login";
import Contact from "./forms/pages/contact"
import Register from "./forms/pages/register";
import Dashboard from "./Dashboard";
import ProductPage from "./forms/pages/productPage";
import "./index.css"
function App() {
  return (
    <>
       <Routes>
         <Route path="/Iniciar-Sesion" element={<Login />}/>
         <Route path="/Contactanos" element={<Contact />}/>
         <Route path="/Registrarse" element={<Register />}/>
         <Route path="/Inicio" element={<Dashboard />}/>
         <Route path="/" element={<Login />}/>
         <Route path="/books/:bookName" element={<ProductPage />}/>

      </Routes>   
    </>
  );
}

export default App;
