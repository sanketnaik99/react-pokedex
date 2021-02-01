import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  const [currentTheme, setTheme] = useState("light");
  const [hasLoaded, setLoaded] = useState(false);

  useEffect(() => {
    // Get stored theme.
    // Initially there is no theme in storage so storedTheme will be null.
    const storedTheme = localStorage.getItem("theme");

    // Check if theme has been stored and if it is the first load.
    // If the theme has been stored in local storage and hasLoaded is false -> Then make the theme from localstorage as the currentTheme.
    if (hasLoaded === false && storedTheme) {
      setLoaded(true);
      setTheme(storedTheme);
    }

    // If currentTheme is updated, update LocalStorage.
    if (currentTheme !== storedTheme && hasLoaded) {
      localStorage.setItem("theme", currentTheme);
    }
  }, [currentTheme]);

  return (
    <div
      className={[
        currentTheme === "dark" ? "dark" : "",
        "w-full flex flex-col",
      ].join(" ")}
    >
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="description"
          content="A Pokedex App created using Next.js (A ReactJS Framework), Typescript, and TailwindCSS."
        />
        <title>React PokeDex</title>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Navbar
        handleToggle={() => {
          currentTheme === "dark" ? setTheme("light") : setTheme("dark");
        }}
        hasDarkModeEnabled={currentTheme === "dark"}
      />
      <div className="overflow-y-auto bg-white dark:bg-gray-900">
        {children}
        <Footer hasDarkModeEnabled={currentTheme === "dark"} />
      </div>
    </div>
  );
};

export default Layout;
