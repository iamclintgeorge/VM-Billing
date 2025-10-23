package models

import "time"

type UserVM struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `gorm:"not null;index" json:"user_id"`
	VMID      int       `gorm:"not null" json:"vm_id"`
	VMName    string    `gorm:"not null" json:"vm_name"`
	NodeName  string    `gorm:"not null" json:"node_name"`
	Status    string    `gorm:"default:'stopped'" json:"status"`
	CreatedAt time.Time `json:"created_at"`
	User      User      `gorm:"foreignKey:UserID" json:"-"`
}

type ProxmoxConfig struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Host      string    `gorm:"not null" json:"host"`
	Port      string    `gorm:"not null" json:"port"`
	NodeName  string    `gorm:"not null" json:"node_name"`
	APIToken  string    `gorm:"not null" json:"api_token"`
	CreatedAt time.Time `json:"created_at"`
}

func (UserVM) TableName() string {
	return "user_vms"
}

func (ProxmoxConfig) TableName() string {
	return "proxmox_config"
}