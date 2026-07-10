<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'

import GameCard from '@/components/GameCard.vue'
import ModalWrapper from '@/components/ModalWrapper.vue'
import DiscardList from '@/components/DiscardList.vue'
import SupplyShop from '@/components/SupplyShop.vue'

type modalType = 'supply' | 'discard'
const modal = useTemplateRef<ComponentExposed<typeof ModalWrapper>>('modal')
const isSupplyOpen = ref(false)
const isDiscardOpen = ref(false)

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
      <GameCard type="rageborne" />
      <div class="nemesis-cards">
        <GameCard type="minion" />
        <GameCard type="power" selectable animatable />
      </div>
    </section>
    <section class="control-area">
      <ul class="information-area bulletless-list">
        <li>Player: SPG</li>
        <li>Player Number: 1</li>
        <li>Health: 10</li>
        <li>Charge: 2/5</li>
        <li>Gravehold: 30/30</li>
      </ul>
      <menu class="actions-area bulletless-list">
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
      <GameCard type="spark" selectable animatable v-for="(i, index) in 2" :key="index" />
      <GameCard type="crystal" selectable animatable v-for="(i, index) in 3" :key="index" />
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
