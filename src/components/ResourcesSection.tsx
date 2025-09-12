import { Play, FileText, Headphones, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ResourcesSection = () => {
  const resources = [
    {
      id: "audio",
      title: "Audio Resources",
      description: "Guided meditations, relaxing soundscapes, and therapy sessions",
      icon: Headphones,
      gradient: "bg-gradient-primary",
      items: ["Meditation Sessions", "Sleep Stories", "Breathing Exercises", "Nature Sounds"],
      count: "25+ Sessions"
    },
    {
      id: "video",
      title: "Video Resources", 
      description: "Wellness videos, yoga sessions, and educational content",
      icon: Play,
      gradient: "bg-gradient-secondary",
      items: ["Yoga Classes", "Therapy Sessions", "Mindfulness Videos", "Exercise Routines"],
      count: "15+ Videos"
    },
    {
      id: "documentation",
      title: "Documentation",
      description: "Articles, guides, and research-backed wellness information",
      icon: FileText,
      gradient: "bg-gradient-accent",
      items: ["Mental Health Guides", "Research Articles", "Self-Help Resources", "Expert Tips"],
      count: "50+ Articles"
    }
  ];

  return (
    <section className="py-16 bg-gradient-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Wellness Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover a comprehensive collection of tools and content designed to support your mental health journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Card key={resource.id} className="group hover:shadow-glow transition-all duration-500 hover:-translate-y-2 border-primary/10 flex flex-col h-full">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-2xl ${resource.gradient} flex items-center justify-center mx-auto mb-4 shadow-primary group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{resource.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {resource.description}
                  </CardDescription>
                  <div className="text-xs font-medium text-primary mt-2">
                    {resource.count}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 flex flex-col h-full">
                  <div className="space-y-2 flex-grow">
                    {resource.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${resource.gradient} shadow-primary hover:shadow-glow transition-all duration-300 mt-auto`}
                    size="sm"
                  >
                    Explore Resources
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;