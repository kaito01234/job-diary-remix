import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/api/auth/[...nextauth]/authOptions';

export async function getNextAuthServerSession() {
  return await getServerSession(authOptions);
}
