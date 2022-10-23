import type { NextPage } from "next";

import Head from "next/head";

import Card from "../components/Cards/Card";

import CustomJob from "../components/CustomJob";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: products } = trpc.product.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Home | DreamWalker Studios</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      <main className="mx-auto min-h-screen max-w-7xl px-2 sm:px-6 lg:px-8">
        <Hero />
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Featured
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {products &&
              products.map((product) => (
                <Card key={product.name} product={product} />
              ))}
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[3rem]">
            <span className="text-blue-300">Services</span> we offer
          </h2>

          <div className="my-3 grid gap-3 pt-3 text-center md:grid-cols-3 ">
            <TechnologyCard
              name="3D Printing"
              description="Wide selection from talented artists"
              documentation="https://nextjs.org/"
            />
            <TechnologyCard
              name="Finishing"
              description="We can sand, fill in any imperfections, and prime your piece for you"
              documentation="https://www.typescriptlang.org/"
            />
            <TechnologyCard
              name="Custom Jobs"
              description="Able to print anything you send our way"
              documentation="https://trpc.io/"
            />
          </div>
        </section>

        <CustomJob />
      </main>

      <footer className="border-t-2 py-5 text-center">
        <p className="text-sm font-medium">
          ©2022 Made with ❤️ and ☕ by Andrew Hunn
        </p>
      </footer>
    </>
  );
};

export default Home;

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};
