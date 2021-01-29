import React from "react";
import PokemonHero from "../components/Home/PokemonHero";

const NotFound = () => {
  return (
    <div className="h-screen">
      <PokemonHero
        title="Page Not Found"
        description="Looks like the page you're looking for wasn't found."
        imageURL="assets/eevee.png"
        imageALT="Eevee"
      />
    </div>
  );
};

export default NotFound;
