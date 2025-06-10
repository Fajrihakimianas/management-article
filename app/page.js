"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/LoginSchema";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulasi API call
      console.log("Login data:", data);

      // Di sini Anda akan melakukan fetch ke API login Anda
      // Contoh:
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data)
      // });
      //
      // if (!response.ok) {
      //   throw new Error("Login gagal");
      // }
      //
      // const result = await response.json();
      //
      // if (result.success) {
      //   // Redirect ke dashboard atau halaman utama
      //   router.push("/dashboard");
      // }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>

          <input
            id="username"
            type="text"
            placeholder="Input username"
            className={`w-full p-2 border rounded-md ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
            {...register("username")}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Input password"
            className={`w-full p-2 border rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
