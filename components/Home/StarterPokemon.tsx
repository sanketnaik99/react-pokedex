import React from "react";
import PokemonCard from "../Shared/PokemonCard";

interface Props {
  title: string;
  description: string;
  pokemon: Pokemon[];
}

const StarterPokemon: React.FC<Props> = ({ title, description, pokemon }) => {
  const list = pokemon.map((pokemon) => (
    <PokemonCard key={pokemon.id} pokemon={pokemon} />
  ));

  return (
    <div className="container px-5 mx-auto text-left">
      <h1 className="font-body dark:text-white text-4xl color-transition">
        {title}
      </h1>
      <p className="text-gray-800 dark:text-gray-200 color-transition text-lg mt-1">
        {description}
      </p>
      <div className="sm:mt-8 mt-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-y-4 md:gap-y-8 gap-x-8">
        {list}
      </div>
    </div>
  );
};

export default StarterPokemon;
