package routes

import "github.com/gorilla/mux"

func RouteInit(r *mux.Router) {
	UserRoute(r)
	CompaniesRoute(r)
	AuthRoutes(r)
}
