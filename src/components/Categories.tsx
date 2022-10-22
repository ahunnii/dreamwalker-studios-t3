import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FC, Fragment, useEffect, useRef, useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface CategoryProps {
  categories: Array<Category>;
}

const CategorySelection: FC<CategoryProps> = ({ categories }) => {
  return (
    <div className=" w-56 text-right">
      <Menu as="div" className="">
        <div>
          <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
            Categories{" "}
            <span className="mx-1 inline-flex h-6 w-6 justify-center rounded-md bg-gray-100 font-bold">
              {categories.length}
            </span>
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute  z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {categories &&
                categories.map((item: Category) => (
                  <CategoryItem key={item.name} {...item} />
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default CategorySelection;

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

const CategoryItem: FC<Category> = ({ name }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? "bg-violet-500 text-white" : "text-gray-900"
          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        >
          {active ? (
            <EditActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          ) : (
            <EditInactiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          )}
          {name}
        </button>
      )}
    </Menu.Item>
  );
};
