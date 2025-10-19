package models

import "time" 

type User struct {
	ID        uint      `gorm:"primaryKey"`
	Email     string    `gorm:"unique"`
	UserName  string
	Password  string
	Balance   float64
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"` 
}
