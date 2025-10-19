package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/iamclintgeorge/VM-Billing/internal/config"
	"github.com/iamclintgeorge/VM-Billing/internal/models"
	// "github.com/yourname/vm-billing/internal/db"
	// "github.com/yourname/vm-billing/internal/middleware"
)

func main() {
	db := config.Connect()
	db.AutoMigrate(&models.User{})
	fmt.Println("Database connected successfully:", db)
	r := gin.Default()
	// store := cookie.NewStore([]byte("super-secret-key"))
	// r.Use(sessions.Sessions("session", store))

	// database := db.Connect()
	// database.AutoMigrate(&db.User{})

	// auth := api.AuthHandler{DB: database}

	// r.POST("/api/login", auth.Login)
	// r.POST("/api/logout", auth.Logout)
	// r.GET("/api/me", auth.CurrentUser)

	// protected := r.Group("/api/protected")
	// protected.Use(middleware.RequireLogin())
	// protected.GET("/data", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{"message": "You are authenticated!"})
	// })

	log.Println("Server running on http://localhost:8080")
	r.Run(":8080")
}

