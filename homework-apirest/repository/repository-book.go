package repository

import (
	"database/sql"
	"homework-apirest/model"
)

type BookRepository struct {
	DB *sql.DB
}

func (repo *BookRepository) CreateBookNew(books *model.Books) (int, error) {
	result, err := repo.DB.Exec(`INSERT INTO books (name, author, image) VALUES (?,?,?)`, books.Name, books.Author, books.Image)
	if err != nil {
		return 0, nil
	}
	lastInsertID, err := result.LastInsertId()
	if err != nil {
		return 0, nil
	}
	return int(lastInsertID), nil
}

func (repo *BookRepository) GetAllBooks() ([]model.Books, error) {
	rows, err := repo.DB.Query("SELECT book_id, name, author,image, status FROM books")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var books []model.Books

	for rows.Next() {
		var book model.Books
		err := rows.Scan(&book.ID, &book.Name, &book.Author, &book.Image, &book.Status)
		if err != nil {
			return nil, err
		}
		books = append(books, book)
	}
	return books, nil
}

func (repo *BookRepository) UpdateBook(book model.Books) error {
	_, err := repo.DB.Exec("UPDATE books SET name= ?, author = ?, image= ? WHERE book_id = ?", book.Name, book.Author, book.Image, book.ID)
	return err
}

func (repo *BookRepository) GetBookByID(id int) (*model.Books, error) {
	var book model.Books
	err := repo.DB.QueryRow("SELECT book_id, name, author, image, status FROM books WHERE book_id = ?", id).Scan(&book.ID, &book.Name, &book.Author, &book.Image, &book.Status)
	if err != nil {
		return nil, err
	}
	return &book, nil
}
