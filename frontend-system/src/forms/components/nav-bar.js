import React ,{useState} from "react";
import "./nav-bar.css"
import { Link } from "react-router-dom";

function NavBar(){
    const [activeTab, setActiveTab] = useState("");
    const cambiarTab =(numeroTab) =>{
        if(activeTab !== numeroTab){
            setActiveTab(numeroTab)
        }

    }
    return(
        <> 
      <div className="cont-nav mt-3">
        <nav className="navbar bg-body-tertiary">
            <form className="container-fluid justify-content-center">
              <Link to="/Contactanos">
                <button
                  className={`${activeTab === '1' ? 'activeTab baseTab' : 'baseTab'} btn mr-3`}
                  type="button"
                  onClick={() => cambiarTab('1')}>Contactanos</button>
              </Link>
              <Link to="/Iniciar-Sesion">
                <button
                  className={`${activeTab === '2' ? 'activeTab baseTab' : 'baseTab'} btn  mr-3`}
                  type="button"
                  onClick={() => cambiarTab('2')}>Iniciar Sesión</button>
              </Link>
              <Link to="/Registrarse">
                <button
                  className={`${activeTab === '3' ? 'activeTab baseTab' : 'baseTab'} btn mr-3`}
                  type="button"
                  onClick={() => cambiarTab('3')}>Registrarme</button>
              </Link>       
            </form>
    </nav>


        </div>
        </>   
    )
}
export default NavBar
