'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className='bg-yellow-200 h-20'>
      <nav className='h-full flex justify-between container items-center'>
        <div>
          <Link href='/' className='text-ct-dark-600 text-2xl font-semibold'>
            My Test Login
          </Link>
          <ul className='flex items-center gap-4'>
            <li>Hi, {user?.username}~</li>
            <li className='cursor-pointer' onClick={() => signOut()}>
              Logout
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </header>
  );
}
