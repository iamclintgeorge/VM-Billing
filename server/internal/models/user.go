package models

import "time" 

type User struct {
	ID        uint      `gorm:"primaryKey"`
	Email     string    `gorm:"unique;column:emailId"`
	UserName  string	`gorm:"column:userName"`
	Password  string	`gorm:"column:password"` 
	Role 	string	`gorm:"coulmn:role"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"` 
}
