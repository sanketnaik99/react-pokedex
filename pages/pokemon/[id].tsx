import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React, { useEffect } from "react";

interface Props {
  pokemon: Pokemon;
}

const PokemonDetail: React.FC<Props> = ({ pokemon }) => {
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

      <section className="text-gray-600 body-font h-screen">
        <div className="container mx-auto flex px-5 py-20 md:flex-row flex-col-reverse items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left  items-center text-center">
            <h1 className="font-body sm:text-5xl text-5xl mb-4 text-gray-900 dark:text-white color-transition">
              {pokemonName}
            </h1>
            <div className="flex flex-row">{typesBadges}</div>
            <p className="mb-8 font-sans leading-relaxed text-lg dark:text-gray-200 color-transition">
              "Grass"
            </p>
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
