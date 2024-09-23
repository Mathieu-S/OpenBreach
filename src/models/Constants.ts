const PlayerSizes = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4
} as const

export type PlayerSize = (typeof PlayerSizes)[keyof typeof PlayerSizes]

export type DeckTierStructure = [
  Tier1CardSize: number,
  Tier2CardSize: number,
  Tier3CardSize: number
]

export const NEMESIS_DECK_STRUCTURE: Record<PlayerSize, DeckTierStructure> = {
  [PlayerSizes.ONE]: [1, 3, 7],
  [PlayerSizes.TWO]: [3, 5, 7],
  [PlayerSizes.THREE]: [5, 6, 7],
  [PlayerSizes.FOUR]: [8, 7, 7]
}

export const MAX_PLAYER_LIFE_POINTS = 10
export const MAX_GRAVEHOLD_LIFE_POINTS = 30
