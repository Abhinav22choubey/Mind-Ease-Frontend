import { useState } from "react";
import { Calendar, Plus, Heart, Smile, Frown, Meh } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const DailyDiary = () => {
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState("");

  const moods = [
    { id: "great", label: "Great", icon: Smile, color: "bg-success" },
    { id: "good", label: "Good", icon: Heart, color: "bg-primary" },
    { id: "okay", label: "Okay", icon: Meh, color: "bg-accent" },
    { id: "down", label: "Down", icon: Frown, color: "bg-secondary" },
  ];

  const recentEntries = [
    {
      date: "Today",
      mood: "good", 
      preview: "Had a productive day at work. Feeling grateful for the support from my team...",
      fullDate: "March 15, 2024"
    },
    {
      date: "Yesterday", 
      mood: "great",
      preview: "Went for a morning walk and practiced meditation. Feeling much more centered...",
      fullDate: "March 14, 2024"
    },
    {
      date: "2 days ago",
      mood: "okay", 
      preview: "Challenging day but managed to complete my goals. Learning to be patient with myself...",
      fullDate: "March 13, 2024"
    }
  ];

  const handleSaveEntry = () => {
    if (currentEntry.trim()) {
      // Here you would save to your backend
      console.log("Saving entry:", { entry: currentEntry, mood: selectedMood });
      setCurrentEntry("");
      setSelectedMood("");
    }
  };

  const getMoodIcon = (moodId: string) => {
    const mood = moods.find(m => m.id === moodId);
    if (!mood) return null;
    const Icon = mood.icon;
    return <Icon className="w-4 h-4" />;
  };

  const getMoodColor = (moodId: string) => {
    return moods.find(m => m.id === moodId)?.color || "bg-muted";
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Daily Diary
            </h2>
            <p className="text-lg text-muted-foreground">
              Reflect on your day and track your emotional journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* New Entry Card */}
            <Card className="shadow-soft hover:shadow-primary transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Today's Entry</span>
                </CardTitle>
                <CardDescription>
                  How are you feeling today? Share your thoughts and emotions.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Mood Selector */}
                <div>
                  <label className="text-sm font-medium mb-3 block">How are you feeling?</label>
                  <div className="flex flex-wrap gap-2">
                    {moods.map((mood) => {
                      const Icon = mood.icon;
                      return (
                        <Button
                          key={mood.id}
                          variant={selectedMood === mood.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedMood(mood.id)}
                          className={`transition-smooth ${
                            selectedMood === mood.id 
                              ? `${mood.color} shadow-primary` 
                              : "hover:bg-muted"
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {mood.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Text Entry */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Your thoughts</label>
                  <Textarea
                    placeholder="Write about your day, your feelings, or anything on your mind..."
                    value={currentEntry}
                    onChange={(e) => setCurrentEntry(e.target.value)}
                    className="min-h-[120px] resize-none border-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                <Button
                  onClick={handleSaveEntry}
                  disabled={!currentEntry.trim()}
                  className="w-full bg-gradient-primary shadow-primary hover:shadow-glow transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Save Entry
                </Button>
              </CardContent>
            </Card>

            {/* Recent Entries */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Recent Entries</CardTitle>
                <CardDescription>
                  Your emotional journey over the past few days
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {recentEntries.map((entry, index) => (
                  <div 
                    key={index}
                    className="p-4 border border-primary/10 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full ${getMoodColor(entry.mood)} flex items-center justify-center text-white`}>
                          {getMoodIcon(entry.mood)}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{entry.date}</h4>
                          <p className="text-xs text-muted-foreground">{entry.fullDate}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {moods.find(m => m.id === entry.mood)?.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
                      {entry.preview}
                    </p>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full hover:bg-primary/10 hover:border-primary/40 transition-colors">
                  View All Entries
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyDiary;