package main

import (
	"log"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize Gin router
	r := gin.Default()

	// Setup cookie-based session store
	store := cookie.NewStore([]byte("super-secret-key"))
	r.Use(sessions.Sessions("session", store))

	// Simple login handler (mocked for now)
	r.POST("/api/login", func(c *gin.Context) {
		session := sessions.Default(c)
		session.Set("user", "test-user")
		session.Save()
		c.JSON(200, gin.H{"message": "Logged in"})
	})

	// Simple logout handler (mocked for now)
	r.POST("/api/logout", func(c *gin.Context) {
		session := sessions.Default(c)
		session.Delete("user")
		session.Save()
		c.JSON(200, gin.H{"message": "Logged out"})
	})

	// Public route
	r.GET("/api/me", func(c *gin.Context) {
		session := sessions.Default(c)
		user := session.Get("user")
		if user == nil {
			c.JSON(401, gin.H{"message": "Not authenticated"})
		} else {
			c.JSON(200, gin.H{"user": user})
		}
	})

	// Protected route
	protected := r.Group("/api/protected")
	protected.Use(func(c *gin.Context) {
		session := sessions.Default(c)
		user := session.Get("user")
		if user == nil {
			c.JSON(401, gin.H{"message": "Unauthorized"})
			c.Abort()
			return
		}
		c.Next()
	})

	protected.GET("/data", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "You are authenticated!"})
	})

	// Start server
	log.Println("Server running on http://localhost:8080")
	r.Run(":8080")
}
