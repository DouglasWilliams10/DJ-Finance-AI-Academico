import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Google,

    Credentials({
      name: "Credenciais",

      credentials: {
        login: {
          label: "Usuário ou e-mail",
          type: "text",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },

      async authorize(credentials) {
        const login = credentials?.login;
        const password = credentials?.password;

        if (
          typeof login !== "string" ||
          typeof password !== "string" ||
          !login.trim() ||
          !password
        ) {
          return null;
        }

        const normalizedLogin = login.trim().toLowerCase();

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: normalizedLogin },
              { email: normalizedLogin },
            ],
          },
        });

        if (!user || !user.passwordHash || !user.isActive) {
          return null;
        }

        const passwordIsValid = await compare(
          password,
          user.passwordHash,
        );

        if (!passwordIsValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
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
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "ADMIN";
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
