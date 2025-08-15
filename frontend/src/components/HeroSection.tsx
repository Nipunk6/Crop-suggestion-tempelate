import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BarChart3, Shield } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";

const HeroSection = () => {
  const stats = [
    { icon: Users, label: "Farmers Helped", value: "10,000+" },
    { icon: BarChart3, label: "Crops Analyzed", value: "50,000+" },
    { icon: Shield, label: "Diseases Detected", value: "15,000+" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-glow/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Smart Farming Solutions for Modern Agriculture
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Get intelligent crop suggestions, detect plant diseases instantly, and access government schemes - all in one platform designed for farmers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="secondary" className="shadow-glow">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-card/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary-foreground mb-1">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;