package routes

import (
	"system-subscribe/handlers"
	"system-subscribe/pkg/middleware"
	"system-subscribe/pkg/mysql"
	"system-subscribe/repositories"

	"github.com/gorilla/mux"
)

func CompaniesRoute(r *mux.Router) {
	CompaniesRepository := repositories.RepositoryCompany(mysql.DB)
	h := handlers.HandleCompany(CompaniesRepository)

	r.HandleFunc("/companies", h.ShowCompanies).Methods("GET")
	r.HandleFunc("/companies/{id}", h.GetCompaniesId).Methods("GET")
	r.HandleFunc("/subscribes/{id}", h.UpdateCompanies).Methods("PATCH")
	r.HandleFunc("/createcompanies", middleware.Auth(h.CreateCompanies)).Methods("POST")
}
