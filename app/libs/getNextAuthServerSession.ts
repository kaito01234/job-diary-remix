import { authOptions } from '@/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth/next';

export async function getNextAuthServerSession() {
  return await getServerSession(authOptions);
}
