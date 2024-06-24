import { Route, Routes } from "react-router-dom";
import Login from "./forms/pages/login";
import Contact from "./forms/pages/contact"
import Register from "./forms/pages/register";
import Dashboard from "./Dashboard";
function App() {
  return (
    <>
       <Routes>
         <Route path="/Iniciar-Sesion" element={<Login />}/>
         <Route path="/Contactanos" element={<Contact />}/>
         <Route path="/Registrarse" element={<Register />}/>
         <Route path="/Inicio" element={<Dashboard />}/>
      </Routes>   
    </>
  );
}

export default App;
