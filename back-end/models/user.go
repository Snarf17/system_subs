package models

import "time"

type User struct {
	Id        int
	Name      string `json:"name" gorm:"type: varchar(255)"`
	Email     string `json:"email" gorm:"type: varchar(255)"`
	Password  string `json:"password" gorm:"type: varchar(255)"`
	Role      string `json:"role" gorm:"type: varchar(255)"`
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
