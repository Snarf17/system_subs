package routes

import (
	"system-subscribe/handlers"
	"system-subscribe/pkg/mysql"
	"system-subscribe/repositories"

	"github.com/gorilla/mux"
)

func UserRoute(r *mux.Router) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	r.HandleFunc("/users", h.ShowUsers).Methods("GET")
}
