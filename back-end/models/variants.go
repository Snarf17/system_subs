package models

import "time"

type Variants struct {
	ID                 int
	Name               string `json:"name" gorm:"type: varchar(255)"`
	SubscribePeriodDay int
	Price              int
	Description        string `json:"description" gorm:"type: text(255)"`
	CreatedAt          time.Time
	UpdatedAt          time.Time
}

type VariantResponse struct {
	ID                 int    `json:"id"`
	Name               string `json:"name"`
	SubscribePeriodDay int    `json:"subscribe_period_day"`
	Description        string `json:"desc"`
}

func (VariantResponse) TableName() string {
	return "variants"
}
