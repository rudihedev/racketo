import { Hono } from "hono";
import { dataRackets } from "./data";
import { Rackets, RacketSchema } from "./schema";

let rackets: Rackets = dataRackets;

export const racketRoute = new Hono();

// GET list of all rackets
racketRoute.get("/", (c) => {
  return c.json(dataRackets);
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

//--- UPDATE by slug
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

//--- PATCH - Partial update racket by slug
racketRoute.patch("/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
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

  if (confirmHeader !== "I-UNDERSTAND-THIS-WILL-DELETE-ALL") {
    return c.json(
      {
        error: "Missing or invalid confirmation header",
        required: "X-Confirm-Delete-All: I-UNDERSTAND-THIS-WILL-DELETE-ALL",
      },
      400
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
