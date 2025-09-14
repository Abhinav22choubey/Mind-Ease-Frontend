import React, { useState } from "react";
import PHQ9App from "./PHQ9App";
import MainChatBot from "./MainChatBot";
import { Button } from "../../components/ui/button";


const MentalHealthDashboard = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState({}); // store PHQ-9 answers
  const [phqResult, setPhqResult] = useState(null); // backend response
  const [showChatbot, setShowChatbot] = useState(true); // toggle chatbot

  const handleRetake = () => {
    setIsCompleted(false);
    setAnswers({});
    setPhqResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {!isCompleted ? (
        // Full-screen PHQ-9 Test
        <PHQ9App
          isCompleted={isCompleted}
          setIsCompleted={setIsCompleted}
          answers={answers}
          setAnswers={setAnswers}
          setPhqResult={setPhqResult}
        />
      ) : (
        // Split screen: PHQ-9 Result + Chatbot
        <div
          className={`grid h-screen ${
            showChatbot ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {/* Left Side: Results */}
          <div className="h-full overflow-y-auto p-6">
            <PHQ9App
              isCompleted={isCompleted}
              setIsCompleted={setIsCompleted}
              answers={answers}
              setAnswers={setAnswers}
              setPhqResult={setPhqResult}
              phqResult={phqResult}
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <button
                onClick={handleRetake}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
              >
                Take Another Test
              </button>

              <button className="px-6 py-3 rounded-full bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition">
                Home
              </button>

              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition">
                Explore More
              </button>

              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition">
                Counselor Support
              </button>

              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition">
                Psychiatrist Consultation
              </button>

              {/* Toggle Chatbot */}
              <button
                onClick={() => setShowChatbot(!showChatbot)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
              >
                {showChatbot ? "Hide Chatbot" : "Show Chatbot"}
              </button>
              <div className="mt-12 text-center">
                <div className="p-6 bg-gradient-to-r from-destructive/10 to-destructive/20 border border-destructive/30 rounded-xl max-w-2xl mx-auto">
                  <h3 className="font-semibold text-destructive mb-4">
                    Need Immediate Help?
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="destructive" className="shadow-lg">
                      <span className="mr-2">📞</span>
                      Call Mental Health Helpline: 14416
                    </Button>
                    <Button
                      variant="outline"
                      className="border-destructive/30 hover:bg-destructive/10"
                    >
                      <span className="mr-2">🚨</span>
                      Emergency: 108
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Chatbot */}
          {showChatbot && (
            <div className="h-full border-l border-gray-300">
              <MainChatBot
                phqResult={phqResult}
                onClose={() => setShowChatbot(false)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MentalHealthDashboard;
