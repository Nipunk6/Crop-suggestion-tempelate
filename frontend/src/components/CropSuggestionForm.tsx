import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Thermometer, Droplets, Leaf } from "lucide-react";
import { CropPrediction } from "@/backendfunctions/cropP";

interface CropFormProps {
  requireAuth: (action: () => void) => void;
}







const OPEN_WEATHER_DEMO_KEY = "69db702a07e0431609de63e355cf3731";

const CropSuggestionForm = ({ requireAuth }: CropFormProps) => {
  const [formData, setFormData] = useState({
    location: "",
    latitude: "",
    longitude: "",
    temperature: "",
    humidity: "",
    soilType: "",
    soilMoisture: "",
    area: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  });

 const [cropInfo, setCropInfo] = useState<string | null>(null);


  const buildPayloadForBackend = () => {
  return {
    temperature: Number(formData.temperature),
    humidity: Number(formData.humidity),
    moisture: Number(formData.soilMoisture),
    soil_type: formData.soilType,

    
    ...(formData.nitrogen && { nitrogen: Number(formData.nitrogen) }),
    ...(formData.phosphorus && { phosphorus: Number(formData.phosphorus) }),
    ...(formData.potassium && { potassium: Number(formData.potassium) }),
  };
};


  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);

  
  const getBrowserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported");
      return;
    }

    setLoadingWeather(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setFormData((prev) => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lon.toString(),
          location: "Current Location",
        }));
      },
      () => {
        setLocationError("Location permission denied");
        setLoadingWeather(false);
      }
    );
  };

  useEffect(() => {
  if (!formData.latitude || !formData.longitude) return;

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${formData.latitude}&lon=${formData.longitude}&units=metric&appid=${OPEN_WEATHER_DEMO_KEY}`
      );

      const data = await res.json();

      // ❗ IMPORTANT: validate response
      if (!res.ok || !data.main) {
        console.error("Weather API error:", data);
        setLocationError("Unable to fetch weather data");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        temperature: data.main.temp.toString(),
        humidity: data.main.humidity.toString(),
      }));
    } catch (err) {
      console.error("Weather fetch failed", err);
      setLocationError("Weather service unavailable");
    } finally {
      setLoadingWeather(false);
    }
  };

  fetchWeather();
}, [formData.latitude, formData.longitude]);


 
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  requireAuth(async () => {
    setLoading(true);
    try {
      const predictor = new CropPrediction();
      const payload = buildPayloadForBackend();

      const response = await predictor.predictCrop(payload);

      const cropResult = response.data?.crop;
      const info = response.data?.info;

      if (Array.isArray(cropResult)) {
        setSuggestions(cropResult);
      } else if (cropResult) {
        setSuggestions([cropResult]);
      } else {
        setSuggestions([]);
      }

      setCropInfo(info ?? null);
    } catch (error) {
      console.error("Prediction error", error);
    } finally {
      setLoading(false);
    }
  });
};


  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              Smart Crop Suggestions
            </CardTitle>
            <CardDescription>
              Weather data is automatically fetched using your current location
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              
              <div className="space-y-2 md:col-span-2">
                <Label>Location</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={getBrowserLocation}
                  className="w-full flex items-center gap-2"
                  disabled={loadingWeather}
                >
                  <MapPin className="w-4 h-4" />
                  {loadingWeather
                    ? "Detecting location..."
                    : "Use My Location"}
                </Button>
                {locationError && (
                  <p className="text-sm text-red-500">{locationError}</p>
                )}
              </div>

              
              <div className="space-y-2">
                <Label>Farm Area (acres)</Label>
                <Input
                  type="number"
                  required
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                />
              </div>

             
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  Temperature (°C)
                </Label>
                <Input value={formData.temperature} 
                        type="number"
                        onChange={(e) =>
                    setFormData({ ...formData, temperature: e.target.value })
                         }
                 />
              </div>

              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  Humidity (%)
                </Label>
                <Input value={formData.humidity}
                type="number"
                        onChange={(e) =>
                    setFormData({ ...formData, humidity: e.target.value })
                        }
                        />
              </div>

            
              <div className="space-y-2">
                <Label>Soil Type *</Label>
                <Select
                  required
                  onValueChange={(value) =>
                    setFormData({ ...formData, soilType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="loamy">Loamy</SelectItem>
                    <SelectItem value="silty">Silty</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            
              <div className="space-y-2">
                <Label>Soil Moisture (%) *</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={formData.soilMoisture}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      soilMoisture: e.target.value,
                    })
                  }
                />
              </div>

             
              <div className="md:col-span-2 mt-6 border-t pt-4">
                <h3 className="font-semibold mb-4">
                  🧪 If Soil Test Available (Optional)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Nitrogen (N)"
                    value={formData.nitrogen}
                    onChange={(e) =>
                      setFormData({ ...formData, nitrogen: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Phosphorus (P)"
                    value={formData.phosphorus}
                    onChange={(e) =>
                      setFormData({ ...formData, phosphorus: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Potassium (K)"
                    value={formData.potassium}
                    onChange={(e) =>
                      setFormData({ ...formData, potassium: e.target.value })
                    }
                  />
                </div>
              </div>

             
              <div className="md:col-span-2">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Analyzing..." : "Get Crop Suggestions"}
                </Button>
              </div>
            </form>

           {suggestions.length > 0 && (
  <div className="mt-8 space-y-6">
    {/* Crop wale ka response */}
    <div className="p-5 border rounded-lg bg-green-50">
      <h4 className="text-lg font-semibold text-green-800 mb-2">
        🌱 Recommended Crop
      </h4>
      <ul className="list-disc list-inside text-green-900">
        {suggestions.map((crop, index) => (
          <li key={index} className="font-medium">
            {crop}
          </li>
        ))}
      </ul>
    </div>

    {/* Gemini ka response added */}
    {cropInfo && (
      <div className="p-5 border rounded-lg bg-blue-50">
        <h4 className="text-lg font-semibold text-blue-800 mb-3">
          🤖 AI Explanation
        </h4>

        <p className="text-sm leading-relaxed text-blue-900 whitespace-pre-line">
          {cropInfo}
        </p>
      </div>
    )}
  </div>
)}

          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CropSuggestionForm;
