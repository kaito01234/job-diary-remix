import React from 'react';

import { Box, Spinner } from '@/components/common/chakra';

export default function Loading() {
  return (
    <Box justifyContent="center" display="flex">
      <Spinner color="green.400" size="xl" />
    </Box>
  );
}
