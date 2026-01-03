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
    return c.json({ error: "Invalid JSON-ku" }, 400);
  }
});

racketRoute.delete("/:slug", (c) => {
  const slug = c.req.param("slug");

  const racketIndex = dataRackets.findIndex((racket) => racket.slug === slug);

  if (racketIndex === -1) {
    return c.json({ error: "Racket tidak ditemukan" }, 404);
  }

  const deletedRacket = dataRackets.splice(racketIndex, 1)[0];

  return c.json(
    {
      message: "Racket berhasil dihapus",
      data: deletedRacket,
    },
    200
  );
});
