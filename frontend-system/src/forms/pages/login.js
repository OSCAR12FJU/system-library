import React from "react";
import NavBar from "../components/nav-bar";
import "../style-pages/login.css"
// import { Link } from "react-router-dom";
import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";


 function Login(){

    // const [formData, setFormData] = useState({
    //     email: '',
    //     password: '',
    //   });
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

      // const handleChange = (e) => {
      //   const { name, value } = e.target;
      //   setUserEmail((prevData) => ({
      //     ...prevData,
      //     [name]: value,
      //   }));
      // };
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:userEmail, password:userPassword}),
          });

          if (response.ok) {
            // console.log('Información enviada correctamente');
            // const user = await response.json();
            navigate('/Inicio');
          } else {
            // console.error('Problema en el envio de información');
            alert('Datos ingresados invalidos')
            console.log(userPassword, userEmail);
          }
        } catch (error) {
          console.error('Error:', error);
        }
        // setFormData({
        //   email: '',
        //   password: '', 
        // })
        setUserEmail('')
        setUserPassword('')
      };
      
    return(
        <>
        <NavBar />
        <div className="cont-form d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className=" form-login p-4 border rounded col-12 col-sm-7 col-md-5 col-lg-4 mx-auto">
                <div className="contain-title-login d-sm-flex align-items-center justify-content-center mb-4">
                     <h2 className="h3 mb-0">Iniciar Sesion</h2>
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" placeholder="E-mail" id="exampleInputEmail1 " aria-describedby="emailHelp" name="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required/>
                    {/* <input type="email" className="form-control" placeholder="E-mail" id="exampleInputEmail1 "  aria-describedby="emailHelp" name="email" onChange={handleChange} value={formData.email} /> */}

                </div>
                <div className="mb-3">
                    {/* <input type="password" className="form-control"placeholder="Contraseña" id="exampleInputPassword1" name="password" onChange={handleChange} value={formData.password} /> */}
                    <input type="password" className="form-control" placeholder="Contraseña" id="exampleInputPassword1 " name="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Acordarse de mí</label>
                </div>
                <button type="submit" className="btn btn-primary ">Registrarme</button>
                <div className="no-count d-sm-flex align-items-center justify-content-center mb-0 mt-3">
                    <h3 className="h6 mt-2 mb-0"> No tenes cuenta de usuario? <Link to="/Registrarse" style={{color:'#4BC1D2'}}>Registrate</Link> </h3>
                </div>
            </form>
    </div>

 
</>
    );
}
export default Login