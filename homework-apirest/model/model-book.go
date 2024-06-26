package model

type Books struct {
	ID     int    `json:"book_id"`
	Name   string `json:"name"`
	Author string `json:"author"`
	Image  string `json:"image"`
	Status *bool  `json:"status"`
}
