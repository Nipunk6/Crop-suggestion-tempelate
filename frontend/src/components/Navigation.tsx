import { Menu, X, Leaf, TrendingUp, Shield, FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Crop Suggestions", icon: TrendingUp, href: "#crops" },
    { name: "Disease Detection", icon: Leaf, href: "#disease" },
    { name: "Government Schemes", icon: Shield, href: "#schemes" },
    { name: "Resources", icon: FileText, href: "#resources" },
  ];

  return (
    <nav className="bg-gradient-primary shadow-earth sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-primary-foreground" />
            <span className="text-xl font-bold text-primary-foreground">FarmTech</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-primary-foreground hover:bg-primary-glow/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 py-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;