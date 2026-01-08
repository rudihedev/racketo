import * as pg from "pg";
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

const result = await client.query("SELECT * FROM racketo");

const rackets = result.rows;

console.log({ rackets });

await client.end();
