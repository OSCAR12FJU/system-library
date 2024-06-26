import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../sideBar";
import "../../Dashboard.css"
import "../../index.css"


function ProductPage(){
    const {bookName} = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() =>{
        const fetchDetails = async () =>{
            try{
                const response = await fetch(`http://localhost:8080/books/${bookName}`);

                if (!response.ok){
                    throw new Error('Libro no encontrado');
                }
                const data = await response.json();
                setBook(data);
            }catch(error){
                setError(error.message);
            }
        };
        fetchDetails();
    }, [bookName]);
    if(error){
        return <div>Error: {error}</div>
    }
    if(!book){
        return <div>Cargando...</div>
    }
    console.log(book)

    return(
        <>
      <Sidebar />
      <div>
        <h1 className="h6 mt-2 mb-0">{book.name}</h1>
      <p>Author: {book.author}</p>
      <img src={book.image} alt={book.name} />
      <p>Status: {book.status}</p>
      </div>
      
      </>
    )

}

export default ProductPage;