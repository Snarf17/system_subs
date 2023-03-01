package models

import "time"

type User struct {
	Id        int
	Name      string
	Email     string
	Password  string
	Role      string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type UserResponse struct {
	ID    int
	Name  string
	Email string
	Role  string
}

func (UserResponse) TableName() string {
	return "users"
}
