import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import NavBar from "../components/NavBar";
import { trpc } from "../utils/trpc";
const Guide: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      <main className="mx-auto min-h-screen max-w-7xl px-2 sm:px-6 lg:px-8">
        <h1 className="mb-5 mt-8 text-5xl  font-bold tracking-tight text-gray-700 md:text-[5rem]">
          Print Purchasing <span className="text-blue-600">Guide</span>
        </h1>

        <p className="text-xl">
          Not sure what the difference is between PLA and Resin? We got you
          covered!
        </p>

        <h2 className="mt-8 mb-2 text-2xl font-semibold text-blue-800">
          PLA vs Resin
        </h2>
        <p className="my-2 text-lg">
          <span className="text-blue-500"> TL;DR </span>if you want a higher
          quality print, go with the resin. If you want a stronger print that
          you plan on finishing yourself, go with PLA.{" "}
        </p>
        <p className="my-2 text-lg">
          We currently offer two ways to print your items: PLA and Resin.
        </p>
        <p className="my-2 text-lg">
          PLA is a recyclable, natural thermoplastic material used in Fused
          Deposition Modeling (FDM) printers. These types of prints are perfect
          for cosplay, utility, or models that really don&apos;t need much
          detail. These prints come out a bit rough. We will sand and fill each
          PLA print to the best of our abilities, but you may need to finish out
          some of the imperfections we may have missed.
        </p>
        <p className="my-2 text-lg">
          Photopolymer resin is a light sensitive, liquid plastic used in
          stereolithography (SLA) printers. These prints are able to reach high
          quality details, thanks to the printer&apos;s 4k resolution screen.
          These prints are more or less ready to ship once they take a dunk in
          isopropyl alcohol and harden in UV light. Perfect for miniatures,
          busts, or prints that requires a lot of detail. Downside is that they
          can be more fragile than PLA. Materials also tend to be a bit more
          expensive than PLA, hence the slight up charge.
        </p>

        <h2 className="mt-8 mb-2 text-2xl font-semibold text-blue-800">
          Available Sizes
        </h2>
        <p className="my-2 text-lg">We currently offer the following sizes: </p>
        <ul className="my-2 list-inside list-disc text-lg">
          <li>
            Mini: Think small enough for a table top game like Dungeons and
            Dragons or Starcraft.{" "}
          </li>
          <li>
            Small: These can range from the size of a bobble head, a mug, or
            boss level miniatures.
          </li>
          <li>
            Medium: These are your busts and statues, to small cosplay props
            like knives and accessories.
          </li>
          <li>Large: These are your multi part statues, armor pieces, etc. </li>
          <li>
            BFP: Big. F***ing. Props. These are your helmets, full armor sets,
            anything that requires a f*** ton of time to do.
          </li>
        </ul>
        <p className="my-2 text-lg">
          You may have noticed that these aren&apos;t exact measurements. For
          the time being, these sizes are just estimates based on the prints
          available. As we grow, we will offer more, exact measurements. Until
          then, check the print description to see roughly what size it will
          turn out.{" "}
        </p>

        <h2 className="mt-8 mb-2 text-2xl font-semibold text-blue-800">
          Available Colors
        </h2>
        <p className="my-2 text-lg">
          Since we don&apos;t offer painting services at the moment, we try to
          offset that with different color options. They are wildly
          inconsistent. We will always have gray in stock for both types of
          materials. We also will try to have some fun and unique colors as well
          for both. If there are no colors available, that just means the model
          will be printed on whatever color we currently have.
        </p>
      </main>

      <footer className="border-t-2 py-5 text-center">
        <p className="text-sm font-medium">
          ©2022 Made with ❤️ and ☕ by Andrew Hunn
        </p>
      </footer>
    </>
  );
};

export default Guide;
