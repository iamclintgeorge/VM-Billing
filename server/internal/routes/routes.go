package routes

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	// r.GET("/", func(c *gin.Context) {
	// 	c.JSON(200, gin.H{"message": "Welcome to VM Billing!"})
	// })

	api := r.Group("/api") 
{
    UserRoutes(api)
}

	// r.POST("/register", controllers.Register)
	// r.POST("/api/login", controllers.LoginController)
	// r.GET("/api/check-auth", middleware.AuthMiddleware(), middleware.CheckAuth)
	// r.POST("/api/signout", controllers.LogoutController)

}
