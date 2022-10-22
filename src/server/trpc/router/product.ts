import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const productRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      include: {
        categories: true,
        tags: true,
        images: true,
      },
    });
  }),
  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.product.findUnique({
      where: {
        id: input,
      },
      include: {
        categories: true,
        tags: true,
        images: true,
        colors: {
          select: {
            name: true,
            materials: {
              select: {
                name: true,
              },
            },
          },
        },
        materials: {
          select: {
            name: true,
          },
        },
        sizes: true,
      },
    });
  }),
});
