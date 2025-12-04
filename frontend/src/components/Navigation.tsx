import {
  Menu,
  X,
  Leaf,
  TrendingUp,
  Shield,
  FileText,
  LogIn,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 1. Define the props we expect from App.tsx
interface NavigationProps {
  isAuthenticated: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
}

// 2. Accept these props in the component function
const Navigation = ({
  isAuthenticated,
  onOpenLogin,
  onLogout,
}: NavigationProps) => {
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
            <span className="text-xl font-bold text-primary-foreground">
              FarmTech
            </span>
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

            {/* ADDED: Login/Logout Button for Desktop */}
            {isAuthenticated ? (
              <Button
                variant="destructive"
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white ml-4"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-green-700 hover:bg-gray-100 font-bold ml-4"
                onClick={onOpenLogin}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
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
          <div className="md:hidden py-4 space-y-2">
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

            {/* ADDED: Login/Logout Button for Mobile */}
            <div className="pt-4 mt-2 border-t border-white/20">
              {isAuthenticated ? (
                <Button
                  className="w-full bg-red-500 hover:bg-red-600 text-white justify-start"
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              ) : (
                <Button
                  className="w-full bg-white text-green-700 hover:bg-gray-100 justify-start"
                  onClick={() => {
                    onOpenLogin();
                    setIsOpen(false);
                  }}
                >
                  <LogIn className="w-5 h-5 mr-3" />
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
