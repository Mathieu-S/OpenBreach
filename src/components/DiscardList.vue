<script setup lang="ts">
import { CardType } from '@/types/card'
import GameCard from '@/components/GameCard.vue'
</script>

<template>
  <div class="discard-list">
    <p>Cards currently in the discard pile:</p>
    <div class="cards">
      <GameCard
        :id="`spark-${index}`"
        :type="CardType.Gem"
        unselectable
        v-for="(i, index) in 7"
        :key="index"
      />
    </div>
  </div>
</template>

<style scoped>
.discard-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 70dvw;
}

.cards {
  width: 100%;
  overflow-x: auto;
  display: flex;
  gap: 1rem;
}
</style>
