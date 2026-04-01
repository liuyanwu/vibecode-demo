export const RARITIES = [
  'common',
  'uncommon',
  'rare',
  'epic',
  'legendary',
] as const
export type Rarity = (typeof RARITIES)[number]

export const RARITY_WEIGHTS: Record<Rarity, number> = {
  common: 100,
  uncommon: 50,
  rare: 20,
  epic: 5,
  legendary: 1,
}

const c = String.fromCharCode

export const pikachu = 'Pikachu' as const
export const charmander = 'Charmander' as const
export const squirtle = 'Squirtle' as const
export const bulbasaur = 'Bulbasaur' as const
export const gengar = 'Gengar' as const
export const snorlax = 'Snorlax' as const
export const eevee = 'Eevee' as const
export const mew = 'Mew' as const
export const dragonite = 'Dragonite' as const
export const lucario = 'Lucario' as const

// Additional species for buddy sprites (legacy support)
export const axolotl = 'Axolotl' as const
export const blob = 'Blob' as const
export const cactus = 'Cactus' as const
export const capybara = 'Capybara' as const
export const cat = 'Cat' as const
export const chonk = 'Chonk' as const
export const dragon = 'Dragon' as const
export const duck = 'Duck' as const
export const ghost = 'Ghost' as const
export const goose = 'Goose' as const
export const mushroom = 'Mushroom' as const
export const octopus = 'Octopus' as const
export const owl = 'Owl' as const
export const penguin = 'Penguin' as const
export const rabbit = 'Rabbit' as const
export const robot = 'Robot' as const
export const snail = 'Snail' as const
export const turtle = 'Turtle' as const

export const SPECIES = [
  pikachu,
  charmander,
  squirtle,
  bulbasaur,
  gengar,
  snorlax,
  eevee,
  mew,
  dragonite,
  lucario,
  axolotl,
  blob,
  cactus,
  capybara,
  cat,
  chonk,
  dragon,
  duck,
  ghost,
  goose,
  mushroom,
  octopus,
  owl,
  penguin,
  rabbit,
  robot,
  snail,
  turtle,
] as const
export type Species = (typeof SPECIES)[number]

export const EYES = ['·', '✦', '×', '◉', '@', '°'] as const
export type Eye = (typeof EYES)[number]

export const HATS = [
  'none',
  'crown',
  'tophat',
  'propeller',
  'halo',
  'wizard',
  'beanie',
  'tinyduck',
] as const
export type Hat = (typeof HATS)[number]

export const STAT_NAMES = [
  'HP',
  'Attack',
  'Defense',
  'Speed',
  'Special',
] as const

export interface CompanionBones {
  name: string
  species: Species
  rarity: Rarity
  level: number
  stats: Record<string, number>
  eye: Eye
  hat: Hat
}

export const RARITY_STARS = {
  common: '★',
  uncommon: '★★',
  rare: '★★★',
  epic: '★★★★',
  legendary: '★★★★★',
} as const satisfies Record<Rarity, string>

export const RARITY_COLORS = {
  common: 'inactive',
  uncommon: 'success',
  rare: 'permission',
  epic: 'autoAccept',
  legendary: 'warning',
} as const satisfies Record<Rarity, any>
