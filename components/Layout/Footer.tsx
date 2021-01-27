import React from "react";

interface Props {
  hasDarkModeEnabled: boolean;
}

const Footer: React.FC<Props> = ({ hasDarkModeEnabled }) => {
  return (
    <footer className="text-gray-600 dark:bg-gray-800 border-t-2 border-gray-200 dark:border-gray-700 body-font color-transition">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          {hasDarkModeEnabled ? (
            <img
              src="assets/pokedex-logo-dark.png"
              alt="PokeDex"
              className="h-8 sm:h-10"
            />
          ) : (
            <img
              src="assets/pokedex-logo-light.png"
              alt="PokeDex"
              className="h-8 sm:h-10"
            />
          )}
        </a>
        <p className="text-md text-gray-500 dark:text-gray-100 color-transition sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 pt-3 pb-2 sm:mt-0 mt-4">
          Made by
          <a
            href="https://github.com/sanketnaik99"
            className="text-gray-600 ml-1 font-bold dark:text-gray-100 color-transition"
            rel="noopener noreferrer"
            target="_blank"
          >
            @sanketnaik99
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a
            className="ml-3 text-gray-500  dark:text-gray-200 color-transition"
            href="https://twitter.com/sanketnaik99"
            target="_blank"
          >
            <svg
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a
            className="ml-3 text-gray-500  dark:text-gray-200 color-transition"
            href="https://instagram.com/sanketnaik99"
            target="_blank"
          >
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a
            className="ml-3 text-gray-500  dark:text-gray-200 color-transition"
            href="https://www.linkedin.com/in/sanketnaik99/"
            target="_blank"
          >
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="0"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;