import pool from '@/lib/db';

export async function POST(req: Request, res: Response) {
    if (req.method === 'POST') {
        try {
            const { answer } = req.body;
            console.log(req.body);
            if (!answer) {
                throw new Error('Missing answer property in request body');
            }
            const client = await pool.connect();
            console.log("Connected to the database!");
            console.log(answer);
            const queryText = 'INSERT INTO answers (content) VALUES ($1)';
            const values = [answer];

            await client.query(queryText, values);
            console.log("Answer saved to the database.");

            client.release();
            console.log('Received answer:', answer);
            // Return a success response
            return new Response(JSON.stringify({ message: 'Successfully saved to the database!' }), {
                headers: { "Content-Type": "application/json" },
                status: 200,
            });
        } catch (error) {
            console.error("Error saving answer to the database:", error);
            // Return an error response
            return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
                headers: { "Content-Type": "application/json" },
                status: 500,
            });
            return errRes;
        }
    } 
}


// export async function POST(req: Request, res: Response) {
//     try {
//         const client = await pool.connect();
//         console.log("Connected to the database!");

//         const result = await client.query("SELECT * FROM embeddings");
//         const data = result.rows;
//         console.log("Fetched data:", data);

//         client.release();
//         const jsonRes = new Response(JSON.stringify({ data }), {
//             headers: { "Content-Type": "application/json" },
//             status: 200,
//         });
//         return jsonRes;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         const errRes = new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//             headers: { "Content-Type": "application/json" },
//             status: 500,
//         });
//         return errRes;
//     }
// }

// import { Client } from "pg";

// const client = new Client({
//   user: process.env.PGSQL_USER,
//   password: process.env.PGSQL_PASSWORD,
//   host: process.env.PGSQL_HOST,
//   port: process.env.PGSQL_PORT,
//   database: process.env.PGSQL_DATABASE
// })

// client.connect();

// client.query(`SELECT * FROM embeddings`, (err, res) => {
//   if(!err) {
//     console.log(res.rows);
//   } else {
//     console.log(err.message);
//   }
//   client.end;
// })






