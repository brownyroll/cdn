import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";
import dotenv from "dotenv";
dotenv.config();

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email || !account?.provider) return false;

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            username: user.name ?? "",
            fname: "",
            lname: "",
            provider: account.provider,
          },
        });
      }

      // log login event
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (dbUser) {
        await prisma.loginLog.create({
          data: {
            userId: dbUser.id,
          },
        });
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
