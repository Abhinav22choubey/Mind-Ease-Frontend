import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const PHQ9App = ({
  isCompleted,
  setIsCompleted,
  answers,
  setAnswers,
  setPhqResult,
  phqResult,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed. Or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead, or of hurting yourself",
  ];

  const options = [
    { value: 0, label: "Not at all", color: "bg-green-100 border-green-300 text-green-800" },
    { value: 1, label: "Several days", color: "bg-yellow-100 border-yellow-300 text-yellow-800" },
    { value: 2, label: "More than half the days", color: "bg-orange-100 border-orange-300 text-orange-800" },
    { value: 3, label: "Nearly every day", color: "bg-red-100 border-red-300 text-red-800" },
  ];

  const handleAnswerSelect = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  // ---------------- FRONTEND CALCULATION ----------------
  const calculateScore = () =>
    Object.values(answers).reduce((sum, value) => sum + value, 0);

  const getSeverity = (score) => {
    if (score <= 4) return ["Minimal", "Maintain healthy habits like sleep, hydration, and social connection."];
    if (score <= 9) return ["Mild", "Try journaling, light exercise, and talking to a friend."];
    if (score <= 14) return ["Moderate", "Consider mindfulness apps or speaking with a counselor."];
    if (score <= 19) return ["Moderately Severe", "Professional support is recommended. Therapy can help."];
    return ["Severe", "Seek immediate help from a mental health professional or helpline."];
  };

  const handleFinish = async () => {
    const userId = "user123";
    const phq9Array = Array.from({ length: 9 }, (_, i) => answers[i] || 0);

    // ---- Instant frontend result ----
    const score = phq9Array.reduce((a, b) => a + b, 0);
    const [severity, suggestion] = getSeverity(score);

    setPhqResult({
      userId,
      phq9: { score, severity, suggestion }, // immediate result
    });
    setIsCompleted(true);

    // ---- Async backend call (for chatbot only) ----
    try {
      const res = await fetch("https://mind-ease-backend.vercel.app/mental-health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: userId, phq9: phq9Array }),
      });
      const data = await res.json(); // { phq9, followUpResponse }
      setPhqResult({ userId, ...data }); // updates with follow-up
    } catch (err) {
      console.error("Backend error:", err);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
    else handleFinish();
  };

 // ---------------- Result view ----------------
if (isCompleted && phqResult?.phq9) {
  const { phq9 } = phqResult;
  return (
    <div className="p-8">
      <div className="text-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-light mb-2">Assessment Complete</h1>
        <p>Score: {phq9.score} / 27</p>
        <p className="font-medium">{phq9.severity}</p>
        {/* ✅ Keep suggestion permanently */}
        <p className="mt-2 text-gray-700">{phq9.suggestion}</p>
      </div>
    </div>
  );
}


  // ---------------- Question view ----------------
  return (
    <div className="p-8">
      <h2 className="text-2xl mb-6 text-center">{questions[currentQuestion]}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleAnswerSelect(opt.value)}
            className={`p-4 rounded-2xl border-2 text-center transition-all duration-200 ${
              answers[currentQuestion] === opt.value
                ? `${opt.color} scale-105`
                : "bg-white/50 hover:bg-gray-50 border-gray-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`px-6 py-3 rounded-full ${
            currentQuestion === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border hover:bg-gray-50"
          }`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous
        </button>
        <button
          onClick={handleNext}
          disabled={answers[currentQuestion] === undefined}
          className={`px-6 py-3 rounded-full ${
            answers[currentQuestion] === undefined
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
          }`}
        >
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PHQ9App;
