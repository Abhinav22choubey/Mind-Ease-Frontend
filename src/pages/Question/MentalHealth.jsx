import React, { useState } from "react";
import PHQ9App from "./PHQ9App";
import MainChatBot from "./MainChatBot";

const MentalHealthDashboard = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState({}); // store PHQ-9 answers
  const [phqResult, setPhqResult] = useState(null); // backend response

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
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
          <div className="h-full overflow-y-auto">
            <PHQ9App
              isCompleted={isCompleted}
              setIsCompleted={setIsCompleted}
              answers={answers}
              setAnswers={setAnswers}
              setPhqResult={setPhqResult}   // ✅ FIXED
              phqResult={phqResult}
            />
          </div>
          <div className="h-full border-l border-gray-300">
            <MainChatBot phqResult={phqResult} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MentalHealthDashboard;
