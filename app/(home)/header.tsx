'use client';

import { EditIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import React from 'react';

import { Box, Button, Flex, Heading } from '@/components/common/chakra';
import HeaderMenu from '@/components/HeaderMenu';

export default function Header() {
  return (
    <Box as="header">
      <Flex
        bg="white"
        color="gray.600"
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        align="center"
      >
        <Flex flex={1} justify="space-between" maxW="5xl" mx="auto">
          <Heading as="h1" size="lg">
            <NextLink href="/home">日記</NextLink>
          </Heading>
          <Button
            leftIcon={<EditIcon />}
            as={NextLink}
            fontSize="sm"
            fontWeight={600}
            color="white"
            bg="green.400"
            href="/home/note/new"
            _hover={{
              bg: 'green.300',
            }}
          >
            書く
          </Button>
          <HeaderMenu />
        </Flex>
      </Flex>
    </Box>
  );
}
