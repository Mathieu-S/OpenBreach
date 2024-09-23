<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { GameService } from '@/services'
import { NemesisCardType, PlayerCardType, type NemesisCard, type PlayerCard } from '@/models'

import GameCard from '@/components/GameCard.vue'

const cardAtk = ref<NemesisCard>()
const cardMinion = ref<NemesisCard>()
const cardPower = ref<NemesisCard>()

const cardGem = ref<PlayerCard>()
const cardRelic = ref<PlayerCard>()
const cardSpell = ref<PlayerCard>()

onMounted(() => {
  const gameService = new GameService()

  cardAtk.value = gameService.createNemesisCard({})
  cardMinion.value = gameService.createNemesisCard({})
  cardPower.value = gameService.createNemesisCard({})
  cardAtk.value.type = NemesisCardType.Attack
  cardMinion.value.type = NemesisCardType.Minion
  cardPower.value.type = NemesisCardType.Power

  cardGem.value = gameService.createPlayerCard({})
  cardRelic.value = gameService.createPlayerCard({})
  cardSpell.value = gameService.createPlayerCard({})
  cardGem.value.type = PlayerCardType.Gem
  cardRelic.value.type = PlayerCardType.Relic
  cardSpell.value.type = PlayerCardType.Spell
})
</script>

<template>
  <main class="game">
    <section class="nemesis-area">
      <GameCard v-if="cardAtk" :cardData="cardAtk" typeCard="nemesis" />
      <GameCard v-if="cardMinion" :cardData="cardMinion" typeCard="nemesis" />
      <GameCard v-if="cardPower" :cardData="cardPower" typeCard="nemesis" />
    </section>
    <section class="action-area">
      <button>End Turn</button>
    </section>
    <section class="player-area">
      <GameCard v-if="cardGem" :cardData="cardGem" typeCard="player" />
      <GameCard v-if="cardRelic" :cardData="cardRelic" typeCard="player" />
      <GameCard v-if="cardSpell" :cardData="cardSpell" typeCard="player" />
    </section>
  </main>
</template>

<style lang="css" scoped>
.game {
  height: 100%;
  display: grid;
  grid-template-rows: repeat(9, 1fr);
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.nemesis-area {
  grid-row: 1/5;
}

.action-area {
  grid-row: 5;
}

.player-area {
  grid-row: 6/10;
}
</style>
