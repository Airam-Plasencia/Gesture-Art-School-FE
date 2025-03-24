import axios from "axios";

class GeminiService {
    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:3000",
        });
    }

    postRecommendations = (text) => {
        return this.api.post("gemini/recommendations", { text });
    };
}

const geminiService = new GeminiService();
export default geminiService;













