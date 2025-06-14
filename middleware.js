import { NextResponse } from "next/server";

export function middleware(request) {
  // Debug: Log current path dan cookies
  console.log("Middleware triggered for:", request.nextUrl.pathname);

  // 1. Ambil token dari cookies
  const token = request.cookies.get("auth-token")?.value;

  // 2. Ambil user data dari cookies
  const userData = request.cookies.get("auth-user")?.value;

  // 3. Daftar route yang memerlukan autentikasi
  const protectedRoutes = ["/articles", "/admin"];
  const adminRoutes = ["/admin"];
  const publicRoutes = ["/", "/register"]; // Route yang boleh diakses tanpa login

  // 4. Cek jenis route
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some(
    (route) => request.nextUrl.pathname === route
  );

  const isLoginPage = request.nextUrl.pathname === "/";
  const isRegisterPage = request.nextUrl.pathname === "/register";

  // 5. Redirect ke login jika mengakses protected route tanpa token
  if (isProtectedRoute && !userData) {
    console.log("Access denied: No token for protected route");
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 6. Validasi token untuk protected routes
  if (isProtectedRoute && userData) {
    try {
      const user = userData ? JSON.parse(userData) : null;

      if (!user) {
        console.log("Invalid user data, redirecting to login");
        // Clear invalid cookies
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("auth-token");
        response.cookies.delete("auth-user");
        return response;
      }
    } catch (error) {
      console.log("Error parsing user data:", error);
      // Clear invalid cookies dan redirect ke login
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("auth-token");
      response.cookies.delete("auth-user");
      return response;
    }
  }

  // 7. Cek role untuk admin routes
  if (isAdminRoute && token) {
    try {
      const user = userData ? JSON.parse(userData) : null;

      if (!user || user.role !== "Admin") {
        console.log("Access denied: Not admin role");
        return NextResponse.redirect(new URL("/articles", request.url));
      }

      console.log("👑 Admin access granted");
    } catch (error) {
      console.log("Error validating admin access:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 8. Redirect logged-in user dari login/register page
  if ((isLoginPage || isRegisterPage) && token) {
    try {
      const user = userData ? JSON.parse(userData) : null;

      if (user) {
        const redirectPath = user.role === "Admin" ? "/admin" : "/articles";
        console.log("↩️ Redirecting logged-in user to:", redirectPath);
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
    } catch (error) {
      console.log("Error redirecting logged-in user:", error);
      // Clear invalid cookies
      const response = NextResponse.next();
      response.cookies.delete("auth-token");
      response.cookies.delete("auth-user");
      return response;
    }
  }

  console.log("Middleware passed, continuing to route");
  return NextResponse.next();
}

// 8. Konfigurasi matcher - hanya untuk route yang diperlukan
export const config = {
  matcher: ["/articles/:path*", "/admin/:path*", "/", "/register"],
};
