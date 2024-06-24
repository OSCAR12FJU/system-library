import React from "react";
import NavBar from "../components/nav-bar";
import "../style-pages/register.css";
import { useState } from "react";

function Register (){
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      password:'',
      country:'',
    });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
 
      };
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:8080/create-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',     
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            console.log('Información enviada correctamente');
          } else {
            console.error('Problema en el envio de información');
          }
        } catch (error) {
          console.error('Error:', error);
        }
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          password:'',
          country:'',
        })
      };
    return(
        <>
         <NavBar />
            <div className="container-register">

                <div className="contain-title col-12 col-sm-7 col-md-7 col-lg-6 mx-auto ">
                    <h2 className="h2 mt-2 mb-0">Registrarse</h2>
                    <h4 className="h6 mt-2 mb-0">Estas a unos pasos de poder usar el mejor software de biblioteca.</h4>           
                </div>
            <div className="cont-form-register d-flex justify-content-center align-items-center">
            <form class="form-register row g-3 p-4 needs-validation border rounded col-12 col-sm-7 col-md-8 col-lg-6 mx-auto" onSubmit={handleSubmit} novalidate>
                <div class="col-md-6 mb-3">
                    <label for="validationCustom01" class="form-label">Primer Nombre</label>
                    <input type="text" class="form-control" id="validationCustom01" placeholder="Nombre" name="first_name" value={formData.first_name} onChange={handleChange} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-6 mb-3"> 
                    <label for="validationCustom02" class="form-label">Apellido Completo</label>
                    <input type="text" class="form-control" id="validationCustom02" placeholder="Apellido" name="last_name" value={formData.last_name} onChange={handleChange} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>


                <div class="col-md-6 mb-3">
                    <label for="validationCustom03" class="form-label">E-mail</label>
                    <input type="email" class="form-control" id="validationCustom03" placeholder="E-mail" name="email" value={formData.email} onChange={handleChange} required />
                    <div class="invalid-feedback">
                    Please provide a valid city.
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="validationCustom03" class="form-label">Contraseña</label>
                    <input type="text" class="form-control" id="validationCustom02" placeholder="Contraseña" name="password" value={formData.password} onChange={handleChange} required />
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>


                <div class="col-md-6 mb-3">
                    <label for="validationCustom04" class="form-label">Nacionalidad</label>
                    <input type="text" class="form-control" id="validationCustom03" placeholder="Nacionalidad" name="country" value={formData.country} onChange={handleChange} required />
                    <div class="invalid-feedback">
                    Please provide a valid city.
                    </div>
                </div>
                
                <div class="col-12 mb-3">
                    <button class="btn btn-register" type="submit">Enviar</button>
                </div>
</form>
    </div>
</div>
        </>
    )
}

export default Register;





