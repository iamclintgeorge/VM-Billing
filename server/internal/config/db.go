package config

import (
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	var err error
	DB, err = gorm.Open(sqlite.Open("vm_billing.db"), &gorm.Config{}) // use = not :=
	if err != nil {
		log.Fatal("Failed to connect to SQLite:", err)
	}
}
