import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Camera, AlertCircle, CheckCircle } from "lucide-react";

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        disease: "Leaf Blight",
        confidence: 87,
        severity: "Moderate",
        treatment: [
          "Apply copper-based fungicide every 10-14 days",
          "Remove affected leaves and destroy them",
          "Ensure proper air circulation around plants",
          "Avoid overhead watering to reduce humidity"
        ],
        prevention: [
          "Plant disease-resistant varieties",
          "Maintain proper spacing between plants",
          "Apply preventive fungicide sprays during humid weather"
        ]
      };
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 3000);
  };

  return (
    <section id="disease" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Plant Disease Detection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a photo of your plant to get instant AI-powered disease analysis and treatment recommendations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-earth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Disease Analysis Tool
              </CardTitle>
              <CardDescription>
                Take a clear photo of affected leaves or upload an existing image
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected plant"
                        className="max-w-full h-64 object-contain mx-auto rounded-lg"
                      />
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                        <div>
                          <p className="text-lg font-medium">Click to upload image</p>
                          <p className="text-sm text-muted-foreground">
                            Supports JPG, PNG up to 10MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  <Button
                    onClick={analyzeImage}
                    disabled={!selectedImage || loading}
                    className="w-full bg-gradient-primary hover:shadow-glow"
                  >
                    {loading ? "Analyzing..." : "Analyze Plant Health"}
                  </Button>
                </div>

                {/* Results Section */}
                <div className="space-y-4">
                  {analysis ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-5 h-5 text-destructive" />
                          <h3 className="font-semibold text-destructive">Disease Detected</h3>
                        </div>
                        <p className="text-lg font-medium">{analysis.disease}</p>
                        <p className="text-sm text-muted-foreground">
                          Confidence: {analysis.confidence}% | Severity: {analysis.severity}
                        </p>
                      </div>

                      <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-primary mb-3">Treatment Recommendations:</h4>
                        <ul className="space-y-2">
                          {analysis.treatment.map((step: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                        <h4 className="font-semibold text-success mb-3">Prevention Tips:</h4>
                        <ul className="space-y-2">
                          {analysis.prevention.map((tip: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Upload an image to start plant health analysis</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DiseaseDetection;