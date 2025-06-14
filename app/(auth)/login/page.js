"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/LoginSchema";
import Image from "next/image";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();

  const { fetchUserProfile } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
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

      const response = await fetch(
        "https://test-fe.mysellerpintar.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 400) {
        toast(<p className="text-red-500">Login gagal, silakan coba lagi!</p>);
      }

      if (response.status === 200) {
        const result = await response.json();

        const userProfile = await fetchUserProfile(result.token);

        toast(<p className="text-green-500">Login berhasil!</p>);

        const redirectPath =
          userProfile.role === "Admin" ? "/admin" : "/articles";
        router.push(redirectPath);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat login"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Input password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-blue-600 w-full">
              Login
            </Button>
          </form>
        </Form>

        <nav>
          <p className="text-center text-sm mt-5 text-slate-600 font-normal">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 underline cursor-pointer"
            >
              Register
            </Link>
          </p>
        </nav>
      </div>
    </section>
  );
}
