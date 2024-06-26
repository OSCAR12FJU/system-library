package repository

import (
	"database/sql"
	"homework-apirest/model"
)

type UserRepository struct {
	DB *sql.DB
}

func (repo *UserRepository) CreateUserNew(users *model.Users) (int, error) {
	result, err := repo.DB.Exec(`INSERT INTO users (first_name, last_name, email, password, country) VALUES (?,?,?,?,?)`, users.FirstName, users.LastName, users.Email, users.Password, users.Country)
	if err != nil {
		return 0, nil
	}
	lastInsertId, err := result.LastInsertId()
	if err != nil {
		return 0, nil
	}
	return int(lastInsertId), nil
}
