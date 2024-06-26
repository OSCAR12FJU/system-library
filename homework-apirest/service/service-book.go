package service

import (
	"homework-apirest/model"
	"homework-apirest/repository"
)

type BookService struct {
	Repo *repository.BookRepository
}

func (service *BookService) CreateBookNew(books *model.Books) (*model.Books, error) {
	id, err := service.Repo.CreateBookNew(books)
	if err != nil {
		return nil, err
	}
	books.ID = id
	return books, nil

}

func (service *BookService) GetBooks() ([]model.Books, error) {
	books, err := service.Repo.GetAllBooks()
	if err != nil {
		return nil, err
	}
	return books, nil
}

func (service *BookService) UpdateBook(book model.Books) (model.Books, error) {
	err := service.Repo.UpdateBook(book)
	return book, err
}

func (service *BookService) GetBookByID(id int) (*model.Books, error) {
	return service.Repo.GetBookByID(id)
}
