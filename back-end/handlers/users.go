package handlers

import (
	"encoding/json"
	"net/http"
	"system-subscribe/dto"
	"system-subscribe/repositories"
)

type handlerUser struct {
	UserRepository repositories.UserRepository
}

func HandlerUser(UserRepository repositories.UserRepository) *handlerUser {
	return &handlerUser{UserRepository}
}

func (h *handlerUser) ShowUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	users, err := h.UserRepository.ShowUsers()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: users}
	json.NewEncoder(w).Encode(response)
}

// func (h *handlerUser) CreateUsers(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	// rName, _ := r.FormValue("name")
// 	old, _ := strconv.Atoi(r.FormValue("old"))
// 	// rType, _ := r.FormValue("type")
// 	// rStartCarer, _ := r.FormValue("startcarer")
// 	request := artistdto.ArtistRequest{
// 		Name:       r.FormValue("name"),
// 		Old:        old,
// 		Type:       r.FormValue("type"),
// 		StartCarer: r.FormValue("startcarer"),
// 	}

// 	validation := validator.New()
// 	err := validation.Struct(request)
// 	if err != nil {
// 		w.WriteHeader(http.StatusBadRequest)
// 		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
// 		json.NewEncoder(w).Encode(response)
// 		return
// 	}

// 	artist := models.Artist{
// 		Name:       request.Name,
// 		Old:        request.Old,
// 		Type:       request.Type,
// 		StartCarer: request.StartCarer,
// 	}

// 	dataArtist, err := h.ArtistRepository.AddArtist(artist)
// 	if err != nil {
// 		w.WriteHeader(http.StatusInternalServerError)
// 		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
// 		json.NewEncoder(w).Encode(response)
// 		return
// 	}

// 	getArtist, err := h.ArtistRepository.GetArtist(dataArtist.ID)
// 	if err != nil {
// 		w.WriteHeader(http.StatusInternalServerError)
// 		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
// 		json.NewEncoder(w).Encode(response)
// 		return
// 	}

// 	w.WriteHeader(http.StatusOK)
// 	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseArtist(getArtist)}
// 	json.NewEncoder(w).Encode(response)
// }
