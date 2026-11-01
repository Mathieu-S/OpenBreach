export type Card = {
  id: string
  name: string
  type: CardType
}

export enum CardType {
  Randomizer = 'RANDOMIZER',
  Gem = 'GEM',
  Spell = 'SPELL',
  Relic = 'RELIC',
  Attack = 'ATTACK',
  Power = 'POWER',
  Minion = 'MINION',
}

export enum CardStack {
  Deck = 'DECK',
  Hand = 'HAND',
  Discard = 'DISCARD',
}
