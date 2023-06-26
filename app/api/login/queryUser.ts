import { query } from '@/lib/db';

interface UserInfo {
  id: string | number;
  username: string;
  password: string;
}

export async function queryUser(username: string): Promise<UserInfo> {
  const querySql = 'Select * from user where username = ?';
  const values = [username];
  const results = await query({ querySql, values });

  return {
    id: results[0].id,
    username: results[0].username,
    password: results[0].password,
  };
}
