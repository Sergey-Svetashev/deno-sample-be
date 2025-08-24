import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { sendHandler } from "./controllers/mailing.ts";

const router = new Router();

router.post("/send", sendHandler);

const app = new Application();
app.use(
  oakCors({
    origin: Deno.env.get("ORIGIN"),
    allowedHeaders: ["Authorization, Content-Type"],
    methods: ["POST, GET"],
    exposedHeaders: "Content-Type",
  })
);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
