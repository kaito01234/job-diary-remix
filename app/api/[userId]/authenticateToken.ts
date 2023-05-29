import { getNextAuthServerSession } from '@/libs/getNextAuthServerSession';
import { NextRequest, NextResponse } from 'next/server';

export function withTokenVerification(handler: any) {
  return async (req: NextRequest, params: any) => {
    const session = await getNextAuthServerSession();
    // if (!session) {
    //   return new NextResponse(JSON.stringify({ status: 'fail', message: 'ログインしてください' }), {
    //     status: 401,
    //   });
    // }
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
