import { Dialog, Transition } from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import { FC, FormEvent, Fragment, useEffect, useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";

import { trpc } from "../../utils/trpc";

import ColorOptions from "./ColorOptions";
import PrintOptions from "./PrintOptions";

import { LocalSelectedVariant, LocalSimpleProduct } from "./types";

interface QuickViewProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  print: LocalSimpleProduct;
}

const QuickView: FC<QuickViewProps> = ({ isOpen, setIsOpen, print }) => {
  const { data: colorOptions } = trpc.product.getColorOptions.useQuery();
  const { data: materialOptions } = trpc.product.getMaterialOptions.useQuery();

  const { increaseItemQuantity } = useShoppingCart();

  const [currentVariant, setCurrentVariant] = useState<LocalSelectedVariant>({
    color: "",
    material: "",
    size: "",
  });

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const variant = `${currentVariant?.color} ${currentVariant?.material}`;

    increaseItemQuantity(`${print.id}___${variant}`);
    console.log(`Adding a ${print.name} in ${variant} to cart...`);
  };

  useEffect(() => {
    if (materialOptions && colorOptions)
      setCurrentVariant({
        color: colorOptions.find((el) => el.inStock)?.name,
        material: materialOptions.find((el) => el.inStock)?.name,
        size: "",
      });
  }, [materialOptions, colorOptions]);

  return (
    <Transition.Root show={isOpen ?? false} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <Image
                        src={print?.images[0] ?? ""}
                        alt={""}
                        className="object-cover object-center"
                        layout="fill"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {print.name}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-gray-900">${print.price}</p>

                        <div className="mt-3 text-gray-500">
                          {print.description}
                        </div>

                        <div className="mt-3 text-gray-500">
                          Selected:{" "}
                          {`${print.name} in ${currentVariant?.color}  ${currentVariant?.material} `}
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <form onSubmit={handleFormSubmit}>
                          {colorOptions && materialOptions && (
                            <ColorOptions
                              colors={colorOptions}
                              currentVariant={currentVariant}
                              setCurrentVariant={setCurrentVariant}
                            />
                          )}

                          {/* Types */}
                          {materialOptions && (
                            <PrintOptions
                              materials={materialOptions}
                              currentVariant={currentVariant}
                              setCurrentVariant={setCurrentVariant}
                            />
                          )}

                          <button
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Add to bag
                          </button>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default QuickView;
