package models

import "time"

type Companies struct {
	ID          int             `json:"id"`
	UserId      int             `json:"-"`
	User        UserResponse    `json:"user"`
	Name        string          `json:"name" gorm:"type: varchar(255)"`
	StartDate   time.Time       `json:"start_date"`
	ExpiredTime time.Time       `json:"expired_time"`
	VariantId   int             `json:"-"`
	Variant     VariantResponse `json:"variant"`
	Status      string          `json:"status" gorm:"type: varchar(255)"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
