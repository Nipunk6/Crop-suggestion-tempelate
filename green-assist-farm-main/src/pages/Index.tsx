import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import CropSuggestionForm from "@/components/CropSuggestionForm";
import DiseaseDetection from "@/components/DiseaseDetection";
import GovernmentSchemes from "@/components/GovernmentSchemes";
import { TrendingUp, Leaf, Shield, Phone, Mail, MapPin } from "lucide-react";
import cropIcon from "@/assets/crop-suggestion-icon.jpg";
import diseaseIcon from "@/assets/plant-health-icon.jpg";
import schemesIcon from "@/assets/government-schemes-icon.jpg";

const Index = () => {
  const features = [
    {
      title: "Smart Crop Suggestions",
      description: "Get AI-powered crop recommendations based on your soil, climate, and market conditions.",
      icon: TrendingUp,
      image: cropIcon,
      buttonText: "Explore Crops",
      onClick: () => document.getElementById('crops')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      title: "Disease Detection",
      description: "Upload plant images for instant disease identification and treatment recommendations.",
      icon: Leaf,
      image: diseaseIcon,
      buttonText: "Scan Plant",
      onClick: () => document.getElementById('disease')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      title: "Government Schemes",
      description: "Access information about subsidies, loans, and government support programs for farmers.",
      icon: Shield,
      image: schemesIcon,
      buttonText: "View Schemes",
      onClick: () => document.getElementById('schemes')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* Features Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Comprehensive Farming Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to make informed farming decisions, from crop selection to disease management and financial support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
              />
            ))}
          </div>
        </div>
      </section>

      <CropSuggestionForm />
      <DiseaseDetection />
      <GovernmentSchemes />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">FarmTech</h3>
              <p className="text-primary-foreground/80">
                Empowering farmers with smart technology for sustainable agriculture and better yields.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#crops" className="hover:text-primary-foreground transition-colors">Crop Suggestions</a></li>
                <li><a href="#disease" className="hover:text-primary-foreground transition-colors">Disease Detection</a></li>
                <li><a href="#schemes" className="hover:text-primary-foreground transition-colors">Government Schemes</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Weather Forecast</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@farmtech.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Delhi, India</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 FarmTech. All rights reserved. Built for farmers, by farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;