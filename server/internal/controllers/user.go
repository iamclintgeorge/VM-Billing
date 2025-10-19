package controllers

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/iamclintgeorge/VM-Billing/internal/config"
	"github.com/iamclintgeorge/VM-Billing/internal/models"
	"golang.org/x/crypto/bcrypt"
)

// Login handles POST /api/login with session cookies
func LoginController(c *gin.Context) {
	var req struct {
		EmailId  string `json:"emailId"`
		Password string `json:"password"`
	}

	// Bind JSON body
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "invalid request"})
		return
	}

	// db := config.Connect()

	// Find user by email
var user models.User
if err := config.DB.First(&user, "emailId = ?", req.EmailId).Error; err != nil {
    c.JSON(http.StatusUnauthorized, gin.H{"message": "invalid email or password"})
    return
}
	// Compare password
	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)) != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "invalid password"})
		return
	}

	// Create session
	session := sessions.Default(c)
	session.Set("user_id", user.ID)
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "failed to save session"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "login successful"})
}


// LogoutController handles logging out the current user
func LogoutController(c *gin.Context) {
	session := sessions.Default(c)
	userID := session.Get("user_id")

	if userID == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "No user is logged in"})
		return
	}

	// Destroy session
	session.Clear()
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Could not log out",
			"error":   err.Error(),
		})
		return
	}

	// Clear cookie manually (optional, Gin sessions usually handles this)
	c.SetCookie("session", "", -1, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}
