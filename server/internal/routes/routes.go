package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/iamclintgeorge/VM-Billing/internal/controllers"
	"github.com/iamclintgeorge/VM-Billing/internal/middleware"
)

func RegisterRoutes(r *gin.Engine) {
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Welcome to VM Billing!"})
	})

	// r.POST("/register", controllers.Register)
	r.POST("/api/login", controllers.Login)

	r.GET("/api/check-auth", middleware.AuthMiddleware(), middleware.CheckAuth)

}
