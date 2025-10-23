package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/iamclintgeorge/VM-Billing/internal/controllers"
	"github.com/iamclintgeorge/VM-Billing/internal/middleware"
)

func VMRoutes(rg *gin.RouterGroup) {
	vms := rg.Group("/vms")
	vms.Use(middleware.AuthMiddleware())
	{
		vms.GET("", controllers.GetUserVMs)
		vms.GET("/:vmid", controllers.GetVMDetails)
		vms.POST("/:vmid/:action", controllers.ControlVM)
		vms.POST("/link", controllers.LinkVMToUser)
	}
}
