import {
  type NemesisCard,
  NemesisCardType,
  NEMESIS_BASIC_LABEL,
  type PlayerSize,
  NEMESIS_DECK_STRUCTURE,
  type NemesisCardTier,
  NemesisCardTiers,
  type PlayerCard,
  PlayerCardType
} from '@/models'

export class GameService {
  createNemesisCard(options: Partial<NemesisCard>): NemesisCard {
    return {
      tier: 0,
      name: 'Unknown',
      type: NemesisCardType.Attack,
      effectText: '',
      flavorText: '',
      nemesis: NEMESIS_BASIC_LABEL,
      ...options
    }
  }

  createPlayerCard(options: Partial<PlayerCard>): PlayerCard {
    return {
      cost: 0,
      name: 'Unknown',
      type: PlayerCardType.Gem,
      effectText: '',
      flavorText: '',
      isRandomiser: false,
      ...options
    }
  }

  createNemesisDeck(nbPlayers: PlayerSize): NemesisCard[] {
    const deckStructure = NEMESIS_DECK_STRUCTURE[nbPlayers]
    if (!deckStructure) throw new Error('Invalid player number!')
    const tiers: NemesisCardTier[] = [
      NemesisCardTiers.ONE,
      NemesisCardTiers.TWO,
      NemesisCardTiers.THREE
    ]
    return deckStructure.flatMap((nbCards, index) =>
      Array(nbCards)
        .fill(null)
        .map(() =>
          this.createNemesisCard({
            tier: tiers[index],
            type: NemesisCardType.Attack
          })
        )
    )
  }
}
