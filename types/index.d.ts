interface CallResult {
  name: string;
  url: string;
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_hp: number;
  base_xp: number;
  types: string[];
}

interface Stat {
  name: string;
  value: number;
}
