package main

import (
	"fmt"
	"net/http"
	"system-subscribe/database"
	"system-subscribe/pkg/mysql"

	"github.com/gorilla/mux"
)

func main() {
	// Initial configuration Database
	mysql.DatabaseInit()

	// Run the database Migration
	database.RunMigration()

	r := mux.NewRouter()

	fmt.Println("Server Running... in localhost:5000")
	http.ListenAndServe("localhost:5000", r)
}
