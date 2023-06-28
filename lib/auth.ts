import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { queryUser } from '@/app/api/login/queryUser';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'My Test',
      credentials: {
        username: { label: 'User Name', type: 'string' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const user = await queryUser(credentials?.username);

        if (!user || credentials.password !== user?.password) {
          return null;
        }

        console.log({
          id: user.id.toString(),
          username: user.username,
          randomKey: 'xxxxxx',
        });
        return {
          id: user.id.toString(),
          username: user.username,
          randomKey: 'Hey cool',
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('session');
      console.log(session);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        console.log('xyz');
        const u = user as unknown as any;
        console.log(u);
        return {
          ...token,
          id: u.id,
          username: u.username,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
