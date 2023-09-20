// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { localRouter } from "./local";
import { productRouter } from "./product";
export const appRouter = router({
  example: exampleRouter,
  product: productRouter,
  local: localRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
