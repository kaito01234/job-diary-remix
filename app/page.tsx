'use client';

import { Button } from '@/components/common/chakra';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  return session ? (
    <>
      {JSON.stringify(session)}
      {JSON.stringify(status)}
      <Button onClick={() => signOut()}>SignOut</Button>
    </>
  ) : (
    <>
      {JSON.stringify(session)}
      {JSON.stringify(status)}
      <Button onClick={() => signIn()}>SignIn</Button>
    </>
  );
}
