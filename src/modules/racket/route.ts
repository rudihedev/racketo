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
      return c.json({ error: "slug and name are compulsory!" }, 400);
    }

    // Duplication checking
    const exists = dataRackets.find((racket) => racket.slug === body.slug);
    if (exists) {
      return c.json({ error: "This racket is already exist!" }, 409);
    }

    // Add new racket
    const newRacket = {
      id: dataRackets.length + 1,
      brand: body.brand,
      name: body.name,
      slug: body.slug,
      weight: body.weight,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dataRackets.push(newRacket);

    return c.json(newRacket, 201);
  } catch (error) {
    return c.json({ error: "Invalid JSON" }, 400);
  }
});

racketRoute.delete("/:slug", (c) => {
  const slug = c.req.param("slug");

  const racketIndex = dataRackets.findIndex((racket) => racket.slug === slug);

  if (racketIndex === -1) {
    return c.json({ error: "Racket is not found!" }, 404);
  }

  const deletedRacket = dataRackets.splice(racketIndex, 1)[0];

  return c.json(
    {
      message: "Racket deletec successfully!",
      data: deletedRacket,
    },
    200
  );
});

racketRoute.put("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const body = await c.req.json();

  // Basic validation
  if (!body.name || !body.brand || !body.weight) {
    return c.json({ error: "name, brand, and weight are compulsory!" }, 400);
  }

  // Weight validation
  if (!["2U", "3U", "4U", "5U"].includes(body.weight)) {
    return c.json({ error: "weight must be: 2U, 3U, 4U, or 5U" }, 400);
  }

  let found = false;

  // Update with .map()
  const updatedRackets = dataRackets.map((racket) => {
    if (racket.slug === slug) {
      found = true;
      return {
        ...racket,
        name: body.name,
        brand: body.brand,
        weight: body.weight,
        updatedAt: new Date(),
      };
    }
    return racket;
  });

  if (!found) {
    return c.json({ error: "Racket is not found!" }, 404);
  }

  // Replace array
  dataRackets.splice(0, dataRackets.length, ...updatedRackets);

  // Return updated racket
  const updatedRacket = dataRackets.find((r) => r.slug === slug);

  return c.json(updatedRacket, 200);
});
