import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { CardStack, type Card } from '@/types/card.ts'
import type { Breach } from '@/types/breach.ts'

export const usePlayerStore = defineStore('player', () => {
  const health = ref(10)
  const charge = ref(0)
  const aether = ref(0)
  const breaches = ref<Breach[]>([
    { isOpen: true, closeAngle: 0 },
    { isOpen: false, closeAngle: 90 },
    { isOpen: false, closeAngle: 180 },
    { isOpen: false, closeAngle: 270 },
  ])
  const cardsInDeck = ref<Card[]>([])
  const cardsInHand = ref<Card[]>([])
  const cardsInDiscard = ref<Card[]>([])

  const isExhausted = computed(() => health.value === 0)

  function addAether(aetherToAdd: number) {
    aether.value += aetherToAdd
  }

  function removeAether(aetherToRemove: number) {
    aether.value -= aetherToRemove
  }

  function drawCard() {
    const cardId = cardsInDeck.value[0]?.id
    if (!cardId) return
    moveCardToAnotherStack(cardId, cardsInDeck, cardsInHand)
  }

  function discardCard(cardId: string) {
    moveCardToAnotherStack(cardId, cardsInHand, cardsInDiscard)
  }

  function addCard(card: Card, targetStack: CardStack) {
    if (!card) return

    switch (targetStack) {
      case CardStack.Deck:
        cardsInDeck.value.push(card)
        break
      case CardStack.Hand:
        cardsInHand.value.push(card)
        break
      case CardStack.Discard:
        cardsInDiscard.value.push(card)
        break
    }
  }

  function focusBreach(id: number) {
    if (id < 1 || id > 4) return
    const breach = breaches.value[id - 1]
    if (!breach) return
    switch (breach.closeAngle) {
      case 270:
        breach.closeAngle = 180
        break
      case 180:
        breach.closeAngle = 90
        break
      case 90:
        breach.closeAngle = 0
        break
      case 0:
        breach.isOpen = true
        break
    }
    breaches.value[id - 1] = breach
  }

  function moveCardToAnotherStack(cardId: string, fromStack: Ref<Card[]>, toStack: Ref<Card[]>) {
    if (!cardId) return

    const card = fromStack.value.find((x) => x.id === cardId)

    if (!card) {
      console.error('Card ID not found.')
      return
    }

    toStack.value.push(card)
    fromStack.value = fromStack.value.filter((x) => x.id !== card.id)
  }

  return {
    health,
    charge,
    aether,
    breaches,
    cardsInDeck,
    cardsInHand,
    cardsInDiscard,
    isExhausted,
    addAether,
    removeAether,
    drawCard,
    discardCard,
    addCard,
    focusBreach,
  }
})
