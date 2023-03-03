package repositories

import (
	"system-subscribe/models"

	"gorm.io/gorm"
)

type CompaniesRepository interface {
	ShowCompanies() ([]models.Companies, error)
	GetCompanies(ID int) (models.Companies, error)
	CreateCompanies(companies models.Companies) (models.Companies, error)
	UpdateCompanies(companies models.Companies) (models.Companies, error)
}

func RepositoryCompany(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) ShowCompanies() ([]models.Companies, error) {
	var companies []models.Companies
	err := r.db.Preload("User").Preload("Variant").Find(&companies).Error
	return companies, err
}
func (r *repository) GetCompanies(ID int) (models.Companies, error) {
	var Music models.Companies
	err := r.db.Preload("User").Preload("Variant").First(&Music, ID).Error

	return Music, err
}

func (r *repository) CreateCompanies(companies models.Companies) (models.Companies, error) {
	err := r.db.Omit("VariantId", "UserId").Create(&companies).Error

	return companies, err
}
func (r *repository) UpdateCompanies(companies models.Companies) (models.Companies, error) {
	err := r.db.Preload("User").Preload("Variant").Model(&companies).Updates(companies).Error
	return companies, err
}
