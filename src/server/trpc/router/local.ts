import { CategoryOption } from "@prisma/client";
import axios from "axios";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const localRouter = router({
  getAll: publicProcedure.query(({}) => {
    axios.get("/h3ll.json").then((data) => {
      return data;
    });
  }),
});
