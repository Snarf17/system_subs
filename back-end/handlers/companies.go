package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"system-subscribe/dto"
	"system-subscribe/models"
	"system-subscribe/repositories"
	"time"

	"github.com/go-playground/validator"
	"github.com/gorilla/mux"
)

type handlerCompany struct {
	CompaniesRepository repositories.CompaniesRepository ``
}

func HandleCompany(CompaniesRepository repositories.CompaniesRepository) *handlerCompany {
	return &handlerCompany{CompaniesRepository}
}

// Show All Compnies
func (h *handlerCompany) ShowCompanies(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	company, err := h.CompaniesRepository.ShowCompanies()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: company}
	json.NewEncoder(w).Encode(response)
}

// Show Company By ID
func (h *handlerCompany) GetCompaniesId(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	GetById, err := h.CompaniesRepository.GetCompanies(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: GetById}
	json.NewEncoder(w).Encode(response)
}

// Create Companies
func (h *handlerCompany) CreateCompanies(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	date := time.Now()
	future := date.AddDate(0, 0, 30)
	user_id, _ := strconv.Atoi(r.FormValue("user_id"))
	variant_id, _ := strconv.Atoi(r.FormValue("variant_id"))

	data := models.Companies{
		UserId:      user_id,
		Name:        r.FormValue("name"),
		StartDate:   date,
		ExpiredTime: future,
		VariantId:   variant_id,
		Status:      "trial",
	}

	validation := validator.New()
	err := validation.Struct(data)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data2, err := h.CompaniesRepository.CreateCompanies(data)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	getId, err := h.CompaniesRepository.GetCompanies(data2.ID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: getId}
	json.NewEncoder(w).Encode(response)
}

// Update Companies
func (h *handlerCompany) UpdateCompanies(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// UserInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	// userID := int(UserInfo["id"].(float64))

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	getData, err := h.CompaniesRepository.GetCompanies(int(id))

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if r.FormValue("status") != "" {
		getData.Status = r.FormValue("status")
	}

	user_id, _ := strconv.Atoi(r.FormValue("user_id"))
	if user_id != 0 {
		getData.UserId = user_id
	}

	variant_id, _ := strconv.Atoi(r.FormValue("variant_id"))
	if user_id != 0 {
		getData.VariantId = variant_id
	}

	data, err := h.CompaniesRepository.UpdateCompanies(getData)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// success
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}
