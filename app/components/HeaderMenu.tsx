'use client';

import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@/components/common/chakra';
import { signOut } from 'next-auth/react';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function HeaderMenu() {
  return (
    <Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem as="a" href="/setting">
            設定
          </MenuItem>
          <MenuItem
            onClick={() =>
              signOut({
                callbackUrl: '/',
              })
            }
          >
            ログアウト
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
