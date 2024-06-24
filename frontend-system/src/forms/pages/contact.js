import React from "react";
import "../style-pages/contact.css"
import NavBar from "../components/nav-bar";
import { useState } from "react";


function Contact (){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message:'',
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
          const response = await fetch('http://localhost:8080/create-contact', {
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
          name: '',
          email: '',
          message:'', 
        })
      };
    return(
        <>
         <NavBar />
                
            <div className="container-contact">

                <div className="contain-title col-12 col-sm-7 col-md-5 col-lg-4 mx-auto ">
                    <h2 className="h2 mt-2 mb-0">Contactanos</h2>
                    <h4 className="h6 mt-2 mb-0">¡Nuestros asistentes están preparados para ayudarte!</h4>           
                </div>
         <div className="cont-form-contact d-flex justify-content-center align-items-center">

                <form className=" form-contact p-4 border rounded col-12 col-sm-7 col-md-5 col-lg-4 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="formInput1" class="form-label">Nombre</label>
                    <input type="text" className="form-control" name="name" id="inputName" placeholder="Nombre" aria-describedby="nameHelp" value={formData.name}  onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label for="formInput2" class="form-label">E-mail </label>
                    <input type="email" className="form-control" name="email" id="inputEmail" placeholder="E-mail" aria-describedby="emailHelp" value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label for="formTextarea1" class="form-label">Comentario/Duda</label>
                    <textarea type="text" className="form-control" id="textareaComent" name="message" value={formData.message} onChange={handleChange} placeholder="Escribi aca..."></textarea>
                </div>
                <button type="submit" className="btn btn-contact ">Enviar</button>
            </form>
       </div>
</div>
        </>
    )
}
export default Contact;

