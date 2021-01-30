import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import PokemonCard from "../../components/Shared/PokemonCard";

interface Props {
  pokemon: Pokemon[];
  title: string;
  description: string;
}

const PokemonGeneration: React.FC<Props> = ({
  pokemon,
  title,
  description,
}) => {
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
      <div className="container mt-32  mx-auto mb-12">
        <div className="flex flex-col items-center mx-auto">
          <h1 className="font-body sm:text-6xl md:text-5xl text-gray-800 dark:text-gray-100 color-transition">
            {title}
          </h1>
          <p className="mt-4 px-4 sm:px-12 lg:px-24 font-sans text-center text-lg dark:text-gray-300 color-transition">
            {description}
          </p>
        </div>
        <div className="sm:mt-8 mt-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-y-4 md:gap-y-8 gap-x-8">
          {list}
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
  const generationLimits = [151, 100];
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

  const resultList: CallResult[] = (
    await axios.get<PokemonListResult>(
      `https://pokeapi.co/api/v2/pokemon?limit=${
        generationLimits[genNumber - 1]
      }&offset=${generationOffsets[genNumber - 1]}`
    )
  ).data.results;
  let pokemonList: Pokemon[] = [];
  for (let result of resultList) {
    const pokemon: Pokemon = (await axios.get<Pokemon>(result.url)).data;
    pokemonList.push(pokemon);
  }
  return {
    props: { pokemon: pokemonList, title: title, description: description },
  };
};

export default PokemonGeneration;
