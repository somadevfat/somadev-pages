"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api-client";
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { token } = await login({ email, password });
      Cookies.set('token', token, { expires: 1, path: '/', secure: process.env.NODE_ENV === 'production' });
      router.replace("/admin/articles");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && (
          <div className="text-red-500 text-center" data-testid="error-message">
            {error}
          </div>
        )}
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            data-testid="email-input"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            data-testid="password-input"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          data-testid="login-button"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded disabled:bg-indigo-300"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
} 