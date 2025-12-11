import { Hono } from "hono";
import { dataRackets } from "./data";

export const racketRoute = new Hono();

racketRoute.get("/", (c) => {
  return c.json(dataRackets);
});

racketRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const racket = dataRackets.find((racket) => racket.slug == slug);

  if (!racket) {
    return c.notFound();
  }

  return c.json(racket);
});
