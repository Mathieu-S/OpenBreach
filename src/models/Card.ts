export enum PlayerCardType {
  Gem,
  Relic,
  Spell
}

export enum NemesisCardType {
  Attack,
  Minion,
  Power
}

export const NemesisCardTiers = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3
} as const

export const NEMESIS_BASIC_LABEL = 'Basic'

export type NemesisCardTier = (typeof NemesisCardTiers)[keyof typeof NemesisCardTiers]

type AllowedCardTypes = PlayerCardType | NemesisCardType

export interface Card<Types extends AllowedCardTypes = AllowedCardTypes> {
  name: string
  type: Types
  /** Displayable card effect text */
  effectText?: string
  /** Displayable card flavor text */
  flavorText?: string
}

export interface PlayerCard extends Card<PlayerCardType> {
  cost: number
  /**
   * Defines if the card is intended for randomized campaigns
   */
  isRandomiser: boolean
}

export interface NemesisCard extends Card<NemesisCardType> {
  tier: NemesisCardTier
  lifePoint?: number
  /**
   * Associated nemesis card identifier.
   *
   * If labeled `Basic`, this card can be used with any nemesis
   */
  nemesis: string
}
