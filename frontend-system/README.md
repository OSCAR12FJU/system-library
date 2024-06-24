# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)






//////////////////
Logica peor falta la estructura para el formulario que cambie información del libro. La estructura de form que este tiene no es correcta.

 function UpdateBook() {
        const [formData, setFormData] = useState({
            id: '',
            name: '',
            author: '',
        });

        const [books, setBooks] = useState([]);

        useEffect(() =>{
            const fetchBook = async () =>{
                const response = await fetch('http://localhost:8080/get-books')
                const books = await response.json();
                setBooks(books);
            };
            fetchBook();
        }, []);

        const handleChange = (e) =>{
            const {name,value} = e.target;
            setFormData((prevData) =>({
                ...prevData,
                [name]: value,
            }));
        };
        const handleSubmit = async (e) =>{
            e.preventDefault();
            try{
                const response = await fetch(`http://localhost:8080/put-books/${formData.id}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(formData),
                });
                if(response.ok){
                    console.log('Información actualizada correctamente');
                    const updateBooks = await fetch("http://localhost:8080/get-books");
                    const books = await updateBooks.json();
                    setBooks(books)
                } else{
                    console.error('Problema en el envío de información');
                }
            }catch(error){
                console.error('Error:', error);
            }
        }
        const handleEdit = async(id) =>{
            const response = await fetch(`http://localhost:8080/get-books/${id}`)
            const book = await response.json();
            setFormData({
                id:book.id,
                name: book.name,
                author: book.author
            })
        }
    return(
            <div className="container"> 
        {/* <form onSubmit={handleSubmit}> */}
            {/* <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            ></input>
            <input 
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Autor"
            ></input>
            <button type="submit">Ingresar</button> */}
        {/* </form> */}
       
    </div>
</>
    );
}
export default UpdateBook
//////////////////////////

Función y estructura de Contacto realizado correctamente 

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
