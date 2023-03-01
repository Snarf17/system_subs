package models

import "time"

type Companies struct {
	ID          int `json:"id"`
	UserId      int `json:"user_id"`
	User        UserResponse
	Name        string `json:"name"`
	StartDate   time.Time
	ExpiredTime time.Time
	VariantId   int `json:"variant_id"`
	Variant     VariantResponse
	Status      string `json:"status"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
