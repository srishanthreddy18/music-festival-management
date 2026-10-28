import axios from "axios";

const API_URL = "http://localhost:9090";

class FestivalService {

    addFestival(festival) {
        return axios.post(`${API_URL}/Add`, festival);
    }

    getAllFestivals() {
        return axios.get(`${API_URL}/DisplayAll`);
    }

    deleteFestival(id) {
        return axios.delete(`${API_URL}/Delete/${id}`);
    }

    updateFestival(id, festival) {
        return axios.put(`${API_URL}/Update/${id}`, festival);
    }

    getFestivalById(id) {
        return axios.get(`${API_URL}/Display/${id}`);
    }
}

export default new FestivalService();