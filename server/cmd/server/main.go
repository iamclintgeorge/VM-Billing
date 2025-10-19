package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/iamclintgeorge/VM-Billing/internal/config"
	"github.com/iamclintgeorge/VM-Billing/internal/models"
	"github.com/iamclintgeorge/VM-Billing/internal/routes"
)

func main() {
	config.Connect() // initialize DB
	config.DB.AutoMigrate(&models.User{})

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	store := cookie.NewStore([]byte("super-secret-key"))
	store.Options(sessions.Options{
		Path:     "/",
		MaxAge:   3600,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	})
	r.Use(sessions.Sessions("session", store))

	routes.RegisterRoutes(r)

	log.Println("Server running on http://localhost:8080")
	r.Run(":8080")
}
