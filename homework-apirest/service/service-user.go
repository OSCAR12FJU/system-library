package service

import (
	"homework-apirest/model"
	"homework-apirest/repository"
)

type UserService struct {
	Repo *repository.UserRepository
}

func (service *UserService) CreateUserNew(users *model.Users) (*model.Users, error) {
	id, err := service.Repo.CreateUserNew(users)
	if err != nil {
		return nil, err
	}
	users.ID = id
	return users, nil

}
