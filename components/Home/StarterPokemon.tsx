import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingCard from "../Shared/LoadingCard";
import PokemonCard from "../Shared/PokemonCard";

interface Props {
  title: string;
  description: string;
  generation: number;
}

const StarterPokemon: React.FC<Props> = ({
  title,
  description,
  generation,
}) => {
  const defaultPokemon: Pokemon[] = [];
  const BASE_URL = "https://pokeapi.co/api/v2";
  const generationOffsets = [0, 151];

  const [pokemon, setPokemon]: [
    Pokemon[],
    (pokemon: Pokemon[]) => void
  ] = useState(defaultPokemon);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Get Pokemon Data from the Endpoint
    async function getPokemonList(results: CallResult[]): Promise<Pokemon[]> {
      let newPokemon: Pokemon[] = [];
      for (const result of results) {
        await axios
          .get<Pokemon>(result.url)
          .then((res) => {
            newPokemon.push(res.data);
          })
          .catch((err) => console.error(err));
      }
      return newPokemon.sort((a, b) => a.id - b.id);
    }

    const storedData: Pokemon[] = JSON.parse(
      localStorage.getItem(`generation-${generation}-starter`) || "[]"
    );
    if (storedData.length > 0) {
      console.log(`Found stored data for Generation - ${generation}`);
      setPokemon(storedData);
      setLoading(false);
    } else {
      console.log(
        `No Stored Data, Making a Network Request for Generation - ${generation}`
      );
      // Request to Fetch the data from PokeAPI.
      axios
        .get(
          `${BASE_URL}/pokemon?limit=9&offset=${
            generationOffsets[generation - 1]
          }`
        )
        .then((res) => {
          const results: CallResult[] = res.data.results;
          getPokemonList(results)
            .then((res) => {
              setPokemon(res);
              setLoading(false);
              localStorage.setItem(
                `generation-${generation}-starter`,
                JSON.stringify(res)
              );
            })
            .catch((err) => {
              console.error(err);
            });
        });
    }
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
        <div className="sm:mt-8 mt-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-y-4 md:gap-y-8 gap-x-8">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
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
