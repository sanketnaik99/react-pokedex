import Head from "next/head";
import { useEffect } from "react";
import PokemonHero from "../components/Home/PokemonHero";
import StarterPokemon from "../components/Home/StarterPokemon";
import LoadingCard from "../components/Shared/LoadingCard";
import PokemonCard from "../components/Shared/PokemonCard";
import styles from "../styles/Home.module.css";

const Home = () => {
  useEffect(() => {
    // Get Data from PokeAPI
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Generation I Hero Section */}
      <PokemonHero
        title="Generation I"
        description={
          'This Pokédex, which was introduced in Generation I, is the first \
              regional Pokédex. The numbering in this Pokédex would serve as the \
              basis for the official listing of all Pokémon introduced, with \
              subsequent generations\' Pokémon being added on to the end, with \
              the name of "Old Pokédex" in Generation II and then the "National \
              Pokédex" ever since, starting with Generation III.'
        }
        imageALT="Pikachu"
        imageURL="assets/pikachu.png"
      />

      <StarterPokemon />

      {/* Generation II Hero Section */}
      <PokemonHero
        title="Generation II"
        description={
          "The second generation (Generation II) of the Pokémon franchise features 100 fictional \
         species of creatures introduced to the core video game series in the 1999 Game Boy Color \
         games Pokémon Gold and Silver, set in the Johto region."
        }
        imageALT="Bayleef"
        imageURL="assets/bayleef.png"
      />
    </div>
  );
};

export default Home;
