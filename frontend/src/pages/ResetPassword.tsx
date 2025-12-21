import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import apiService from "@/backendfunctions/auth";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      if (newPassword !== confirmPassword)
        throw new Error("Passwords do not match");
      if (!token) throw new Error("Invalid reset token");
      const resp = await apiService.resetPassword(token, newPassword);
      setMessage(resp?.message || "Password reset successfully");
      setTimeout(() => navigate("/"), 2500);
    } catch (err: any) {
      setMessage(err?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Reset Password
        </h1>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            className="w-full rounded-lg border border-gray-300 p-3"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full rounded-lg border border-gray-300 p-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 text-white py-3 font-semibold"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Reset Password"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
