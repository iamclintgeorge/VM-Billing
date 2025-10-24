package routes

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	api := r.Group("/api") 
	{
    		UserRoutes(api)
		// VMRoutes(api)
	}

	proxmox := r.Group("/api/proxmox") 
	{
		ProxmoxRoutes(proxmox)
	}
}
