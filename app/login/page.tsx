'use client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Login({ children }: { children: React.ReactNode }) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const route = useRouter();

  async function clickToLogin() {
    console.log(nameRef?.current?.value, passwordRef?.current?.value);
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        username: nameRef?.current?.value,
        password: passwordRef?.current?.value,
      }),
    });

    const parseRes = await res.json();

    if (parseRes.message === 'success') {
      route.push('/');
    }
  }

  return (
    <>
      <div>
        <span>用户名</span>
        <input ref={nameRef} type="text" />
      </div>
      <div>
        <span>密码</span>
        <input ref={passwordRef} type="text" />
      </div>
      <button onClick={clickToLogin}>登录</button>
    </>
  );
}
