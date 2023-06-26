import { LoginButton, LogoutButton, ProfileButton, RegisterButton } from '../app/components/button';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/app/components/user";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />

        <h1>Server Session</h1>
        <pre>{JSON.stringify(session)}</pre>

        <User></User>
      </div>
    </main>
  );
}
