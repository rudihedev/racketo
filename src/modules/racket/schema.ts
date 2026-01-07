import { z } from "zod";

export const RacketSchema = z.object({
  id: z.number().positive(),
  brand: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  weight: z.enum(["2U", "3U", "4U", "5U"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const RacketsSchema = z.array(RacketSchema);

export type Racket = z.infer<typeof RacketSchema>;
export type Rackets = z.infer<typeof RacketsSchema>;
