package main

import (
	"log"

	"github.com/iamclintgeorge/VM-Billing/internal/config"
	"github.com/iamclintgeorge/VM-Billing/internal/models"
)

func main() {
	config.Connect()
	
	// Create Proxmox config
	proxmoxConfig := models.ProxmoxConfig{
		Host:     "192.168.0.242",
		Port:     "8006",
		NodeName: "pve",
		APIToken: "root@pam!go-test=2c749185-ae22-4ded-b901-40c519c0b5e1", // Replace this
	}
	
	if err := config.DB.Create(&proxmoxConfig).Error; err != nil {
		log.Fatal("Failed to create Proxmox config:", err)
	}
	
	log.Println("Proxmox config created successfully!")
	
	// Link VM to user (user_id = 1)
	userVM := models.UserVM{
		UserID:   1, // Change this if your user has different ID
		VMID:     100,
		VMName:   "test-vm",
		NodeName: "pve",
	}
	
	if err := config.DB.Create(&userVM).Error; err != nil {
		log.Fatal("Failed to link VM:", err)
	}
	
	log.Println("VM linked to user successfully!")
}
