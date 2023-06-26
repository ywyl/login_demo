import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // session: {
  //   strategy: 'jwt',
  // },
  providers: [
    CredentialsProvider({
      name: 'My Test',
      credentials: {
        username: { label: 'User Name', type: 'string' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const user = await res.json();
        const userRes = { id: user?.id.toString(), name: user?.username };
        if (user) {
          return userRes;
        } else {
          return null;
        }
      },
    }),
  ],
};
