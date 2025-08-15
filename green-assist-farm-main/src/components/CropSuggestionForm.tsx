import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Thermometer, Droplets, Gauge } from "lucide-react";

const CropSuggestionForm = () => {
  const [formData, setFormData] = useState({
    location: "",
    soilType: "",
    rainfall: "",
    temperature: "",
    ph: "",
    area: ""
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockSuggestions = [
        "Wheat - High yield potential for your soil type and climate",
        "Rice - Suitable for monsoon season with current rainfall",
        "Corn - Good market price and moderate water requirement",
        "Sugarcane - Long-term crop with good profit margins"
      ];
      setSuggestions(mockSuggestions);
      setLoading(false);
    }, 2000);
  };

  return (
    <section id="crops" className="py-16 bg-gradient-sky">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Smart Crop Suggestions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get personalized crop recommendations based on your land conditions, climate, and soil analysis.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-earth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Land Analysis Form
              </CardTitle>
              <CardDescription>
                Provide details about your farmland to get accurate crop suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter your city/district"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Farm Area (acres)</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="Enter area in acres"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select onValueChange={(value) => setFormData({...formData, soilType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay Soil</SelectItem>
                      <SelectItem value="sandy">Sandy Soil</SelectItem>
                      <SelectItem value="loamy">Loamy Soil</SelectItem>
                      <SelectItem value="silty">Silty Soil</SelectItem>
                      <SelectItem value="rocky">Rocky Soil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ph" className="flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    Soil pH Level
                  </Label>
                  <Input
                    id="ph"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    placeholder="e.g., 6.5"
                    value={formData.ph}
                    onChange={(e) => setFormData({...formData, ph: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rainfall" className="flex items-center gap-2">
                    <Droplets className="w-4 h-4" />
                    Annual Rainfall (mm)
                  </Label>
                  <Input
                    id="rainfall"
                    type="number"
                    placeholder="e.g., 800"
                    value={formData.rainfall}
                    onChange={(e) => setFormData({...formData, rainfall: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature" className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4" />
                    Avg. Temperature (°C)
                  </Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="e.g., 25"
                    value={formData.temperature}
                    onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:shadow-glow"
                    disabled={loading}
                  >
                    {loading ? "Analyzing..." : "Get Crop Suggestions"}
                  </Button>
                </div>
              </form>

              {suggestions.length > 0 && (
                <div className="mt-8 p-6 bg-success/10 rounded-lg border border-success/20">
                  <h3 className="text-lg font-semibold text-success mb-4">Recommended Crops for Your Land:</h3>
                  <ul className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-success">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CropSuggestionForm;