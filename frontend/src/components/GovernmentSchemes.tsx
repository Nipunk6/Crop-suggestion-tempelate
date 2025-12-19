import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, IndianRupee, Calendar, Users } from "lucide-react";

const GovernmentSchemes = () => {
  const schemes = [
    {
      name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      description:
        "Direct income support of ₹6,000/year in three installments to all landholding farmers",
      amount: "₹6,000 per year",
      eligibility: "All landholding farmers",
      deadline: "Ongoing",
      status: "Active",
      category: "Income Support",
      link: "https://pmkisan.gov.in/",
    },
    {
      name: "Kisan Credit Card (KCC)",
      description:
        "Credit facility for farmers to meet agricultural expenses with 3% interest subvention",
      amount: "Up to ₹3 lakhs",
      eligibility: "All farmers",
      deadline: "Ongoing",
      status: "Active",
      category: "Credit",
      link: "https://www.india.gov.in/spotlight/kisan-credit-card-kcc-scheme",
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description:
        "Comprehensive crop insurance covering all stages from sowing to post-harvest",
      amount: "Premium subsidy up to 90%",
      eligibility: "All farmers",
      deadline: "Seasonal (Kharif & Rabi)",
      status: "Active",
      category: "Insurance",
      link: "https://pmfby.gov.in/",
    },
    {
      name: "PM Kisan Maandhan Yojana",
      description:
        "Pension scheme providing ₹3,000/month to farmers aged 60+ with voluntary contribution",
      amount: "₹3,000 monthly pension",
      eligibility: "Small & marginal farmers (18-40 years)",
      deadline: "Ongoing",
      status: "Active",
      category: "Pension",
      link: "https://maandhan.in/",
    },
    {
      name: "Soil Health Card Scheme",
      description:
        "Free soil testing and nutrient-based fertilizer recommendations every 2 years",
      amount: "Free service",
      eligibility: "All farmers",
      deadline: "Ongoing",
      status: "Active",
      category: "Soil Health",
      link: "https://soilhealth.dac.gov.in/",
    },
    {
      name: "Agriculture Infrastructure Fund (AIF)",
      description:
        "Medium to long-term financing for post-harvest management infrastructure",
      amount: "Up to ₹2 crores",
      eligibility: "FPOs, cooperatives, SHGs",
      deadline: "2025-26 (FY 2032-33)",
      status: "Active",
      category: "Infrastructure",
      link: "https://agriinfra.dac.gov.in/",
    },
    {
      name: "National Mission for Sustainable Agriculture (NMSA)",
      description:
        "Support for climate-resilient farming, water conservation, and soil health management",
      amount: "Varies by component",
      eligibility: "Progressive farmers & FPOs",
      deadline: "Ongoing",
      status: "Active",
      category: "Technology",
      link: "https://nmsa.dac.gov.in/",
    },
    {
      name: "PM-KUSUM (Solar Pump Scheme)",
      description:
        "Solar-powered agriculture pumps and grid-connected solar power plants for farmers",
      amount: "90% subsidy (for small farmers)",
      eligibility: "All farmers",
      deadline: "Ongoing",
      status: "Active",
      category: "Energy",
      link: "https://pmkusum.mnre.gov.in/",
    },
    {
      name: "Formation & Promotion of FPOs",
      description:
        "Financial support for formation of Farmer Producer Organizations for collective bargaining",
      amount: "₹18 lakh over 3 years",
      eligibility: "Groups of farmers (FPO)",
      deadline: "2027-28",
      status: "Active",
      category: "Organization",
      link: "https://www.fpo.net.in/",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Income Support": "bg-success/10 text-success border-success/20",
      Credit: "bg-primary/10 text-primary border-primary/20",
      Insurance: "bg-earth/10 text-earth border-earth/20",
      Technology: "bg-accent/10 text-accent border-accent/20",
      "Soil Health": "bg-success/10 text-success border-success/20",
      Infrastructure: "bg-primary/10 text-primary border-primary/20",
      Pension:
        "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
      Energy:
        "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
      Organization:
        "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
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
            Discover and apply for various government schemes designed to
            support farmers with financial aid, insurance, and infrastructure
            development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, index) => (
            <Card
              key={index}
              className="group hover:shadow-earth transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge className={getCategoryColor(scheme.category)}>
                    {scheme.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-success border-success"
                  >
                    {scheme.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {scheme.name}
                </CardTitle>
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

                <Button
                  className="w-full bg-gradient-primary hover:shadow-glow group-hover:scale-105 transition-all duration-300"
                  onClick={() => window.open(scheme.link, "_blank")}
                >
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
                Our team can assist you with scheme applications, document
                preparation, and eligibility verification.
              </p>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
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
