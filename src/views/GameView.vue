<script setup lang="ts">
import { ref, reactive, useTemplateRef, onMounted } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import { CardStack, CardType } from '@/types/card.ts'
import { usePlayerStore } from '@/stores/player.ts'

import GameCard from '@/components/GameCard.vue'
import ModalWrapper from '@/components/ModalWrapper.vue'
import DiscardList from '@/components/DiscardList.vue'
import SupplyShop from '@/components/SupplyShop.vue'

type modalType = 'supply' | 'discard'
const playerStore = usePlayerStore()
const modal = useTemplateRef<ComponentExposed<typeof ModalWrapper>>('modal')
const isSupplyOpen = ref(false)
const isDiscardOpen = ref(false)
const selectedType = ref<CardType | null>(null)
const selectedCards = reactive<string[]>([])

//used as debug to setup the first hand
onMounted(() => {
  playerStore.addCard(
    { id: self.crypto.randomUUID(), name: 'Spark', type: CardType.Spell },
    CardStack.Hand,
  )
  playerStore.addCard(
    { id: self.crypto.randomUUID(), name: 'Spark', type: CardType.Spell },
    CardStack.Hand,
  )
  playerStore.addCard(
    { id: self.crypto.randomUUID(), name: 'Crystal', type: CardType.Gem },
    CardStack.Hand,
  )
  playerStore.addCard(
    { id: self.crypto.randomUUID(), name: 'Crystal', type: CardType.Gem },
    CardStack.Hand,
  )
  playerStore.addCard(
    { id: self.crypto.randomUUID(), name: 'Crystal', type: CardType.Gem },
    CardStack.Hand,
  )
})

function toggleCard(id: string, type: CardType) {
  const index = selectedCards.indexOf(id)

  if (index !== -1) {
    // Deselect the card.
    selectedCards.splice(index, 1)
    if (selectedCards.length === 0) {
      selectedType.value = null
    }
    return
  }

  // Only allow selecting cards that share the same type.
  if (selectedType.value !== null && selectedType.value !== type) return

  selectedType.value = type
  selectedCards.push(id)
}

function consumeGem() {
  for (const card of selectedCards) {
    playerStore.discardCard(card)
    playerStore.addAether(1)
  }
  selectedCards.length = 0
  selectedType.value = null
}

function showModal(type: modalType) {
  if (type === 'supply') {
    isSupplyOpen.value = true
  } else if (type === 'discard') {
    isDiscardOpen.value = true
  }
  modal.value?.open()
}

function closeModal() {
  isSupplyOpen.value = false
  isDiscardOpen.value = false
}
</script>

<template>
  <main class="game-view">
    <section class="nemesis-area">
      <GameCard id="nemesis" :type="CardType.Randomizer" />
      <div class="nemesis-cards">
        <GameCard id="minion" :type="CardType.Minion" />
        <GameCard
          id="power"
          :type="CardType.Power"
          :animatable="selectedType === null || selectedType === CardType.Power"
          :selectable="selectedType === null || selectedType === CardType.Power"
          :selected="selectedCards.includes('power')"
          @toggle="toggleCard"
        />
      </div>
    </section>
    <section class="control-area">
      <ul class="information-area bulletless-list">
        <li>Player: SPG</li>
        <li>Player Number: 1</li>
        <li>Health: {{ playerStore.health }}</li>
        <li>Charge: {{ playerStore.charge }}/5</li>
        <li>Aether: {{ playerStore.aether }}</li>
        <li>Gravehold: 30/30</li>
      </ul>
      <menu v-if="selectedType === CardType.Gem" class="actions-area bulletless-list">
        <li><button @click="consumeGem">Consume</button></li>
      </menu>
      <menu v-else-if="selectedType === CardType.Spell" class="actions-area bulletless-list">
        <li><button>Prepare</button></li>
      </menu>
      <menu v-else-if="selectedType === CardType.Relic" class="actions-area bulletless-list">
        <li><button>Use</button></li>
      </menu>
      <menu v-else-if="selectedType === CardType.Power" class="actions-area bulletless-list">
        <li><button>Resolve</button></li>
      </menu>
      <menu v-else class="actions-area bulletless-list">
        <li><button disabled>Use ability</button></li>
        <li><button @click="showModal('supply')">Show supply</button></li>
        <li><button @click="showModal('discard')">Show discard</button></li>
        <li><button>End Turn</button></li>
      </menu>
      <ol class="breach-area">
        <li>open</li>
        <li>closed</li>
        <li>closed</li>
        <li>closed</li>
      </ol>
    </section>
    <section class="player-area">
      <GameCard
        v-for="card in playerStore.cardsInHand"
        :key="card.id"
        :id="card.id"
        :type="card.type"
        :animatable="selectedType === null || selectedType === card.type"
        :selectable="selectedType === null || selectedType === card.type"
        :selected="selectedCards.includes(card.id)"
        @toggle="toggleCard"
      />
    </section>
    <ModalWrapper ref="modal" @closed="closeModal">
      <DiscardList v-if="isDiscardOpen" />
      <SupplyShop v-if="isSupplyOpen" />
    </ModalWrapper>
  </main>
</template>

<style scoped>
.game-view {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
}

section {
  padding: 1rem;
  display: flex;
}

.nemesis-area {
  align-items: center;
  gap: 1rem;
}

.nemesis-cards {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nemesis-cards:before {
  content: '';
  display: block;
  width: 1px;
  height: 100%;
  background-color: var(--color-text);
}

.control-area {
  justify-content: space-between;
  align-items: center;
}

.control-area > ul,
.control-area > menu,
.control-area > ol {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.breach-area {
  padding: 0;
  list-style: upper-roman;
}

.breach-area li {
  margin: 0 1rem;
}

.player-area {
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
