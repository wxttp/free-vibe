// 'use server'
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { adapter } from "next/dist/server/web/adapter";
import googleProvider from "next-auth/providers/google";
import { redirect } from "next/dist/server/api-utils";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } else {
          throw new Error("Invalid Email or Password");
        }
      },
    }),
    googleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
