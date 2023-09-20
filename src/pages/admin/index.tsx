import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

import Link from "next/link";
import Card from "../../components/Cards/Card";
import { LocalProduct } from "../../components/Cards/types";
import CustomJob from "../../components/CustomJob";
import Hero from "../../components/Hero";
import NavBar from "../../components/NavBar";
import { trpc } from "../../utils/trpc";
const Admin: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Admin | DreamWalker Studios</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      <main className="mx-auto min-h-screen max-w-7xl px-2 sm:px-6 lg:px-8">
        {sessionData?.user?.role == "GENERAL" && (
          <AuthorizedView {...sessionData?.user} />
        )}

        {sessionData?.user?.role == "SUPER" && (
          <div className="flex flex-col items-center justify-center gap-2">
            {sessionData && (
              <p className="text-2xl text-blue-500">
                Logged in as {sessionData?.user?.name}
              </p>
            )}

            <p>{sessionData?.user?.role?.toLocaleString()}</p>

            <button
              className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
              onClick={sessionData ? () => signOut() : () => signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button>
          </div>
        )}
      </main>

      <footer className="border-t-2 py-5 text-center">
        <p className="text-sm font-medium">
          ©2022 Made with ❤️ and ☕ by Andrew Hunn
        </p>
      </footer>
    </>
  );
};

export default Admin;

const UnauthorizedView: React.FC = () => {
  return (
    <>
      <h1 className="mb-5 mt-8 text-5xl  font-bold tracking-tight text-gray-700 md:text-[5rem]">
        403 Restricted
      </h1>

      <p>
        Whoops, looks like you are trying to access stuff way above your account
        role.
      </p>
    </>
  );
};

interface UserProps {
  id: string | null | undefined;
  name: string | null | undefined;
  role: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}
const AuthorizedView: React.FC<UserProps> = ({
  id,
  name,
  role,
  email,
  image,
}) => {
  return (
    <>
      <h1 className="mb-5 mt-8 text-5xl  font-bold tracking-tight text-gray-700 md:text-[5rem]">
        Welcome back, {name}
      </h1>

      <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                2,340
              </span>
              <h3 className="text-base font-normal text-gray-500">
                New products this week
              </h3>
            </div>
            <div className="ml-5 flex w-0 flex-1 items-center justify-end text-base font-bold text-green-500">
              14.6%
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                5,355
              </span>
              <h3 className="text-base font-normal text-gray-500">
                Visitors this week
              </h3>
            </div>
            <div className="ml-5 flex w-0 flex-1 items-center justify-end text-base font-bold text-green-500">
              32.9%
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8 ">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                385
              </span>
              <h3 className="text-base font-normal text-gray-500">
                User signups this week
              </h3>
            </div>
            <div className="ml-5 flex w-0 flex-1 items-center justify-end text-base font-bold text-red-500">
              -2.7%
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pt-6">
        <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8  2xl:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                  $45,385
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  Sales this week
                </h3>
              </div>
              <div className="flex flex-1 items-center justify-end text-base font-bold text-green-500">
                12.5%
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div id="main-chart"></div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8 ">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Latest Transactions
                </h3>
                <span className="text-base font-normal text-gray-500">
                  This is a list of latest transactions
                </span>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="#"
                  className="rounded-lg p-2 text-sm font-medium text-cyan-600 hover:bg-gray-100"
                >
                  View all
                </a>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="overflow-x-auto rounded-lg">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Transaction
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Date & Time
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                          >
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <tr>
                          <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-900">
                            Payment from{" "}
                            <span className="font-semibold">Bonnie Green</span>
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500">
                            Apr 23 ,2021
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900">
                            $2300
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="rounded-left whitespace-nowrap rounded-lg p-4 text-sm font-normal text-gray-900">
                            Payment refund to{" "}
                            <span className="font-semibold">#00910</span>
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500">
                            Apr 23 ,2021
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900">
                            -$670
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-900">
                            Payment failed from{" "}
                            <span className="font-semibold">#087651</span>
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500">
                            Apr 18 ,2021
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900">
                            $234
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="rounded-left whitespace-nowrap rounded-lg p-4 text-sm font-normal text-gray-900">
                            Payment from{" "}
                            <span className="font-semibold">Lana Byrd</span>
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500">
                            Apr 15 ,2021
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900">
                            $5000
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-900">
                            Payment from{" "}
                            <span className="font-semibold">Jese Leos</span>
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500">
                            Apr 15 ,2021
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900">
                            $2300
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="rounded-left whitespace-nowrap rounded-lg p-4 text-sm font-normal text-gray-900">
                            Payment from{" "}
                            <span className="font-semibold">
                              THEMESBERG LLC
                            </span>
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500">
                            Apr 11 ,2021
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900">
                            $560
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-900">
                            Payment from{" "}
                            <span className="font-semibold">Lana Lysle</span>
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-normal text-gray-500">
                            Apr 6 ,2021
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900">
                            $1437
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8 ">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                  2,340
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  New products this week
                </h3>
              </div>
              <div className="ml-5 flex w-0 flex-1 items-center justify-end text-base font-bold text-green-500">
                14.6%
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8 ">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                  5,355
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  Visitors this week
                </h3>
              </div>
              <div className="ml-5 flex w-0 flex-1 items-center justify-end text-base font-bold text-green-500">
                32.9%
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8 ">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                  385
                </span>
                <h3 className="text-base font-normal text-gray-500">
                  User signups this week
                </h3>
              </div>
              <div className="ml-5 flex w-0 flex-1 items-center justify-end text-base font-bold text-red-500">
                -2.7%
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 grid grid-cols-1 xl:gap-4 2xl:grid-cols-2">
          <div className="mb-4 h-full rounded-lg bg-white p-4 shadow sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold leading-none text-gray-900">
                Latest Customers
              </h3>
              <a
                href="#"
                className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-cyan-600 hover:bg-gray-100"
              >
                View all
              </a>
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://demo.themesberg.com/windster/images/users/neil-sims.png"
                        alt="Neil image"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Neil Sims
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        <a
                          href="/cdn-cgi/l/email-protection"
                          className="__cf_email__"
                          data-cfemail="17727a767e7b57607e7973646372653974787a"
                        >
                          [email&#160;protected]
                        </a>
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      $320
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://demo.themesberg.com/windster/images/users/bonnie-green.png"
                        alt="Neil image"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Bonnie Green
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        <a
                          href="/cdn-cgi/l/email-protection"
                          className="__cf_email__"
                          data-cfemail="d4b1b9b5bdb894a3bdbab0a7a0b1a6fab7bbb9"
                        >
                          [email&#160;protected]
                        </a>
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      $3467
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://demo.themesberg.com/windster/images/users/michael-gough.png"
                        alt="Neil image"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Michael Gough
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        <a
                          href="/cdn-cgi/l/email-protection"
                          className="__cf_email__"
                          data-cfemail="57323a363e3b17203e3933242332257934383a"
                        >
                          [email&#160;protected]
                        </a>
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      $67
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://demo.themesberg.com/windster/images/users/thomas-lean.png"
                        alt="Neil image"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Thomes Lean
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        <a
                          href="/cdn-cgi/l/email-protection"
                          className="__cf_email__"
                          data-cfemail="284d45494144685f41464c5b5c4d5a064b4745"
                        >
                          [email&#160;protected]
                        </a>
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      $2367
                    </div>
                  </div>
                </li>
                <li className="pt-3 pb-0 sm:pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://demo.themesberg.com/windster/images/users/lana-byrd.png"
                        alt="Neil image"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        Lana Byrd
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        <a
                          href="/cdn-cgi/l/email-protection"
                          className="__cf_email__"
                          data-cfemail="a2c7cfc3cbcee2d5cbccc6d1d6c7d08cc1cdcf"
                        >
                          [email&#160;protected]
                        </a>
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                      $367
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow sm:p-6 xl:p-8 ">
            <h3 className="mb-10 text-xl font-bold leading-none text-gray-900">
              Acquisition Overview
            </h3>
            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse items-center bg-transparent">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap border-l-0 border-r-0 bg-gray-50 px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-gray-700">
                      Top Channels
                    </th>
                    <th className="whitespace-nowrap border-l-0 border-r-0 bg-gray-50 px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-gray-700">
                      Users
                    </th>
                    <th className="min-w-140-px whitespace-nowrap border-l-0 border-r-0 bg-gray-50 px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="text-gray-500">
                    <th className="whitespace-nowrap border-t-0 p-4 px-4 text-left align-middle text-sm font-normal">
                      Organic Search
                    </th>
                    <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs font-medium text-gray-900">
                      5,649
                    </td>
                    <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">30%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200">
                            <div className="h-2 rounded-sm bg-cyan-600"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-gray-500">
                    <th className="whitespace-nowrap border-t-0 p-4 px-4 text-left align-middle text-sm font-normal">
                      Referral
                    </th>
                    <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs font-medium text-gray-900">
                      4,025
                    </td>
                    <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">24%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200">
                            <div className="h-2 rounded-sm bg-orange-300"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-gray-500">
                    <th className="whitespace-nowrap border-t-0 p-4 px-4 text-left align-middle text-sm font-normal">
                      Direct
                    </th>
                    <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs font-medium text-gray-900">
                      3,105
                    </td>
                    <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">18%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200">
                            <div className="h-2 rounded-sm bg-teal-400"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-gray-500">
                    <th className="whitespace-nowrap border-t-0 p-4 px-4 text-left align-middle text-sm font-normal">
                      Social
                    </th>
                    <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs font-medium text-gray-900">
                      1251
                    </td>
                    <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">12%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200">
                            <div className="h-2 rounded-sm bg-pink-600"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-gray-500">
                    <th className="whitespace-nowrap border-t-0 p-4 px-4 text-left align-middle text-sm font-normal">
                      Other
                    </th>
                    <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs font-medium text-gray-900">
                      734
                    </td>
                    <td className="whitespace-nowrap border-t-0 p-4 px-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">9%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200">
                            <div className="h-2 rounded-sm bg-indigo-600"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-gray-500">
                    <th className="whitespace-nowrap border-t-0 p-4 pb-0 text-left align-middle text-sm font-normal">
                      Email
                    </th>
                    <td className="whitespace-nowrap border-t-0 p-4 pb-0 align-middle text-xs font-medium text-gray-900">
                      456
                    </td>
                    <td className="whitespace-nowrap border-t-0 p-4 pb-0 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">7%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200">
                            <div className="h-2 rounded-sm bg-purple-500"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};