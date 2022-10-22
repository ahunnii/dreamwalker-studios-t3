import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import NavBar from "../components/NavBar";
import { trpc } from "../utils/trpc";
const Quote: NextPage = () => {
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
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Request a <span className="text-purple-300">Quote</span>
        </h1>
        <p className="text-2xl text-gray-700">
          Our offerings are trash? Want something specific? Shoot us your idea
          and we will respond to you with a quote ASAP. *Just FYI, we are not
          able to do custom models at this time. However, we are able to scour
          the internet and search for ones already completed by other artists!
          If it is not on our site, just send us the file.
        </p>

        <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>
        <AuthShowcase />
      </main>

      <footer className="border-t-2 py-5 text-center">
        <p className="text-sm font-medium">
          ©2022 Made with ❤️ and ☕ by Andrew Hunn
        </p>
      </footer>
    </>
  );
};

export default Quote;

const AuthShowcase: React.FC = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery();

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl text-blue-500">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
      {secretMessage && (
        <p className="text-2xl text-blue-500">{secretMessage}</p>
      )}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};