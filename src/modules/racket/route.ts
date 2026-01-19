import { Hono } from "hono";
import { dataRackets } from "./data";
import { Rackets, RacketSchema } from "./schema";
import { prisma } from "../../lib/prisma";

export const racketRoute = new Hono();

// GET list of all rackets
racketRoute.get("/", async (c) => {
  const rackets = await prisma.racket.findMany();
  return c.json(rackets);
});

// GET a racket by slug
racketRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  return c.json({});
});

// ADD new racket data
racketRoute.post("/", async (c) => {
  return c.json({}, 201);
});

//--- PATCH - Partial update racket by slug
racketRoute.patch("/:id", async (c) => {
  const id = Number(c.req.param("id"));

  return c.json({}, 200);
});

//--- DELETE a racket by slug
racketRoute.delete("/:id", (c) => {
  const id = Number(c.req.param("id"));

  return c.json({ message: "Racket deleted successfully!" }, 200);
});

//--- DELETE ALL
racketRoute.delete("/", (c) => {
  return c.json({ message: "All rackets deleted successfully!" }, 200);
});
