import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  const [currentTheme, setTheme] = useState("light");
  const [hasLoaded, setLoaded] = useState(false);

  useEffect(() => {
    // Get stored theme.
    const storedTheme = localStorage.getItem("theme");

    // Check if theme has been stored or if it is the first load.
    if (!hasLoaded && storedTheme) {
      setTheme(storedTheme);
      setLoaded(true);
    }

    // If currentTheme is updated, update LocalStorage.
    if (currentTheme !== storedTheme) {
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
          currentTheme == "dark" ? setTheme("light") : setTheme("dark");
        }}
        hasDarkModeEnabled={currentTheme === "dark"}
      />
      <div className="overflow-y-auto bg-white dark:bg-gray-900">
        {children}
      </div>
      <Footer hasDarkModeEnabled={currentTheme === "dark"} />
    </div>
  );
};

export default Layout;
