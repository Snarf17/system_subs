package routes

import (
	"system-subscribe/handlers"
	"system-subscribe/pkg/middleware"
	"system-subscribe/pkg/mysql"
	"system-subscribe/repositories"

	"github.com/gorilla/mux"
)

func AuthRoutes(r *mux.Router) {
	AuthRepository := repositories.RepositoryLogReg(mysql.DB)
	h := handlers.HandlerLogReg(AuthRepository)

	r.HandleFunc("/registration", h.Register).Methods("POST")
	r.HandleFunc("/login", h.Login).Methods("POST")
	r.HandleFunc("/check-auth", middleware.Auth(h.CheckAuth)).Methods("GET")
}
