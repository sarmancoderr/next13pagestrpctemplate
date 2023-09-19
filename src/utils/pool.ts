import { createPool } from 'mysql';

const pool  = createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'prueba'
  });
  
export default function queryPromised(query: string, args: unknown[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      pool.query(query, args, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(JSON.parse(JSON.stringify(result)) as any[])
      })
    })
  }