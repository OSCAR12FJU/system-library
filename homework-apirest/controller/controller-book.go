package controller

import (
	"database/sql"
	"encoding/json"
	"homework-apirest/model"
	"homework-apirest/service"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type BookController struct {
	Service *service.BookService
}

func (c *BookController) CreateBookNew(w http.ResponseWriter, r *http.Request) {
	var book model.Books

	err := json.NewDecoder(r.Body).Decode(&book)
	if err != nil {
		http.Error(w, "Datos invalidos", http.StatusBadRequest)
		return
	}

	newBook, err := c.Service.CreateBookNew(&book)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newBook)
}

func (c *BookController) GetBooks(w http.ResponseWriter, r *http.Request) {
	books, err := c.Service.GetBooks()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

func (c *BookController) UpdateBook(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var book model.Books
	err := json.NewDecoder(r.Body).Decode(&book)
	if err != nil {
		http.Error(w, "Información invalida", http.StatusBadRequest)
		return
	}
	bookID, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, "Invalido ID", http.StatusBadRequest)
		return
	}
	book.ID = bookID

	updatedBook, err := c.Service.UpdateBook(book)
	if err != nil {
		http.Error(w, "Error updating book", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedBook)
}

func (c *BookController) GetBookByID(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http.Error(w, "Id invalido", http.StatusBadRequest)
		return
	}

	book, err := c.Service.GetBookByID(id)
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
