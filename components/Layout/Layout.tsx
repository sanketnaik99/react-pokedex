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
        "w-full h-screen flex flex-col",
      ].join(" ")}
    >
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
