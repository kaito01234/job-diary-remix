'use client';

import { Button } from '@/components/common/chakra';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <Button
      onClick={() =>
        signOut({
          callbackUrl: '/',
        })
      }
      fontSize="sm"
      fontWeight={600}
      color="white"
      bg="green.400"
      _hover={{
        bg: 'green.300',
      }}
    >
      ログアウト
    </Button>
  );
}
