import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  MapPin, 
  History, 
  Edit2, 
  Camera, 
  LogOut, 
  Loader2, 
  Save, 
  X,
  Leaf,
  AlertTriangle
} from "lucide-react";
import apiService from "../backendfunctions/auth"; // ✅ Ensure this path matches your folder structure

// Interfaces
interface Prediction {
  _id: string;
  cropName?: string; 
  diseaseName?: string; 
  confidence?: number;
  createdAt: string; 
  type: "crop-suggestion" | "disease-detection";
  image?: string;
}

interface UserProfile {
  _id: string;
  userName: string;
  email: string;
  avatar: string;
}

interface ProfilePageProps {
  user: UserProfile | null;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<"profile" | "history">("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Edit State
  const [editName, setEditName] = useState(user?.userName || "");
  const [editAvatar, setEditAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  // History State
  const [history, setHistory] = useState<Prediction[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(user.userName);
    }
  }, [user]);


  useEffect(() => {
    if (activeTab === "history") {
      fetchHistory();
    }
  }, [activeTab]);

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
  
      const res = await apiService.getUserHistory();
      
     
      setHistory(res.data); 
      
    } catch (error) {
      console.error("Failed to fetch history", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditAvatar(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      if (editName !== user?.userName) {
        await apiService.changeAccountDetails({ userName: editName });
      }

      if (editAvatar) {
        const formData = new FormData();
        formData.append("avatar", editAvatar);
        await apiService.changeAvatar(formData);
      }
      
      alert("Profile updated successfully!");
      setIsEditing(false);
      window.location.reload(); 
    } catch (error: any) {
      alert(error?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-20 text-center text-gray-500">Please log in to view profile.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-green-600 to-green-400"></div>
          <div className="px-8 pb-8 relative">
            <div className="absolute -top-16 left-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-md">
                  <img 
                    src={previewAvatar || user.avatar || "https://via.placeholder.com/150"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 p-2 bg-green-600 rounded-full text-white cursor-pointer hover:bg-green-700 transition-colors shadow-lg">
                    <Camera size={16} />
                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                  </label>
                )}
              </div>
            </div>

            <div className="pt-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 focus:outline-none px-1"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900">{user.userName}</h1>
                )}
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <Mail size={16} /> {user.email}
                </p>
              </div>

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2"
                    >
                      <X size={18} /> Cancel
                    </button>
                    <button 
                      onClick={handleSaveChanges}
                      disabled={loading}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 flex items-center gap-2 disabled:opacity-70"
                    >
                      {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Edit2 size={18} /> Edit Profile
                  </button>
                )}
                
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 flex items-center gap-2"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
              activeTab === "profile" 
                ? "text-green-600 border-b-2 border-green-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-3 px-1 font-medium text-sm transition-colors relative ${
              activeTab === "history" 
                ? "text-green-600 border-b-2 border-green-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Prediction History
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-semibold mb-4">Account Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-3">
                  <Leaf size={20} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{history.filter(h => h.type === 'crop-suggestion').length}</div>
                <div className="text-sm text-gray-600">Crops Analyzed</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-3">
                  <AlertTriangle size={20} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{history.filter(h => h.type === 'disease-detection').length}</div>
                <div className="text-sm text-gray-600">Diseases Detected</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                  <History size={20} />
                </div>
                <div className="text-2xl font-bold text-gray-900">Active</div>
                <div className="text-sm text-gray-600">Account Status</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-4">
            {historyLoading ? (
              <div className="flex justify-center p-12">
                <Loader2 className="animate-spin text-green-600" size={32} />
              </div>
            ) : history.length === 0 ? (
              <div className="text-center p-12 bg-white rounded-2xl shadow-sm">
                <Leaf className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-900">No history found</h3>
                <p className="text-gray-500">Start by uploading a crop image for analysis!</p>
              </div>
            ) : (
              history.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 items-start border border-gray-100 hover:border-green-200 transition-colors">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt="Crop" 
                      className="w-full sm:w-24 h-24 object-cover rounded-lg bg-gray-100"
                    />
                  ) : (
                    
                     <div className="w-full sm:w-24 h-24 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                       <Leaf size={32} />
                     </div>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium mb-2 ${
                          item.type === 'disease-detection' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {item.type === 'disease-detection' ? 'Disease Detection' : 'Crop Suggestion'}
                        </span>
                        <h4 className="font-semibold text-lg text-gray-900">
                          {item.diseaseName || item.cropName}
                        </h4>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                      
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                      {item.confidence && (
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-gray-900">Confidence:</span>
                          <span className={item.confidence > 80 ? "text-green-600" : "text-yellow-600"}>
                            {item.confidence}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;