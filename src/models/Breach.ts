export const BreachNumbers = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  // Note: I have no idea whats the max but documentation says
  // that 'not all players have the same amount of available breaches'.
  V: 5,
  VI: 6
} as const

export type BreachNumber = (typeof BreachNumbers)[keyof typeof BreachNumbers]

export type BreachCosts = [TopCost: number, LeftCost: number, BottomCost: number, RightCost: number]

// Note: I remember that Virgile's hero had an effect on bottom side of his breach IV card, probably a newer gen mechanism
export type BreachSideEffectTexts = [
  TopEffectText: string,
  LeftEffectText: string,
  BottomEffectText: string,
  RightEffectText: string
]

export enum BreachPosition {
  /** 0% rotation */
  TOP,
  /** 90% rotation */
  LEFT,
  /**
   * 180% rotation
   *
   * Usually refers to the yellow part of the breach card, where the costs are the lowest
   */
  BOTTOM,
  /** 270% rotation */
  RIGHT
}

export interface Breach {
  opened: boolean
  currentPosition: BreachPosition
  breachNumber: BreachNumber
  /**
   * Description of effect triggered when breach is opened,
   * seems to be usually visible on the back of the card
   */
  openedEffectText?: string
  /**
   * Description of effect triggered when spell placed on this breach is casted,
   * seems to be usually visible on the front of the card
   */
  castEffectText?: string
  focusCosts: BreachCosts
  openCosts: BreachCosts
  /** Description of effects for specific breach sides */
  sideEffectTexts: BreachSideEffectTexts
}
