import { assert, describe, it } from 'vitest'
import { GameService } from '../GameService'

describe('Create nemesis deck', () => {
  it('For invalid player', () => {
    const gameService = new GameService()
    // @ts-expect-error
    assert.throw(() => gameService.createNemesisDeck(0), 'Invalid player number!')
  })

  it('For 1 player', () => {
    const gameService = new GameService()

    const result = gameService.createNemesisDeck(1)

    assert.isNotEmpty(result)
    assert.equal(result.filter((x) => x.tier === 1).length, 1)
    assert.equal(result.filter((x) => x.tier === 2).length, 3)
    assert.equal(result.filter((x) => x.tier === 3).length, 7)
  })

  it('For 2 players', () => {
    const gameService = new GameService()

    const result = gameService.createNemesisDeck(2)

    assert.isNotEmpty(result)
    assert.equal(result.filter((x) => x.tier === 1).length, 3)
    assert.equal(result.filter((x) => x.tier === 2).length, 5)
    assert.equal(result.filter((x) => x.tier === 3).length, 7)
  })

  it('For 3 players', () => {
    const gameService = new GameService()

    const result = gameService.createNemesisDeck(3)

    assert.isNotEmpty(result)
    assert.equal(result.filter((x) => x.tier === 1).length, 5)
    assert.equal(result.filter((x) => x.tier === 2).length, 6)
    assert.equal(result.filter((x) => x.tier === 3).length, 7)
  })

  it('For 4 players', () => {
    const gameService = new GameService()

    const result = gameService.createNemesisDeck(4)

    assert.isNotEmpty(result)
    assert.equal(result.filter((x) => x.tier === 1).length, 8)
    assert.equal(result.filter((x) => x.tier === 2).length, 7)
    assert.equal(result.filter((x) => x.tier === 3).length, 7)
  })
})
