interface CallResult {
  name: string;
  url: string;
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  sprites: Sprites;
  stats: Stat[];
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonListResult {
  count: number;
  next: string;
  previous: string;
  results: CallResult[];
}

interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: {
    dream_world: {
      front_default: string;
      front_female: string;
    };
    "official-artwork": {
      front_default: string;
    };
  };
}

interface Stat {
  base_stat: string;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
