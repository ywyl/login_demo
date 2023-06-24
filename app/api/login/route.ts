import { NextResponse } from 'next/server';
import { queryUser } from './queryUser';

export const POST = async (req: Request, res: Response) => {
  const loginInfo = await req.json();
  try {
    const currentUser = await queryUser(loginInfo.username);
    if (currentUser?.password === loginInfo.password) {
      return NextResponse.json({ message: 'success' }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
};
