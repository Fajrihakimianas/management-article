import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("auth-token")?.value;

  const userData = request.cookies.get("auth-user")?.value;

  const protectedRoutes = ["/articles"];
  const adminRoutes = ["/admin"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isLoginPage = request.nextUrl.pathname === "/login";

  const isRegisterPage = request.nextUrl.pathname === "/register";

  if (isProtectedRoute && (!token || !userData)) {
    console.log("Access denied: No token for protected route");
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtectedRoute && (token || userData)) {
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

  if (isAdminRoute && (token || userData)) {
    try {
      const user = userData ? JSON.parse(userData) : null;

      if (!user || user.role !== "Admin") {
        console.log("Access denied: Not admin role");
        return NextResponse.redirect(new URL("/login", request.url));
      }

      console.log("Admin access granted");
    } catch (error) {
      console.log("Error validating admin access:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if ((isLoginPage || isRegisterPage) && (token || userData)) {
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

export const config = {
  matcher: [
    "/articles/:path*",
    "/admin/:path*",
    "/",
    "/register",
    "/login",
    "/articles/:slug*",
  ],
};
