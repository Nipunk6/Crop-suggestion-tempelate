import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, IndianRupee, Calendar, Users } from "lucide-react";

const GovernmentSchemes = () => {
  const schemes = [
    {
      name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      description: "Direct income support to small and marginal farmers",
      amount: "₹6,000 per year",
      eligibility: "Small & marginal farmers",
      deadline: "Ongoing",
      status: "Active",
      category: "Income Support"
    },
    {
      name: "Kisan Credit Card (KCC)",
      description: "Credit facility for farmers to meet agricultural expenses",
      amount: "Up to ₹3 lakhs",
      eligibility: "All farmers",
      deadline: "Ongoing",
      status: "Active",
      category: "Credit"
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme for farmers",
      amount: "Premium subsidy up to 90%",
      eligibility: "All farmers",
      deadline: "Seasonal",
      status: "Active",
      category: "Insurance"
    },
    {
      name: "National Mission for Sustainable Agriculture",
      description: "Support for climate-resilient farming practices",
      amount: "₹50,000 - ₹5 lakhs",
      eligibility: "Progressive farmers",
      deadline: "March 2025",
      status: "Active",
      category: "Technology"
    },
    {
      name: "Soil Health Card Scheme",
      description: "Free soil testing and nutrient recommendations",
      amount: "Free service",
      eligibility: "All farmers",
      deadline: "Ongoing",
      status: "Active",
      category: "Soil Health"
    },
    {
      name: "Agriculture Infrastructure Fund",
      description: "Financing for agricultural infrastructure projects",
      amount: "Up to ₹2 crores",
      eligibility: "FPOs, cooperatives",
      deadline: "2025-26",
      status: "Active",
      category: "Infrastructure"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Income Support": "bg-success/10 text-success border-success/20",
      "Credit": "bg-primary/10 text-primary border-primary/20",
      "Insurance": "bg-earth/10 text-earth border-earth/20",
      "Technology": "bg-accent/10 text-accent border-accent/20",
      "Soil Health": "bg-success/10 text-success border-success/20",
      "Infrastructure": "bg-primary/10 text-primary border-primary/20"
    };
    return colors[category as keyof typeof colors] || "bg-muted";
  };

  return (
    <section id="schemes" className="py-16 bg-gradient-sky">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Government Schemes & Subsidies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and apply for various government schemes designed to support farmers with financial aid, insurance, and infrastructure development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, index) => (
            <Card key={index} className="group hover:shadow-earth transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge className={getCategoryColor(scheme.category)}>
                    {scheme.category}
                  </Badge>
                  <Badge variant="outline" className="text-success border-success">
                    {scheme.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{scheme.name}</CardTitle>
                <CardDescription>{scheme.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <IndianRupee className="w-4 h-4 text-success" />
                    <span className="font-medium">{scheme.amount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span>Eligible: {scheme.eligibility}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Deadline: {scheme.deadline}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-primary hover:shadow-glow group-hover:scale-105 transition-all duration-300">
                  Apply Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Need Help with Applications?
              </h3>
              <p className="text-muted-foreground mb-4">
                Our team can assist you with scheme applications, document preparation, and eligibility verification.
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GovernmentSchemes;