import * as pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

type Racket = {
  id: number;
  brand: string;
  name: number;
  slug: number;
  createdAt: Date;
  updatedAt: Date;
};

try {
  const result = await client.query("SELECT * FROM racketo");
  const rackets: Racket[] = result.rows;
  console.log({ rackets });
} catch (error) {
  console.error("Failed to connect to the database", error);
} finally {
  await client.end();
}
