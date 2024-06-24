package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

var db *sql.DB

func main() {

	errEnv := godotenv.Load()
	if errEnv != nil {
		fmt.Println("Error en cargar el arch .env")
	}

	// var err error

	// db, err = createConnection()
	// if err != nil {
	// 	panic(err)
	// }
	// defer db.Close()
	// //Probamos la conexión creando la base de datos, las tablas con las columnas y filas las creamos desde el Workbench.
	// _, err = db.Exec("CREATE DATABASE IF NOT EXISTS `system_library`")
	// if err != nil {
	// 	panic(err.Error())
	// }

	// db, err = createConnectionWidthDB("system_library")
	// if err != nil {
	// 	panic(err.Error())
	// }
	var err error
	db, err = createConnection()
	if err != nil {
		panic(err)
	}
	defer db.Close()
	//Probamos la conexión creando la base de datos, las tablas con las columnas y filas las creamos desde el Workbench.
	_, err = db.Exec("CREATE DATABASE IF NOT EXISTS `system_books`")
	if err != nil {
		panic(err.Error())
	}

	// _, err = db.Exec("USE `system_library`")
	// if err != nil {
	// 	panic(err.Error())
	// }

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS books (
	book_id     INT AUTO_INCREMENT PRIMARY KEY,
	name 		VARCHAR(255) NOT NULL,
	author 		VARCHAR(255) NOT NULL,
	image		VARCHAR(255) NOT NULL,
	status		TINYINT(1) DEFAULT 1
	)`)
	if err != nil {
		panic(err.Error())
	}
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS users (
	id 		INT AUTO_INCREMENT PRIMARY KEY,
	first_name 	VARCHAR(255) NOT NULL,
	last_name 	VARCHAR(255) NOT NULL,
	email 	VARCHAR(255) NOT NULL,
	password 	VARCHAR(255) NOT NULL,
	country 	VARCHAR(255) NOT NULL
	)`)
	if err != nil {
		panic(err.Error())
	}

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS contact (
	id 			INT AUTO_INCREMENT PRIMARY KEY,
	name 		VARCHAR(255) NOT NULL,
	email 		VARCHAR(255) NOT NULL,
	message 	VARCHAR(255) NOT NULL
	)`)
	if err != nil {
		panic(err.Error())
	}

	//Realizando la conexión a la base de datos, esto lo hacemos llamando a la función que lo va a realizar.
	// var err error

	// db, err = createConnection()
	// if err != nil {
	// 	panic(err)
	// }
	// defer db.Close()
	// //Probamos la conexión creando la base de datos, las tablas con las columnas y filas las creamos desde el Workbench.
	// _, err = db.Exec("CREATE DATABASE IF NOT EXISTS `system_books`")
	// if err != nil {
	// 	panic(err.Error())
	// }

	router := mux.NewRouter()
	router.HandleFunc("/create-book", createBooksNew).Methods("POST")
	router.HandleFunc("/get-books", getBooks).Methods("GET")
	router.HandleFunc("/get-books/{id}", getBookByID).Methods("GET")
	router.HandleFunc("/put-books/{id}", updateBook).Methods("PUT")
	// router.HandleFunc("/books", getBooks).Methods("GET")
	// router.HandleFunc("/books/{id}", getBooks).Methods("GET")
	// router.HandleFunc("/update-book/{id}", getBooks).Methods("PUT")

	//Login
	router.HandleFunc("/login", loginHandler).Methods("GET")
	//Contacto
	router.HandleFunc("/create-contact", createContactNew).Methods("POST")
	//Regster
	router.HandleFunc("/create-user", createUserNew).Methods("POST")

	handler := cors.Default().Handler(router)

	http.ListenAndServe(":8080", handler)

}

// Función de la conexión a la BD
// func createConnection() (*sql.DB, error) {
// 	conectionString := "root:Fuerzaabasto1@@tcp(127.0.0.1:3306)/system_library"
// 	db, err := sql.Open("mysql", conectionString)
// 	if err != nil {
// 		return nil, err
// 	}

//		err = db.Ping()
//		if err != nil {
//			return nil, err
//		}
//		fmt.Println("Conectado al servidor")
//		return db, nil
//	}
func createConnection() (*sql.DB, error) {
	conectionString := "root:Fuerzaabasto1@@tcp(127.0.0.1:3306)/system_books"
	db, err := sql.Open("mysql", conectionString)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}
	fmt.Println("Conectado correctamente")
	return db, nil
}

// func createConnectionWidthDB(dbName string) (*sql.DB, error) {
// 	conectionString := fmt.Sprintf("root:Fuerzaabasto1@@tcp(127.0.0.1:3306)/%s", dbName)
// 	db, err := sql.Open("mysql", conectionString)
// 	if err != nil {
// 		return nil, err
// 	}

// 	err = db.Ping()
// 	if err != nil {
// 		return nil, err
// 	}
// 	fmt.Println("Conectado correctamente a la bd", dbName)
// 	return db, nil
// }

func InsertBook(name string, author string) error {
	query := "INSERT INTO books (name, author) VALUES (?,?)"
	_, err := db.Exec(query, name, author)
	return err
}

//////////////////////////////////////

// Estructuras de referencia de las tablas que tenemos creadas en MySQL
type Books struct {
	ID     int    `json:"book_id"`
	Name   string `json:"name"`
	Author string `json:"author"`
	Image  string `json:"image"`
	Status *bool  `json:"status"`
}

// Función Controller para crear un libro tomando las propiedades de la estructura y subir los valores a la BD.
func createBooksNew(w http.ResponseWriter, r *http.Request) {

	var books Books
	json.NewDecoder(r.Body).Decode(&books)

	result, err := db.Exec(`INSERT INTO books (name, author, image) VALUES (?,?,?)`, books.Name, books.Author, books.Image)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	lastInsertID, err := result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	books.ID = int(lastInsertID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

// func createBooksNew(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodPost {
// 		http.Error(w, "Es invalido el valor de petición", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	var data Books
// 	err := json.NewDecoder(r.Body).Decode(&data)
// 	if err != nil {
// 		http.Error(w, "Invalida la estructura", http.StatusBadRequest)
// 		return
// 	}
// 	err = InsertBook(data.Name, data.Author)
// 	if err != nil {
// 		http.Error(w, "Error en la inserción de información a la base", http.StatusInternalServerError)
// 		return
// 	}
// 	w.WriteHeader(http.StatusOK)
// 	w.Write([]byte("Data insertada aceptada"))
// }

func getSearchBooks(w http.ResponseWriter, r *http.Request) {
}

func getBooks(w http.ResponseWriter, r *http.Request) {

	rows, err := db.Query("SELECT book_id, name, author,image, status FROM books")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var books []Books

	for rows.Next() {
		var book Books

		err := rows.Scan(&book.ID, &book.Name, &book.Author, &book.Image, &book.Status)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		books = append(books, book)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

func getBookByID(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var book Books

	err := db.QueryRow("SELECT book_id, name, author, status FROM books WHERE book_id = ?", id).Scan(&book.ID, &book.Name, &book.Author, &book.Image, &book.Status)

	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Libro no encontrado", http.StatusNotFound)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(book)
}

func updateBook(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var book Books
	err := json.NewDecoder(r.Body).Decode(&book)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	bookID, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, "Invalido el ID", http.StatusBadRequest)
		return
	}

	_, err = db.Exec("UPDATE books SET name= ?, author = ?, image= ? WHERE book_id = ?", book.Name, book.Author, book.Image, bookID)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	book.ID = bookID

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(book)

}

// func deleteBook (w http.ResponseWriter, r *http.Request){
// 	vars := mux.Vars(r)
// 	bookID := vars["id"]

// 	_, err := getBookByID(bookID)
// 	if err != nil{
// 		w.WriteHeader(http.StatusNotFound)
// 		fmt.Fprintf(w,"Libro no encontrado por el ID %s", bookID)
// 		return
// 	}

// 	err = deleteBookByID(bookID)
// 	if err != nil{
// 		w.WriteHeader(http.StatusInternalServerError)
// 		fmt.Fprint(w,"Error al eliminar el libro")
// 		return
// 	}
// 	w.WriteHeader(http.StatusNoContent)
// }

//////////////////Conexiòn a la BD de Contact////////////////////////

type Contacts struct {
	ID      int     `json:"id"`
	Name    string  `json:"name"`
	Email   string  `json:"email"`
	Message *string `json:"message"`
}

// Función Controller para crear un libro tomando las propiedades de la estructura y subir los valores a la BD.
func createContactNew(w http.ResponseWriter, r *http.Request) {

	var contacts Contacts
	json.NewDecoder(r.Body).Decode(&contacts)

	result, err := db.Exec(`INSERT INTO contact (name, email,message) VALUES (?,?,?)`, contacts.Name, contacts.Email, contacts.Message)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	lastInsertID, err := result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	contacts.ID = int(lastInsertID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(contacts)
}

//////////////////Conexiòn a la BD de Register////////////////////////

type Users struct {
	ID        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Country   string `json:"country"`
}

// Función Controller para crear un libro tomando las propiedades de la estructura y subir los valores a la BD.
func createUserNew(w http.ResponseWriter, r *http.Request) {

	var users Users
	json.NewDecoder(r.Body).Decode(&users)

	result, err := db.Exec(`INSERT INTO users (first_name, last_name, email, password, country) VALUES (?,?,?,?,?)`, users.FirstName, users.LastName, users.Email, users.Password, users.Country)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	lastInsertID, err := result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	users.ID = int(lastInsertID)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

type Identification struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var ident Identification

	err := json.NewDecoder(r.Body).Decode(&ident)
	if err != nil {
		http.Error(w, "Información invalidad", http.StatusBadRequest)
		return
	}

	// var storedPassword string
	// err = db.QueryRow("SELECT password FROM users WHERE email = ?", ident.Email).Scan(&storedPassword)
	// if err != nil {
	// 	if err == sql.ErrNoRows {
	// 		http.Error(w, "Email ingresado no existe", http.StatusUnauthorized)
	// 	} else {
	// 		http.Error(w, "Error con la base de datos", http.StatusInternalServerError)
	// 	}
	// 	return
	// }
	storedPassword, err := getStoredPassword(ident.Email)
	if err != nil {
		http.Error(w, "Usuario no encotrado", http.StatusBadRequest)
		return
	}

	if storedPassword != ident.Password {
		http.Error(w, "Contraseña invalida", http.StatusUnauthorized)
		return
	}
	http.Redirect(w, r, "./Inicio", http.StatusSeeOther)
	// err = bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(ident.Password))
	// if err != nil {
	// 	http.Error(w, "Contraseña invalida", http.StatusUnauthorized)
	// 	return
	// }

	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "Inicio de Sesion exitoso")

}

func getStoredPassword(email string) (string, error) {
	var storedPassword string

	err := db.QueryRow("SELECT password FROM users WHERE email = ?", email).Scan(&storedPassword)
	if err != nil {
		return "", err
	}
	return storedPassword, nil
}
