export const POKEMON_TYPES = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying',
    'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

export const GENERATION_BG_COLORS = {
  1: 'bg-red-500',
  2: 'bg-orange-500',
  3: 'bg-amber-500',
  4: 'bg-yellow-500',
  5: 'bg-lime-500',
  6: 'bg-green-500',
  7: 'bg-emerald-500',
  8: 'bg-teal-500',
  9: 'bg-cyan-500',
  10: 'bg-sky-500',
  11: 'bg-violet-500',
  12: 'bg-purple-500',
  13: 'bg-fuchsia-500',
  14: 'bg-pink-500',
  15: 'bg-rose-500',
};

export const GENERATIONS = Object.keys(GENERATION_BG_COLORS).map(Number);
export const MAX_POKEMON_ID = 1025;
export const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const TYPE_COLORS = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-900',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
};

export const SCROLLBAR_COLORS = {
    normal: 'scrollbar-thumb-gray-400',
    fire: 'scrollbar-thumb-red-500',
    water: 'scrollbar-thumb-blue-500',
    electric: 'scrollbar-thumb-yellow-400',
    grass: 'scrollbar-thumb-green-500',
    ice: 'scrollbar-thumb-blue-200',
    fighting: 'scrollbar-thumb-red-700',
    poison: 'scrollbar-thumb-purple-500',
    ground: 'scrollbar-thumb-yellow-600',
    flying: 'scrollbar-thumb-indigo-400',
    psychic: 'scrollbar-thumb-pink-500',
    bug: 'scrollbar-thumb-green-400',
    rock: 'scrollbar-thumb-yellow-700',
    ghost: 'scrollbar-thumb-purple-700',
    dragon: 'scrollbar-thumb-indigo-700',
    dark: 'scrollbar-thumb-gray-900',
    steel: 'scrollbar-thumb-gray-500',
    fairy: 'scrollbar-thumb-pink-300',
};