package model

type Contacts struct {
	ID      int     `json:"id"`
	Name    string  `json:"name"`
	Email   string  `json:"email"`
	Message *string `json:"message"`
}
