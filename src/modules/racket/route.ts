import { Hono } from "hono";
import { dataRackets } from "./data";

export const racketRoute = new Hono();

racketRoute.get("/", (c) => {
  return c.json(dataRackets);
});

racketRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const foundRacket = dataRackets.find((racket) => racket.slug == slug);

  if (!foundRacket) {
    return c.notFound();
  }

  return c.json(foundRacket);
});

racketRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();

    // Check for validation
    if (!body.slug || !body.name) {
      return c.json({ error: "slug dan name wajib diisi" }, 400);
    }

    // Duplication checking
    const exists = dataRackets.find((racket) => racket.slug === body.slug);
    if (exists) {
      return c.json({ error: "Racket dengan slug ini sudah ada" }, 409);
    }

    // Add new racket
    const newRacket = {
      id: dataRackets.length + 1, // atau generate ID yang lebih robust
      ...body,
    };

    dataRackets.push(newRacket);

    return c.json(newRacket, 201);
  } catch (error) {
    return c.json({ error: "Invalid JSON" }, 400);
  }
});
