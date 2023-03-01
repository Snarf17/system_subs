package models

import "time"

type Variants struct {
	ID                 int
	Name               string
	SubscribePeriodDay time.Time
	Price              int
	Description        string
	CreatedAt          time.Time
	UpdatedAt          time.Time
}

type VariantResponse struct {
	ID                 int
	Name               string
	SubscribePeriodDay time.Time
	Description        string
}

func (VariantResponse) TableName() string {
	return "variants"
}
