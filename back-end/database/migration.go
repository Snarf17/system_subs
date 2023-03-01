package database

import (
	"fmt"
	"system-subscribe/models"
	"system-subscribe/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Companies{},
		&models.Variants{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
