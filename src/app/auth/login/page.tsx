"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Admin Login Page
 * Route: /auth/login
 *
 * Handles admin authentication via credentials stored in environment variables
 */

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in request/response
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Redirect to dashboard or the originally requested page
      const rawRedirect = searchParams.get("redirect");
      let redirect = "/admin/dashboard";

      if (rawRedirect) {
        // Validate redirect URL - only allow relative paths within admin area
        try {
          const url = new URL(rawRedirect, "http://localhost"); // Use dummy base for validation

          // Only allow relative paths starting with /admin/
          if (url.pathname.startsWith("/admin/") && url.hostname === "localhost") {
            redirect = rawRedirect;
          }
        } catch {
          // Invalid URL, use default
        }
      }

      // Use window.location.href for full page reload to ensure cookie is set
      // This ensures the middleware can read the cookie on the next request
      window.location.href = redirect;
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {error && <div>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
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