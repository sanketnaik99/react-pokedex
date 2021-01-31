import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { off } from "process";
import React, { useEffect, useRef, useState } from "react";
import LoadingCard from "../../components/Shared/LoadingCard";
import PokemonCard from "../../components/Shared/PokemonCard";

interface Props {
  generation: number;
  generationMax: number;
  generationOffset: number;
  title: string;
  description: string;
}

const PokemonGeneration: React.FC<Props> = ({
  generation,
  generationMax,
  generationOffset,
  title,
  description,
}) => {
  const BASE_URL = "https://pokeapi.co/api/v2";
  const defaultLimit = 12;
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  // Loading
  const [isLoading, setLoading] = useState(true);

  // Limit
  const [limit, setLimit] = useState(defaultLimit);

  // Tracking the Offset
  const [offset, setOffset] = useState(generationOffset);

  // Tracking the Page Number
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil((generationMax - generationOffset) / limit);

  useEffect(() => {
    // console.log("Page Number => ", page);
    if (page == 1) {
      setOffset(generationOffset);
      setLimit(defaultLimit);
    } else if (page < totalPages) {
      const newOffset = generationOffset + (page - 1) * defaultLimit;
      setOffset(newOffset);
      setLimit(defaultLimit);
    } else {
      const newOffset = generationOffset + (page - 1) * defaultLimit;
      setOffset(newOffset);
      const newLimit = generationMax - newOffset;
      setLimit(newLimit);
    }
    setLoading(true);
  }, [page]);

  useEffect(() => {
    // console.log(`Getting Data from ${offset} to ${offset + limit}`);

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
      localStorage.getItem(`generation_${generation}_${offset}`) || "[]"
    );
    if (storedData.length > 0) {
      // console.log(
      //   `Found stored data for Generation - ${generation} & Offset - ${offset}`
      // );
      setPokemon(storedData);
      setLoading(false);
    } else {
      // console.log(
      //   `No Stored Data, Making a Network Request for Generation - ${generation} & Offset - ${offset}`
      // );
      // Request to Fetch the data from PokeAPI.
      axios
        .get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
        .then((res) => {
          const results: CallResult[] = res.data.results;
          getPokemonList(results)
            .then((res) => {
              setPokemon(res);
              setLoading(false);
              try {
                localStorage.setItem(
                  `generation_${generation}_${offset}`,
                  JSON.stringify(res)
                );
              } catch (error) {
                console.log("Storage Full! Not saving data anymore.");
              }
            })
            .catch((err) => {
              console.error(err);
            });
        });
    }
  }, [offset]);

  // Map List of Pokemon
  const list = pokemon.map((pokemon) => (
    <PokemonCard key={pokemon.id} pokemon={pokemon} />
  ));

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pokedex.sanketnaik.dev/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://pokedex.sanketnaik.dev/assets/pokedex-banner.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://pokedex.sanketnaik.dev/"
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image"
          content="https://pokedex.sanketnaik.dev/assets/pokedex-banner.png"
        />
      </Head>
      <div className="container mt-32 mx-auto mb-12">
        <div className="flex flex-col items-center mx-auto">
          <h1 className="font-body text-5xl md:text-6xl text-gray-800 dark:text-gray-100 color-transition">
            {title}
          </h1>
          <p className="mt-4 px-4 sm:px-12 lg:px-24 font-sans text-center text-lg dark:text-gray-300 color-transition">
            {description}
          </p>
        </div>
        {isLoading ? null : (
          <div className="sm:mt-8 mt-4 mx-2 sm:mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-y-4 md:gap-y-8 gap-x-8">
            {list}
          </div>
        )}
        {isLoading ? (
          <div className="sm:mt-8 mt-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-y-4 md:gap-y-8 gap-x-8">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : null}
        <div className="flex flex-row justify-center mt-7">
          {page === 1 ? null : (
            <button
              className="w-24 md:w-44 text-center mx-2 md:mx-6 bg-gray-800 text-white dark:text-red-500 dark:bg-white color-transition font-bold uppercase px-2 py-2 rounded-lg shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => {
                window.scrollTo(0, 0);
                setPage((page) => page - 1);
              }}
            >
              Prev
            </button>
          )}
          {page === totalPages ? null : (
            <button
              className="w-24 md:w-44 text-center mx-2 md:mx-6 bg-gray-800 text-white dark:text-red-500 dark:bg-white color-transition font-bold uppercase px-2 py-2 rounded-lg shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => {
                window.scrollTo(0, 0);
                setPage((page) => page + 1);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  let gens = Array.from({ length: 2 }, (_, i) => i + 1);
  const paths = gens.map((gen) => `/generation/${gen}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const generationOffsets = [0, 151];
  const generationMax = [151, 251];
  const genNumber: number = +params.gen;

  //   Set Title and Description according to generation.
  let title: string = "";
  let description: string = "";
  if (genNumber === 1) {
    title = "Generation I";
    description =
      "The first generation of Pokémon games, known among older fans as the color generation or \
          the chromatic generation due to the names of the versions released, is the initial set of \
          four Pokémon games released.";
  } else {
    title = "Generation II";
    description =
      "The second generation (Generation II) of the Pokémon franchise features 100 fictional \
      species of creatures introduced to the core video game series in the 1999 Game Boy Color \
      games Pokémon Gold and Silver, set in the Johto region.";
  }

  return {
    props: {
      generation: genNumber,
      generationMax: generationMax[genNumber - 1],
      generationOffset: generationOffsets[genNumber - 1],
      title: title,
      description: description,
    },
  };
};

export default PokemonGeneration;
