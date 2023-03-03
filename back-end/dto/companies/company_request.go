package companiesdto

import "time"

type CompaniesRequest struct {
	UserId      int       `json:"user_id"`
	Name        string    `json:"name" gorm:"type: varchar(255)"`
	StartDate   time.Time `json:"start_date"`
	ExpiredTime time.Time `json:"expired_time"`
	VariantId   int       `json:"variant_id"`
	Status      string    `json:"status" gorm:"type: varchar(255)"`
}
