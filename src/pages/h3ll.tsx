import { Menu } from "@headlessui/react";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import LocalProductCard from "../components/Cards/LocalProductCard";

import NavBar from "../components/NavBar";
import { trpc } from "../utils/trpc";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CategorySelection from "../components/CategorySelection";

import products from "../data/h3ll.json";

const H3llShop: NextPage = () => {
  // const { data: products } = trpc.local.getAll.useQuery();
  const dateObj = new Date();
  const monthName = dateObj.toLocaleString("default", { month: "long" });

  return (
    <>
      <Head>
        <title>Store | DreamWalker Studios</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-900">
        <NavBar />
        <div className="mx-auto max-w-7xl py-12 px-2 sm:px-6 lg:px-8">
          <h1 className="mb-5 mt-8 text-5xl  font-bold tracking-tight text-gray-700 md:text-[5rem]">
            All<span className="text-blue-600"> H3ll</span> Prints
          </h1>

          <p className="text-xl text-white">
            Our available products change on a monthly basis based on demand and
            current events.
          </p>

          <div className="mt-12 flex w-full justify-between">
            <button
              type="button"
              className=" flex items-center rounded-full p-1 text-gray-800 hover:text-gray-500"
            >
              <span className="font-medium">Sort</span>
              <ChevronDownIcon className="ml-2 h-5 w-5 " aria-hidden="true" />
            </button>

            <div>
              {/* {categories && <CategorySelection categories={categories} />} */}
            </div>
          </div>
          <div className="flex items-center border-t-[1px] border-gray-300 bg-slate-200">
            <p className="mr-4 p-3 font-medium">Filters</p>
            <div>
              <span
                id="badge-dismiss-default"
                className="mr-2 inline-flex items-center rounded-xl bg-white py-1 px-2 text-sm font-medium text-gray-800 dark:bg-white dark:text-gray-800"
              >
                Video Games
                <button
                  type="button"
                  className="ml-2 inline-flex items-center rounded-sm bg-transparent p-0.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-300 dark:hover:text-gray-900"
                  data-dismiss-target="#badge-dismiss-default"
                  aria-label="Remove"
                >
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Remove badge</span>
                </button>
              </span>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {products &&
              products.map((product) => (
                <LocalProductCard key={product.name} product={product} />
              ))}
          </div>
        </div>
      </main>

      <footer className="border-t-2  bg-gray-900 py-5 text-center text-white">
        <p className="text-sm font-medium">
          ©2022 Made with ❤️ and ☕ by Andrew Hunn
        </p>
      </footer>
    </>
  );
};

export default H3llShop;