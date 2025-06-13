// NextAuth API route for authentication
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
