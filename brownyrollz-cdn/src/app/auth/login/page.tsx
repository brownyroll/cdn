'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Welcome, {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <button onClick={() => signIn('discord')}>Sign in with Discord</button>
      <button onClick={() => signIn('github')}>Sign in with GitHub</button>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </>
  );
}