import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  buttonText: string;
  onClick: () => void;
  className?: string;
}

const FeatureCard = ({ title, description, icon: Icon, image, buttonText, onClick, className = "" }: FeatureCardProps) => {
  return (
    <Card className={`group hover:shadow-earth transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <CardHeader className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-sky p-1">
          <img src={image} alt={title} className="w-full h-full object-cover rounded-full" />
        </div>
        <CardTitle className="flex items-center justify-center gap-2 text-primary">
          <Icon className="w-5 h-5" />
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={onClick}
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;