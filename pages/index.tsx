import axios from "axios";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import PokemonHero from "../components/Home/PokemonHero";
import StarterPokemon from "../components/Home/StarterPokemon";
import styles from "../styles/Home.module.css";

interface Props {
  gen1: Pokemon[];
  gen2: Pokemon[];
}

const Home: React.FC<Props> = ({ gen1, gen2 }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content="Pokedex" />
        <meta
          name="description"
          content="A Pokedex App created using Next.js (A ReactJS Framework), Typescript, and TailwindCSS."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pokedex.sanketnaik.dev/" />
        <meta property="og:title" content="Pokedex" />
        <meta
          property="og:description"
          content="A Pokedex App created using Next.js (A ReactJS Framework), Typescript, and TailwindCSS."
        />
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
        <meta property="twitter:title" content="Pokedex" />
        <meta
          property="twitter:description"
          content="A Pokedex App created using Next.js (A ReactJS Framework), Typescript, and TailwindCSS."
        />
        <meta
          property="twitter:image"
          content="https://pokedex.sanketnaik.dev/assets/pokedex-banner.png"
        />
      </Head>
      <h1 className="hidden">PokeDex</h1>
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

      {/* Starter Pokemon Grid */}
      <StarterPokemon
        title="Starter Pokemon"
        description="Here's a list of the starter pokemon for Generation I."
        pokemon={gen1}
      />

      {/* Gen 1 View All Button */}
      {/* <div className="flex flex-row justify-center mt-12">
        <div>
          <Link href="/generation/1">
            <a
              className="w-80 text-center bg-gray-800 text-white dark:text-red-500 dark:bg-white color-transition font-bold uppercase px-8 py-2 rounded-lg shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
            >
              View All
            </a>
          </Link>
        </div>
      </div> */}

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

      {/* Starter Pokemon Grid */}
      <StarterPokemon
        title="Starter Pokemon"
        description="Here's a list of the starter pokemon for Generation II."
        pokemon={gen2}
      />

      {/* Gen 2 View All Button */}
      {/* <div className="flex flex-row justify-center mt-12">
        <Link href="/generation/2">
          <a
            className="w-80 text-center bg-gray-800 text-white dark:text-red-500 dark:bg-white color-transition font-bold uppercase px-8 py-2 rounded-lg shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
          >
            View All
          </a>
        </Link>
      </div> */}

      <div className="mb-20"></div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const gen1Results: CallResult[] = (
    await axios.get<PokemonListResult>(
      "https://pokeapi.co/api/v2/pokemon?limit=9&offset=0"
    )
  ).data.results;
  let gen1Pokemon: Pokemon[] = [];
  for (let result of gen1Results) {
    const pokemon: Pokemon = (await axios.get<Pokemon>(result.url)).data;
    gen1Pokemon.push(pokemon);
  }

  const gen2Results: CallResult[] = (
    await axios.get<PokemonListResult>(
      "https://pokeapi.co/api/v2/pokemon?limit=9&offset=151"
    )
  ).data.results;
  let gen2Pokemon: Pokemon[] = [];
  for (let result of gen2Results) {
    const pokemon: Pokemon = (await axios.get<Pokemon>(result.url)).data;
    gen2Pokemon.push(pokemon);
  }
  return { props: { gen1: gen1Pokemon, gen2: gen2Pokemon } };
};

export default Home;
