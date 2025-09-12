import { useState } from "react";
import { Plus, Target, CheckCircle2, Circle, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const GoalsSection = () => {
  const [newGoal, setNewGoal] = useState("");
  const [goals, setGoals] = useState([
    { id: 1, text: "Practice 10 minutes of meditation daily", completed: true, category: "Mindfulness" },
    { id: 2, text: "Go for a 30-minute walk", completed: true, category: "Exercise" },
    { id: 3, text: "Write in my journal", completed: false, category: "Reflection" },
    { id: 4, text: "Call a friend or family member", completed: false, category: "Social" },
    { id: 5, text: "Practice gratitude - list 3 things I'm grateful for", completed: false, category: "Gratitude" },
    { id: 6, text: "Read for 20 minutes", completed: false, category: "Self-care" },
  ]);

  const categories = ["Mindfulness", "Exercise", "Reflection", "Social", "Gratitude", "Self-care"];
  const categoryColors = {
    "Mindfulness": "bg-primary",
    "Exercise": "bg-success",
    "Reflection": "bg-accent",
    "Social": "bg-secondary",
    "Gratitude": "bg-gradient-secondary",
    "Self-care": "bg-gradient-accent"
  };

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      const newGoalItem = {
        id: Date.now(),
        text: newGoal,
        completed: false,
        category: "Self-care" // Default category
      };
      setGoals([...goals, newGoalItem]);
      setNewGoal("");
    }
  };

  const toggleGoal = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;
  const completionPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <section className="py-16 bg-gradient-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Daily Goals
            </h2>
            <p className="text-lg text-muted-foreground">
              Set and track your daily wellness goals to build positive habits
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progress Overview */}
            <Card className="shadow-soft hover:shadow-primary transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Today's Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${completionPercentage * 2.51} 251`}
                      className="text-primary"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {completedGoals} of {totalGoals} goals completed
                  </p>
                  <Badge 
                    className={`${
                      completionPercentage >= 80 ? "bg-success" : 
                      completionPercentage >= 50 ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {completionPercentage >= 80 ? "Excellent!" : 
                     completionPercentage >= 50 ? "Good Progress" : "Keep Going!"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Goals List */}
            <Card className="lg:col-span-2 shadow-soft">
              <CardHeader>
                <CardTitle>Your Goals</CardTitle>
                <CardDescription>
                  Check off completed goals and add new ones to stay motivated
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Add New Goal */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a new goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
                    className="flex-1 border-primary/20 focus:border-primary"
                  />
                  <Button 
                    onClick={handleAddGoal}
                    className="bg-gradient-primary shadow-primary hover:shadow-glow transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Goals List */}
                <div className="space-y-3">
                  {goals.map((goal) => (
                    <div 
                      key={goal.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 group ${
                        goal.completed 
                          ? "bg-success/10 border-success/30" 
                          : "bg-card border-primary/10 hover:border-primary/30"
                      }`}
                    >
                      <Checkbox
                        checked={goal.completed}
                        onCheckedChange={() => toggleGoal(goal.id)}
                        className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm transition-all duration-300 ${
                          goal.completed 
                            ? "line-through text-muted-foreground" 
                            : "text-foreground"
                        }`}>
                          {goal.text}
                        </p>
                        <Badge 
                          variant="outline" 
                          className={`mt-1 text-xs ${categoryColors[goal.category as keyof typeof categoryColors] || "bg-muted"} text-white border-0`}
                        >
                          {goal.category}
                        </Badge>
                      </div>

                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-primary/10"
                        >
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteGoal(goal.id)}
                          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {goals.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No goals yet. Add your first goal above!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;