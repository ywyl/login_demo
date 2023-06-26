import { queryUser } from './queryUser';

export const POST = async (req: Request, res: Response) => {
  const loginInfo = await req.json();
  try {
    const currentUser = await queryUser(loginInfo.username);
    return new Response(JSON.stringify(currentUser));
  } catch (err) {
    return new Response(JSON.stringify(null));
  }
};
