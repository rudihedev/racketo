import slugify from "slugify";
import { CreateRacket } from "./schema";

export function createRacketSlug(body: CreateRacket) {
  return slugify(`${body.brand}-${body.name}`, { lower: true });
}
