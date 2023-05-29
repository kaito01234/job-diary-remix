import { getNextAuthServerSession } from '@/libs/getNextAuthServerSession';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export function withTokenVerification(handler: any) {
  return async (req: NextRequest, params: any) => {
    const session = await getNextAuthServerSession();
    // const authHeader = req.headers.get('authorization');
    // const token = authHeader && authHeader.split(' ')[1];

    // if (!token) {
    //   return;
    // }

    // const secretOrPublicKey = process.env.NEXTAUTH_SECRET || '';
    // try {
    //   const decoded = jwt.verify(token, secretOrPublicKey);
    // } catch (error) {
    //   return;
    // }

    return handler(req, params);
  };
}
