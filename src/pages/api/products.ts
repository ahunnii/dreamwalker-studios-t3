// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const products = async (req: NextApiRequest, res: NextApiResponse) => {
  const products = await prisma.product.findMany({
    include: {
      tags: true,
      images: true,
    },
  });
  res.status(200).json(products);
};

export default products;
