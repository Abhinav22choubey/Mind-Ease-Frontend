import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Calendar, Send, Moon, Heart, GraduationCap, Smile } from "lucide-react";

const DailyQuestions = () => {
  const [responses, setResponses] = useState({
    sleepHours: "",
    sleepQuality: "",
    mood: "",
    dayRating: "",
    academicPressure: "",
    stressLevel: "",
    notes: ""
  });

  const questions = [
    {
      id: "sleepHours",
      type: "number",
      label: "How many hours did you sleep last night?",
      icon: Moon,
      placeholder: "e.g., 7.5"
    },
    {
      id: "sleepQuality",
      type: "radio",
      label: "How was your sleep quality?",
      icon: Moon,
      options: ["Poor", "Fair", "Good", "Excellent"]
    },
    {
      id: "mood",
      type: "radio", 
      label: "How are you feeling today?",
      icon: Smile,
      options: ["Very Low", "Low", "Neutral", "Good", "Great"]
    },
    {
      id: "dayRating",
      type: "radio",
      label: "How was your day overall?",
      icon: Heart,
      options: ["Terrible", "Poor", "Okay", "Good", "Amazing"]
    },
    {
      id: "academicPressure",
      type: "radio",
      label: "Is the academic pressure too high today?",
      icon: GraduationCap,
      options: ["Not at all", "Slightly", "Moderate", "High", "Overwhelming"]
    },
    {
      id: "stressLevel",
      type: "radio",
      label: "What's your stress level right now?",
      icon: GraduationCap,
      options: ["Very Low", "Low", "Medium", "High", "Very High"]
    }
  ];

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    console.log("Daily responses:", responses);
    // Here you could save to a database or local storage
    alert("Daily check-in saved! Keep taking care of yourself 💜");
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Daily Check-In Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Take a moment to reflect on your day and track your wellbeing. Your responses help us understand your mental health journey better.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/10 shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-primary">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-semibold">Today's Wellness Check</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {questions.map((question) => {
                const Icon = question.icon;
                return (
                  <div key={question.id} className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-secondary flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <Label className="text-base font-medium text-foreground">
                        {question.label}
                      </Label>
                    </div>
                    
                    {question.type === "number" && (
                      <Input
                        type="number"
                        placeholder={question.placeholder}
                        value={responses[question.id as keyof typeof responses]}
                        onChange={(e) => handleResponseChange(question.id, e.target.value)}
                        className="max-w-xs border-primary/20 focus:border-primary/40"
                        step="0.5"
                        min="0"
                        max="24"
                      />
                    )}
                    
                    {question.type === "radio" && (
                      <RadioGroup
                        value={responses[question.id as keyof typeof responses]}
                        onValueChange={(value) => handleResponseChange(question.id, value)}
                        className="grid grid-cols-2 md:grid-cols-5 gap-3"
                      >
                        {question.options?.map((option) => (
                          <div key={option} className="flex items-center space-x-2 p-3 rounded-lg border border-primary/10 hover:bg-primary/5 transition-colors">
                            <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                            <Label 
                              htmlFor={`${question.id}-${option}`} 
                              className="text-sm cursor-pointer flex-1"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </div>
                );
              })}
              
              {/* Additional Notes */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <Label className="text-base font-medium text-foreground">
                    Any additional thoughts or concerns about your day?
                  </Label>
                </div>
                <Textarea
                  placeholder="Share anything else that's on your mind... (optional)"
                  value={responses.notes}
                  onChange={(e) => handleResponseChange("notes", e.target.value)}
                  className="min-h-[100px] border-primary/20 focus:border-primary/40"
                />
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button 
                  onClick={handleSubmit}
                  className="bg-gradient-primary shadow-primary hover:shadow-glow transition-all duration-300 px-8"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Complete Daily Check-In
                </Button>
              </div>
              
              {/* Progress Encouragement */}
              <div className="text-center p-4 bg-success/10 border border-success/20 rounded-lg">
                <p className="text-sm text-success font-medium">
                  💜 Great job taking time for self-reflection! Every check-in helps us understand your patterns better.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DailyQuestions;