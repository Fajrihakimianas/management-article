"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "", // Default role, bisa diubah sesuai kebutuhan
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
    <div className="w-full max-w-md mx-auto py-12 px-5 bg-transparent md:bg-white rounded-xl">
      <Image
        src="/images/logo-ipsum.png"
        alt="Logo Ipsum"
        width={150}
        height={150}
        className="mx-auto mb-4"
      />

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Input username" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-blue-600 w-full">
            Register
          </Button>
          {/* <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Input username"
              className={`w-full p-2 border rounded-md ${
                form.errors.username ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
              {...form.register("username")}
            />
            {form.errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {form.errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Input password"
              className={`w-full p-2 border rounded-md ${
                form.errors.password ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
              {...form.register("password")}
            />
            {form.errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {form.errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Role
            </label>

            <select
              id="role"
              placeholder="Select role"
              className={`w-full p-2 border rounded-md ${
                form.errors.role ? "border-red-500" : "border-gray-300"
              }`}
              disabled={isLoading}
              {...form.register("role")}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            {form.errors.role && (
              <p className="mt-1 text-sm text-red-600">
                {form.errors.role.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Register"}
          </button> */}
        </form>
      </Form>

      <br />

      <nav>
        <p className="text-center text-slate-600 font-normal">
          Already have an account?{" "}
          <Link href="/" className="text-blue-600 underline cursor-pointer">
            Login
          </Link>
        </p>
      </nav>
    </div>
  );
}
