import { Hono } from "hono";
import { dataRackets } from "./data";
import { Rackets, RacketSchema } from "./schema";

let rackets: Rackets = dataRackets;

export const racketRoute = new Hono();

// GET list of all rackets
racketRoute.get("/", (c) => {
  return c.json(rackets);
});

// GET a racket by slug
racketRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const foundRacket = rackets.find((racket) => racket.slug == slug);

  if (!foundRacket) {
    return c.notFound();
  }

  return c.json(foundRacket);
});

// ADD new racket data
racketRoute.post("/", async (c) => {
  try {
    const body = await c.req.json();

    // Check for validation
    if (!body.slug || !body.name) {
      return c.json({ error: "slug and name are compulsory!" }, 400);
    }

    // Duplication checking
    const exists = rackets.find((racket) => racket.slug === body.slug);
    if (exists) {
      return c.json({ error: "This racket is already exist!" }, 409);
    }

    // Add new racket
    const newRacket = {
      id: rackets.length + 1,
      brand: body.brand,
      name: body.name,
      slug: body.slug,
      weight: body.weight,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    rackets.push(newRacket);

    return c.json(newRacket, 201);
  } catch (error) {
    return c.json({ error: "Invalid JSON" }, 400);
  }
});

//--- UPDATE by id
racketRoute.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  // Basic validation
  if (!body.name || !body.brand || !body.weight) {
    return c.json({ error: "name, brand, and weight are compulsory!" }, 400);
  }

  // Weight validation
  if (!["2U", "3U", "4U", "5U"].includes(body.weight)) {
    return c.json({ error: "weight must be: 2U, 3U, 4U, or 5U" }, 400);
  }

  const foundRacket = dataRackets.find((racket) => racket.id == id);

  if (!foundRacket) {
    return c.json({ error: "Racket is not found!" }, 404);
  }

  rackets = dataRackets.map((racket) => {
    if (racket.id === id) {
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

  rackets = updatedRackets;

  return c.json({ message: "Racket updated succesfully" }, 200);
});

//--- PATCH - Partial update racket by slug
racketRoute.patch("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    // Validasi weight jika ada
    if (body.weight && !["2U", "3U", "4U", "5U"].includes(body.weight)) {
      return c.json({ error: "weight must be: 2U, 3U, 4U, or 5U" }, 400);
    }

    const racketIndex = dataRackets.findIndex((r) => r.slug === slug);

    if (racketIndex === -1) {
      return c.json({ error: "Racket is not found!" }, 404);
    }

    // Build updated object dengan explicit assignment
    const currentRacket = dataRackets[racketIndex];

    dataRackets[racketIndex] = {
      id: currentRacket.id,
      brand: body.brand !== undefined ? body.brand : currentRacket.brand,
      name: body.name !== undefined ? body.name : currentRacket.name,
      slug: currentRacket.slug,
      weight: body.weight !== undefined ? body.weight : currentRacket.weight, // ← Explicit
      createdAt: currentRacket.createdAt,
      updatedAt: new Date(),
    };

    return c.json(dataRackets[racketIndex], 200);
  } catch (error) {
    console.error("Patch error:", error);
    return c.json({ error: "Invalid JSON" }, 400);
  }
});

//--- DELETE a racket by slug
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

//--- DELETE ALL
racketRoute.delete("/", (c) => {
  const confirmHeader = c.req.header("X-Confirm-Delete-All");

  if (confirmHeader !== process.env.ADMIN_API_KEY) {
    return c.json(
      {
        error: "Invalid Admin API KEY",
        required: `X-Confirm-Delete-All: ${process.env.ADMIN_API_KEY}`,
      },
      403
    );
  }

  const totalDeleted = dataRackets.length;

  dataRackets.splice(0, dataRackets.length);

  return c.json(
    {
      message: "All rackets deleted successfully!",
      totalDeleted: totalDeleted,
    },
    200
  );
});
