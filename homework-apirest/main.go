package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"homework-apirest/controller"
	"homework-apirest/model"
	"homework-apirest/repository"
	"homework-apirest/service"

	"net/http"

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
	var err error
	db, err = createConnection()
	if err != nil {
		panic(err)
	}
	defer db.Close()

	_, err = db.Exec("CREATE DATABASE IF NOT EXISTS `system_books`")
	if err != nil {
		panic(err.Error())
	}

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

	bookRepo := &repository.BookRepository{DB: db}
	bookService := &service.BookService{Repo: bookRepo}
	bookController := &controller.BookController{Service: bookService}

	contactRepo := &repository.ContactRepository{DB: db}
	contactService := &service.ContactService{Repo: contactRepo}
	contactController := &controller.ContactController{Service: contactService}

	userRepo := &repository.UserRepository{DB: db}
	userService := &service.UserService{Repo: userRepo}
	userController := &controller.UserController{Service: userService}

	router := mux.NewRouter()
	router.HandleFunc("/create-book", bookController.CreateBookNew).Methods("POST")
	router.HandleFunc("/get-books", bookController.GetBooks).Methods("GET")
	router.HandleFunc("/get-books/{id}", bookController.GetBookByID).Methods("GET")
	//Product Page
	router.HandleFunc("/books/{bookName}", getBookByName).Methods("GET")
	router.HandleFunc("/put-books/{id}", bookController.UpdateBook).Methods("PUT")

	// router.HandleFunc("/books", getBooks).Methods("GET")
	// router.HandleFunc("/books/{id}", getBooks).Methods("GET")
	// router.HandleFunc("/update-book/{id}", getBooks).Methods("PUT")

	//Login
	router.HandleFunc("/login", loginHandler).Methods("POST")
	// //Contacto
	router.HandleFunc("/create-contact", contactController.CreateContactNew).Methods("POST")
	// //Register
	router.HandleFunc("/create-user", userController.CreateUserNew).Methods("POST")

	handler := cors.Default().Handler(router)

	http.ListenAndServe(":8080", handler)

}

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

type User struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	var dbUser User
	fmt.Println(dbUser)
	err = db.QueryRow("SELECT id, email, password FROM users WHERE email = ?", user.Email).Scan(&dbUser.ID, &dbUser.Email, &dbUser.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "User not found", http.StatusUnauthorized)
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	if user.Password != dbUser.Password {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(dbUser)
}

func getBookByName(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	bookName := params["bookName"]

	// log.Printf("booName: %s", bookName)

	var book model.Books

	err := db.QueryRow("SELECT book_id, name, author, image, status FROM books WHERE name = ?", bookName).Scan(&book.ID, &book.Name, &book.Author, &book.Image, &book.Status)
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
