import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const quickLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Accessibility", href: "#" }
  ];

  const resources = [
    { name: "Mental Health Helpline", href: "tel:14416" },
    { name: "Emergency Services", href: "tel:108" },
    { name: "Mental Health Resources", href: "#" },
    { name: "Professional Help", href: "#" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" }
  ];

  return (
    <footer className="bg-gradient-to-br from-primary/5 to-accent/5 border-t">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-primary">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  MindEase
                </h3>
                <p className="text-xs text-muted-foreground">Mental Wellness Hub</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Supporting your mental health journey with AI-powered assistance, resources, and community support.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-colors"
                    asChild
                  >
                    <a href={social.href} aria-label={social.name}>
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Emergency Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Emergency & Resources</h4>
            <nav className="space-y-2">
              {resources.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {resource.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>support@mindease.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>1-800-MINDEASE</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Available 24/7 Online</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 MindEase. All rights reserved. Made with{" "}
            <Heart className="w-4 h-4 inline text-red-500" /> for mental wellness.
          </p>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span>HIPAA Compliant</span>
            <span>•</span>
            <span>SSL Encrypted</span>
            <span>•</span>
            <span>24/7 Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;