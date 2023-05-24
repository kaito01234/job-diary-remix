'use client';

import { Button } from '@/components/common/chakra';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return session ? (
    <>
      {JSON.stringify(session)}
      <Button onClick={() => signOut()}>SignOut</Button>
    </>
  ) : (
    <>
      <Button onClick={() => signIn()}>SignIn</Button>
    </>
  );
}
