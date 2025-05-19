import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"; // <--- IMPORT
import { prisma } from "./prisma";
import bcrypt from "bcryptjs"; // <--- IMPORT

interface CustomUser extends NextAuthUser {
  id: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({ // <--- ADD GOOGLE PROVIDER
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({ // <--- ADD CREDENTIALS PROVIDER
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john.doe@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          console.log(req)
          return null; // Or throw an error
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          console.log("No user found with that email or no password set");
          // Optionally, you could allow sign-up here if user exists from OAuth but has no password
          return null; // Or throw an error indicating user not found or password not set up
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isValidPassword) {
          console.log("Invalid password");
          return null; // Or throw an error
        }

        console.log("Credentials valid, returning user:", user.id, user.email);
        // Return the user object that will be stored in the JWT/session
        // Ensure it has at least 'id', 'name', 'email', 'image' for NextAuth to use
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as CustomUser).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as CustomUser).id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/', // Keep redirecting to home for modal
    // error: '/auth/error', // Optional: custom error page
    // verifyRequest: '/auth/verify-request', // For Email provider if you use it
    // newUser: '/auth/new-user' // Redirect new OAuth users to a setup page (e.g., to set password) - OPTIONAL
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};