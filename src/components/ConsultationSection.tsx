import { Calendar, Video, Clock, Star, User, GraduationCap, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ConsultationSection = () => {
  const consultationTypes = [
    {
      id: "psychiatrist",
      title: "Psychiatrist Consultation",
      description: "Professional medical consultation for mental health conditions, medication management, and clinical treatment plans",
      icon: Brain,
      gradient: "bg-gradient-primary",
      features: [
        "Medical diagnosis and treatment",
        "Medication prescriptions and management",
        "Clinical therapy sessions",
        "Mental health condition assessment",
        "Treatment plan development"
      ],
      pricing: "Starting at ₹1,200/session",
      duration: "45-60 minutes",
      availability: "Same day appointments available",
      rating: "4.9/5",
      practitioners: "120+ Licensed Psychiatrists"
    },
    {
      id: "counselor",
      title: "College Counselor Consultation", 
      description: "Specialized support for students dealing with academic stress, social anxiety, and transitional challenges",
      icon: GraduationCap,
      gradient: "bg-gradient-secondary",
      features: [
        "Academic stress management",
        "Social anxiety support",
        "Career guidance and planning",
        "Relationship and social issues",
        "Time management strategies"
      ],
      pricing: "Free",
      duration: "30-45 minutes", 
      availability: "Evening and weekend slots",
      rating: "4.8/5",
      practitioners: "80+ Student Counselors"
    }
  ];

  const timeSlots = [
    "9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM", "7:00 PM"
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Professional Consultations
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with licensed mental health professionals for personalized care and expert guidance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {consultationTypes.map((consultation) => {
            const Icon = consultation.icon;
            return (
              <Card key={consultation.id} className="group hover:shadow-glow transition-all duration-500 hover:-translate-y-2 border-primary/10">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 rounded-2xl ${consultation.gradient} flex items-center justify-center shadow-primary group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold mb-2">{consultation.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {consultation.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Pricing and Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Starting Price</p>
                      <p className="font-semibold text-primary">{consultation.pricing}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-semibold">{consultation.duration}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-medium mb-3 text-sm">What's Included:</h4>
                    <div className="space-y-2">
                      {consultation.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span>{consultation.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{consultation.practitioners}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{consultation.availability}</span>
                    </div>
                  </div>

                  {/* Available Time Slots */}
                  <div>
                    <h4 className="font-medium mb-3 text-sm">Available Today:</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.slice(0, 6).map((time, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-8 border-primary/20 hover:bg-primary/10 hover:border-primary/40"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      className={`flex-1 ${consultation.gradient} shadow-primary hover:shadow-glow transition-all duration-300`}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-primary/20 hover:bg-primary/10 hover:border-primary/40"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Video Call
                    </Button>
                  </div>

                  {/* Additional Info */}
                  {consultation.id === "psychiatrist" && (
                    <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-xs text-success font-medium">
                        ✓ Insurance accepted • Secure & confidential • Licensed professionals
                      </p>
                    </div>
                  )}
                  {consultation.id === "counselor" && (
                    <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-xs text-success font-medium">
                        ✓ Secure & confidential • Licensed professionals • Student support
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <div className="p-6 bg-gradient-to-r from-destructive/10 to-destructive/20 border border-destructive/30 rounded-xl max-w-2xl mx-auto">
            <h3 className="font-semibold text-destructive mb-4">Need Immediate Help?</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="destructive" className="shadow-lg">
                <span className="mr-2">📞</span>
                Call Mental Health Helpline: 14416
              </Button>
              <Button variant="outline" className="border-destructive/30 hover:bg-destructive/10">
                <span className="mr-2">🚨</span>
                Emergency: 108
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection;