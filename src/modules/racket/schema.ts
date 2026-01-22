import { z } from "zod";

export const RacketSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  slug: z.string().min(1),
  weight: z.enum(["2U", "3U", "4U", "5U"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const RacketsSchema = z.array(RacketSchema);

export const CreateRacketSchema = RacketSchema.pick({
  name: true,
  weight: true,
}).extend({
  brandSlug: z.string(),
});

export const SeedRacketSchema = RacketSchema.pick({
  slug: true,
  name: true,
  weight: true,
}).extend({
  brandSlug: z.string(),
});

export type Racket = z.infer<typeof RacketSchema>;
export type Rackets = z.infer<typeof RacketsSchema>;
export type CreateRacket = z.infer<typeof CreateRacketSchema>;
export type SeedRacket = z.infer<typeof SeedRacketSchema>;
