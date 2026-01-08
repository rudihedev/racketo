import { Hono } from "hono";
import { logger } from "hono/logger";

import { racketRoute } from "./modules/racket/route";
import { commonRoute } from "./modules/common/route";

const app = new Hono();

app.use(logger());
app.route("/", commonRoute);
app.route("/rackets", racketRoute);

console.log(process.env);

export default app;
