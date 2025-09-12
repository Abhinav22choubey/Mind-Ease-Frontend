import { ArrowRight, Shield, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  const features = [
    { icon: Heart, text: "AI-Powered Support" },
    { icon: Shield, text: "Safe & Confidential" },
    { icon: Clock, text: "24/7 Available" }
  ];

  return (
    <section className="relative py-12 lg:py-16 bg-gradient-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge className="mb-6 bg-gradient-primary text-primary-foreground shadow-primary animate-pulse">
            ✨ Your AI Mental Wellness Companion
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Chat with AI
            </span>
            <br />
            <span className="text-foreground">For Mental Wellness</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience personalized mental health support through our advanced AI chatbot. Get instant help, track your mood, and find your path to wellness.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-primary/10 rounded-full px-4 py-2 shadow-soft hover:shadow-primary transition-all duration-300 hover:scale-105"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-gradient-primary shadow-glow hover:shadow-primary transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-colors text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by thousands for mental wellness support
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-xs font-medium">HIPAA Compliant</div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="text-xs font-medium">End-to-End Encrypted</div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="text-xs font-medium">Clinically Backed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;