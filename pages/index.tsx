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
          "The first generation of Pokémon games, known among older fans as the color generation or \
          the chromatic generation due to the names of the versions released, is the initial set of \
          four Pokémon games released."
        }
        imageALT="Pikachu"
        imageURL="assets/pikachu.png"
      />

      <StarterPokemon
        title="Starter Pokemon"
        description="Here's a list of the starter pokemon for Generation I."
        generation={1}
      />

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

      <StarterPokemon
        title="Starter Pokemon"
        description="Here's a list of the starter pokemon for Generation II."
        generation={2}
      />
      <div className="mb-20"></div>
    </div>
  );
};

export default Home;
