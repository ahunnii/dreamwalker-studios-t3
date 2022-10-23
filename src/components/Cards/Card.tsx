import Image from "next/image";
import { FC, useState } from "react";

import QuickView from "./QuickView";
import { SimpleProduct } from "./types";

interface CardProps {
  product: SimpleProduct;
}

const Card: FC<CardProps> = ({ product }) => {
  const [open, setOpen] = useState(false);
  const { name, categories, price, images, tagline } = product;

  return (
    <>
      <div
        className=" min-w-fill min-h-fill group rounded-lg hover:cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <span className="absolute  z-10 my-5 mx-3 rounded-md bg-gray-900 p-2 font-medium text-white opacity-50">
          {categories[0]?.name}
        </span>

        <div className="  aspect-w-golden aspect-h-golden  transition duration-75 ease-in group-hover:cursor-pointer group-hover:opacity-75 group-hover:drop-shadow-lg">
          <Image
            src={images[0]?.src ?? ""}
            className=" my-2 rounded-md  object-cover"
            alt={images[0]?.alt ?? ""}
            layout="fill"
          />
        </div>

        <div className="flex items-center justify-between p-2">
          <div>
            <h2 className=" text-xl font-semibold text-gray-900">{name}</h2>
            <p className="text-sm font-thin text-gray-500">{tagline}</p>
          </div>
          <p className="text-lg font-medium text-gray-700 ">${price}</p>
        </div>
      </div>

      {open && <QuickView isOpen={open} setIsOpen={setOpen} print={product} />}
    </>
  );
};

export default Card;
