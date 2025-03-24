import { useState } from "react";
import geminiService from "../../services/gemini.service";

export default function Recommendations() {
    const [text, setText] = useState("");
    const [recommendations, setRecommendations] = useState("");
    const [error, setError] = useState("");

    const handleTextChange = (e) => setText(e.target.value);

    const handleGetRecommendations = () => {
        geminiService
            .postRecommendations(text)
            .then((response) => {
                setRecommendations(response.data.recommendations);
                setError("");
            })
            .catch((error) => {
                setError("Error generating recommendations");
                setRecommendations("");
            });
    };

    return (
        <div className="recommendations-container">
            <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Enter text to get recommendations"
                className="textarea textarea-bordered w-full"
            />
            <button
                onClick={handleGetRecommendations}
                className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent"
            >
                Get Recommendations
            </button>
            {recommendations && (
                <div className="summary-result mt-4">
                    <h3 className="text-xl font-bold">Recommendations:</h3>
                    <p>{recommendations}</p>
                </div>
            )}
            {error && <p className="text-error mt-4">{error}</p>}
        </div>
    );
}













