import React, { useEffect, useState } from "react";
import http from "../../http";
import LoadingCard from "../Shared/LoadingCard";
import PokemonCard from "../Shared/PokemonCard";

interface Props {
  title: string;
  description: string;
  offset: number;
}

const StarterPokemon: React.FC<Props> = ({ title, description, offset }) => {
  const defaultPokemon: Pokemon[] = [];
  const BASE_URL = "https://pokeapi.co/api/v2";

  const [pokemon, setPokemon]: [
    Pokemon[],
    (pokemon: Pokemon[]) => void
  ] = useState(defaultPokemon);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let newPokemon: Pokemon[] = [];
    http({
      url: `${BASE_URL}/pokemon?limit=9&offset=${offset}`,
      method: "get",
    })
      .then((res) => {
        const results: CallResult[] = res.data.results;

        results.forEach((result, index, array) => {
          http({
            url: result.url,
            method: "get",
          })
            .then((res) => {
              newPokemon.push(res.data);
              if (index === array.length - 1) {
                newPokemon = newPokemon.sort((a, b) => a.id - b.id);
                setPokemon(newPokemon);

                setLoading(false);
              }
            })
            .catch((err) => {
              console.error(err);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
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
      {isLoading ? (
        <div className="sm:mt-8 mt-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-y-4 md:gap-y-8 gap-x-8">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <div className="block lg:hidden xl:block">
            <LoadingCard />
          </div>
        </div>
      ) : (
        <div className="sm:mt-8 mt-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-y-4 md:gap-y-8 gap-x-8">
          {list}
        </div>
      )}
    </div>
  );
};

export default StarterPokemon;
