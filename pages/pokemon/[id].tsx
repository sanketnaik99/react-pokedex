import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import Navbar from "../../components/Layout/Navbar";

interface Props {
  pokemon: Pokemon;
}

const PokemonDetail: React.FC<Props> = ({ pokemon }) => {
  const colors = ["green", "red", "blue", "pink", "indigo", "yellow"];

  // Making the name Uppercase
  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  // Pokemon Type Badges
  const typesBadges = pokemon.types.map((type) => (
    <div
      className={["badge capitalize mx-2 md:mx-0 md:mr-3", type.type.name].join(
        " "
      )}
      key={type.type.name}
    >
      {type.type.name}
    </div>
  ));

  const statsList = pokemon.stats.map((stat, index) => (
    <div className="relative pt-1" key={stat.stat.name}>
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span
            className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-${colors[index]}-800 bg-${colors[index]}-100`}
          >
            {stat.stat.name}
          </span>
        </div>
        <div className="text-right">
          <span
            className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-${colors[index]}-800 dark:text-${colors[index]}-800 dark:bg-${colors[index]}-100 color-transition`}
          >
            {stat.base_stat}
          </span>
        </div>
      </div>
      <div
        className={`overflow-hidden h-2 mb-4 text-xs flex rounded bg-${colors[index]}-200`}
      >
        <div
          style={{ width: `${stat.base_stat}%` }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${colors[index]}-500`}
        ></div>
      </div>
    </div>
  ));

  return (
    <div>
      <Head>
        <title>{pokemonName}</title>
        <link
          rel="icon"
          href={pokemon.sprites.other["official-artwork"].front_default}
        />

        <meta name="title" content={pokemonName} />
        <meta
          name="description"
          content={`Click on the link to learn more about ${pokemonName}`}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://pokedex.sanketnaik.dev/pokemon/${pokemon.id}`}
        />
        <meta property="og:title" content={pokemonName} />
        <meta
          property="og:description"
          content={`Click on the link to learn more about ${pokemonName}`}
        />
        <meta
          property="og:image"
          content={pokemon.sprites.other["official-artwork"].front_default}
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://pokedex.sanketnaik.dev/pokemon/${pokemon.id}`}
        />
        <meta property="twitter:title" content={pokemonName} />
        <meta
          property="twitter:description"
          content={`Click on the link to learn more about ${pokemonName}`}
        />
        <meta
          property="twitter:image"
          content={pokemon.sprites.other["official-artwork"].front_default}
        />
      </Head>

      <section className="text-gray-600 body-font h-screen pt-4 md:pt-20 mb-20">
        <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col-reverse items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left  items-center text-center">
            <h1 className="font-body sm:text-5xl text-5xl mb-4 text-gray-900 dark:text-white color-transition">
              {pokemonName}
            </h1>
            {/* Type Badges */}
            <div className="flex flex-row">{typesBadges}</div>
            {/* Details */}
            {/* <div className="flex flex-col mt-8">
              <div className="flex flex-row font-body text-gray-700 dark:text-gray-200 text-2xl color-transition">
                <div className="">Weight</div>
                <div className="pl-4">{pokemon.weight / 10} Kg</div>
              </div>
              <div className="flex flex-row font-body text-gray-700 dark:text-gray-200 text-2xl color-transition">
                <div className="">Height</div>
                <div className="pl-4">{pokemon.height / 10} m</div>
              </div>
            </div> */}
            <div className="grid grid-cols-2 gap-2 mt-8 font-body text-gray-700 dark:text-gray-200 text-2xl color-transition">
              <div className="border-r-2 border-gray-300 dark:border-gray-600 pr-4">
                Weight
              </div>
              <div className="pl-4">{pokemon.weight / 10} Kg</div>
              <div className="border-r-2 border-gray-300 dark:border-gray-600 pr-4">
                Height
              </div>
              <div className="pl-4">{pokemon.height / 10} m</div>
            </div>
            {/* Stats */}
            <div className="flex flex-col w-80 mt-8">{statsList}</div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-16 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt={pokemonName}
              src={pokemon.sprites.other["official-artwork"].front_default}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  let ids = Array.from({ length: 251 }, (_, i) => i + 1);
  const paths = ids.map((id) => `/pokemon/${id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const pokemon: Pokemon = (
    await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${context.params.id}`
    )
  ).data;
  return { props: { pokemon: pokemon } };
};

export default PokemonDetail;
