package repositories

import (
	"system-subscribe/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	ShowUsers() ([]models.User, error)
	CreateUsers(users models.User) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) ShowUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Find(&users).Error
	return users, err
}

func (r *repository) CreateUsers(users models.User) (models.User, error) {
	err := r.db.Create(&users).Error

	return users, err
}
