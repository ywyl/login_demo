import mysql from 'mysql2/promise';

export async function query({ querySql, values = [] }: { querySql: string; values: Array<any> }) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 9080,
    user: 'root',
    password: '123456',
    database: 'login_demo',
  });

  try {
    const [rows, fields] = await connection.execute<mysql.RowDataPacket[]>(querySql, values);
    await connection.end();
    return rows;
  } catch (error) {
    throw Error(`error: ${error}`);
  }
}
