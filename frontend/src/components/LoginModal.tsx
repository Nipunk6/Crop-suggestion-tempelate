import React, { useState } from "react";
import { X, Loader2, Upload } from "lucide-react"; // Added Upload icon
import apiService from "../backendfunctions/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [loading, setLoading] = useState(false);

  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setFullName] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null); // New State for File

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLoginView) {
        // --- LOGIN ---
        await apiService.loginUser(email, password);
        onLoginSuccess();
        onClose();
      } else {
        // --- SIGN UP ---
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("userName", userName); // Correct capitalization for backend

        // Append the file if it exists
        if (avatar) {
          formData.append("avatar", avatar);
        } else {
          alert("Please upload a profile picture");
          setLoading(false);
          return;
        }

        await apiService.registerUser(formData);

        alert("Account created successfully! Please login.");
        setIsLoginView(true);
      }
    } catch (error: any) {
      console.error("Auth Error:", error);
      let errorMessage = "Something went wrong";
      if (typeof error === "string") errorMessage = error;
      else if (error?.message) errorMessage = error.message;
      else if (error?.error) errorMessage = error.error;
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-green-700">
            {isLoginView ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-gray-500">
            {isLoginView
              ? "Login to access smart farming tools"
              : "Join FarmTech today"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLoginView && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                value={userName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              {/* File Upload Input */}
              <div className="flex items-center gap-2 border border-gray-300 p-2 rounded-lg cursor-pointer hover:bg-gray-50">
                <Upload size={20} className="text-gray-500" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setAvatar(e.target.files ? e.target.files[0] : null)
                  }
                  className="text-sm text-gray-600 w-full cursor-pointer file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  required
                />
              </div>
            </>
          )}

          <input
            type="text"
            placeholder="Email"
            className="rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : isLoginView ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          {isLoginView
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLoginView(!isLoginView)}
            className="font-semibold text-green-600 hover:underline"
          >
            {isLoginView ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
