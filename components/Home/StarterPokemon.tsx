import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingCard from "../Shared/LoadingCard";

const StarterPokemon: React.FC = () => {
  const defaultPokemon: Pokemon[] = [];
  const BASE_URL = "https://pokeapi.co/api/v2";

  const [pokemon, setPokemon]: [
    Pokemon[],
    (pokemon: Pokemon[]) => void
  ] = useState(defaultPokemon);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const pokemon: Pokemon[] = [];
    // axios
    //   .get(`${BASE_URL}/pokemon?limit=9&offset=0`)
    //   .then((res) => {
    //     const results: CallResult[] = res.data.results;
    //     results.forEach((result) => {
    //       axios
    //         .get<Pokemon>(result.url)
    //         .then((res) => {
    //           pokemon.push(res.data);
    //         })
    //         .then(() => {
    //           pokemon.sort((pokemon) => pokemon.id);
    //           setPokemon(pokemon);
    //         })
    //         .catch((err) => {
    //           console.error(err);
    //         });
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  });

  return (
    <div className="container px-5 mx-auto text-left">
      <h1 className="font-body dark:text-white text-4xl color-transition">
        Starter Pokemon
      </h1>
      <p className="text-gray-800 dark:text-gray-200 color-transition text-lg mt-1">
        Here's a list of the starter pokemon and their evolutions for Generation
        I.
      </p>
      <div className="sm:mt-8 mt-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-y-4 md:gap-y-8 gap-x-8">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <div className="block lg:hidden xl:block">
          <LoadingCard />
        </div>
      </div>
    </div>
  );
};

export default StarterPokemon;
