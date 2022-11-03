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
      },
    });
  }),
  getColorOptions: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.color.findMany({
      select: {
        name: true,
        inStock: true,
        materials: {
          select: {
            name: true,
            inStock: true,
          },
        },
      },
    });
  }),
  getMaterialOptions: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.material.findMany({
      select: {
        name: true,
        inStock: true,
      },
    });
  }),
  getCategories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),

  getImages: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.image.findMany();
  }),
  getTags: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tag.findMany();
  }),
  getImage: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.image.findUnique({
        where: {
          id: input?.id,
        },
      });
    }),

  createImage: publicProcedure
    .input(z.object({ src: z.string(), alt: z.string().nullish() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.image.create({
        data: {
          src: input.src,
          alt: input?.alt ?? "",
        },
      });
    }),

  updateProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        tagline: z.string().nullish(),
        price: z.number(),
        imageId: z.string(),
        categories: z.string().array(),
        tags: z.string().array().nullish(),
      })
    )
    .mutation(({ ctx, input }) => {
      // const coolImage = ctx.prisma.image.findUnique({
      //   where: {
      //     id: input.imageId,
      //   },
      // });

      return ctx.prisma.product.update({
        where: {
          id: input?.id,
        },
        data: {
          name: input?.name,
          tagline: input?.tagline,
          price: input?.price,
          description: input.description,
          images: {
            // deleteMany: {},
            set: [],
            connect: [{ id: input?.imageId }],
          },
          categories: {
            set: [],
            connect: input.categories.map((c) => {
              return {
                id: c,
              };
            }),
          },
          tags: {
            set: [],
            connect:
              input?.tags?.map((c) => {
                return {
                  id: c,
                };
              }) ?? [],
          },
        },
        include: { images: true, categories: true, tags: true },
      });
    }),

  createProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        tagline: z.string().nullish(),
        price: z.number(),
        imageId: z.string(),
        categories: z.string().array(),
        tags: z.string().array().nullish(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.product.create({
        data: {
          name: input.name,
          description: input.description,
          tagline: input?.tagline,
          price: input.price,
          images: {
            connect: [{ id: input?.imageId }],
            // connectOrCreate: {
            //   where: {
            //     id: input?.imageId,
            //   },
            //   create: {
            //     src: "",
            //     alt: "Viola",
            //   },
            // },
          },
          categories: {
            connect: input.categories.map((c) => {
              return {
                id: c,
              };
            }),
          },
          tags: {
            connect:
              input?.tags?.map((c) => {
                return {
                  id: c,
                };
              }) ?? [],
          },
        },
        include: { images: true, categories: true, tags: true },
      });
    }),
});
