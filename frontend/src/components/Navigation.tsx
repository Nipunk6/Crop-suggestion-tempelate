import {
  Menu,
  X,
  Leaf,
  TrendingUp,
  Shield,
  FileText,
  MessageCircle,
  LogIn,
  LogOut,
  User, // TODO: Import User icon
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // TODO: Import Link for navigation

interface NavigationProps {
  isAuthenticated: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
  requireAuth: (action: () => void) => void;
}

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
    { name: "Support", icon: MessageCircle, href: "#support" },
  ];

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-gradient-primary shadow-earth sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2"> {/* TODO: Changed div to Link for home */}
            <Leaf className="w-8 h-8 text-primary-foreground" />
            <span className="text-xl font-bold text-primary-foreground">
              FarmTech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="flex items-center space-x-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            ))}

            {/* TODO: Switched Logout Button with Profile Link */}
            {isAuthenticated ? (
              <Link to="/profile">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-green-700 text-white hover:bg-green-800 ml-4 border border-white/20"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
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
                onClick={(e) => {
                  handleSmoothScroll(e, item.href);
                  setIsOpen(false);
                }}
                className="flex items-center space-x-3 py-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </a>
            ))}

            {/* TODO: Switched Mobile Logout Button with Profile Link */}
            <div className="pt-4 mt-2 border-t border-white/20">
              {isAuthenticated ? (
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white justify-start">
                    <User className="w-5 h-5 mr-3" />
                    My Profile
                  </Button>
                </Link>
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