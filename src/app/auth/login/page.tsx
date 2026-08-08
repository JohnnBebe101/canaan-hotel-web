"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2, ArrowLeft } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = username.trim().length > 0 && password.length > 0;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isFormValid) {
      setError("Please enter both username and password");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      const rawRedirect = searchParams.get("redirect");
      let redirect = "/admin/dashboard";

      if (rawRedirect) {
        try {
          const url = new URL(rawRedirect, "http://localhost");
          if (url.pathname.startsWith("/admin/") && url.hostname === "localhost") {
            redirect = rawRedirect;
          }
        } catch {
          // Invalid URL, use default
        }
      }

      window.location.href = redirect;
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sandstone px-4">
      <div className="max-w-md w-full">
        {/* Back Link */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-forest transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>
        </div>

        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/images/ui/Canaan-logo-100x100.svg"
              alt="Canaan International Hotel Logo"
              width={64}
              height={64}
              className="h-16 w-auto"
            />
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-forest">
            Staff Portal
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to access the hotel management dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-forest mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-forest focus:ring-2 focus:ring-cactus focus:border-transparent outline-none transition-all disabled:opacity-50"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-forest mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-forest focus:ring-2 focus:ring-cactus focus:border-transparent outline-none transition-all disabled:opacity-50"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-cactus text-white font-semibold hover:bg-forest focus:outline-none focus:ring-2 focus:ring-cactus focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-400">
          © 2025 Canaan International Hotel. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
