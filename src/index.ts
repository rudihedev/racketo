import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    title: "Hello Hono!",
    rackets: "/rackets",
  });
});

export default app;
