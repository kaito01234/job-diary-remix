'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

import { Button } from '@/components/common/chakra';

export default function SignInButton() {
  return (
    <Button
      onClick={() =>
        signIn('', {
          callbackUrl: '/home',
        })
      }
      colorScheme={'green'}
      bg={'green.400'}
      rounded={'full'}
      px={6}
      _hover={{
        bg: 'green.500',
      }}
    >
      ログイン
    </Button>
  );
}
