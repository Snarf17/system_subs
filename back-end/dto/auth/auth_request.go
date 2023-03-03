package authdto

import (
	"time"
)

type RegisterRequest struct {
	Name      string `json:"name" form:"name" validate:"required"`
	Email     string `json:"email" form:"email" validate:"required"`
	Password  string `json:"password" form:"password" validate:"required"`
	Role      string `json:"role" form:"role"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
type LoginRequest struct {
	Email    string ` json:"email" form:"password" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
}
