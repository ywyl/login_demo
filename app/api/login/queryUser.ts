import { query } from '../../../lib/db';

interface UserInfo {
  username: string;
  password: string;
}

export async function queryUser(username: string): Promise<UserInfo> {
  const querySql = 'Select * from user where username = ?';
  const values = [username];
  const results = await query({ querySql, values });

  return {
    username: results[0].username,
    password: results[0].password,
  };
}
