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
                // La respuesta ahora es un string, no un array
                setRecommendations(response.data.recommendations);
                setError("");
            })
            .catch((error) => {
                setError("Error generating recommendations");
                setRecommendations("");
            });
    };

    return (
        <div className="recommendations-container flex flex-col items-center">
            <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Enter text to get recommendations"
                className="textarea textarea-bordered w-1/3 mb-4"
            />
            <button
                onClick={handleGetRecommendations}
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                Get Recommendations
            </button>
            {recommendations && (
                <div className="summary-result mt-4">
                    <h3 className="text-xl font-bold">Recommendations:</h3>
                    {/* Mostrar el string recommendations directamente */}
                    <p style={{ whiteSpace: "pre-line", textAlign: "left" }}>{recommendations.replace(/\\n/g, '\n').replace(/\n\n+/g, '\n\n')}</p>
                </div>
            )}
            {error && <p className="text-error mt-4">{error}</p>}
        </div>
    );
}













