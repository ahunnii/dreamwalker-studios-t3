import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Product } from "@prisma/client";
import { Fragment, MouseEventHandler, useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

import getStripe from "../utils/get-stripejs";
import { postRequest } from "../utils/postRequest";
import { trpc } from "../utils/trpc";
import CartItem from "./CartItem";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cartQuantity, cartItems } = useShoppingCart();

  const [cq, setCq] = useState<number>(0);
  const { data: products } = trpc.product.getAll.useQuery();

  const checkout: MouseEventHandler<HTMLButtonElement> = async () => {
    setLoading(true);

    const items = cartItems.map((item) => {
      const product = products?.find(
        (i: Product) => i.id === item.id.split("___")[0]
      );

      if (product && product.images[0])
        return {
          quantity: item.quantity,
          name: product.name,
          image: product.images[0].src,
          price: product.price,
          description: item.id.split("___")[1],
        };
    });

    // console.log(items);
    // Create a Checkout Session.
    const response = await postRequest("/api/checkout-session", { items });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
  };

  //To fix the hydration error, had to set quantity via useEffect. Wonder if I can just do that in context...
  useEffect(() => {
    setCq(cartQuantity);
  }, [cartQuantity]);

  return (
    <>
      <button
        className="group -m-2 flex items-center p-2"
        onClick={() => setOpen(true)}
      >
        <ShoppingBagIcon
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-white"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-gray-400 group-hover:text-white">
          {cq}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            {(!cartItems || cartItems.length == 0) && (
                              <p className="">
                                Your shopping cart is sad. Make it happy by
                                filling it up!
                              </p>
                            )}
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartItems.map((product) => (
                                <CartItem key={product.id} {...product} />
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>

                          <p>
                            $
                            {cartItems
                              .reduce((total, item) => {
                                const product = products?.find(
                                  (i: Product) =>
                                    i.id === item.id.split("___")[0]
                                );
                                return (
                                  total + (product?.price || 0) * item.quantity
                                );
                              }, 0)
                              .toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          {loading ? (
                            <button
                              type="button"
                              className="mt-6 w-full rounded-md bg-blue-500 py-2 px-3 text-sm uppercase text-white shadow-lg shadow-blue-200 hover:ring-1 hover:ring-blue-500"
                            >
                              Processing...
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={!products}
                              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                              onClick={checkout}
                            >
                              Checkout
                            </button>
                          )}
                          {/* <a
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </a> */}
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
