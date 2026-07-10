<script setup lang="ts">
import GameCard from '@/components/GameCard.vue'
</script>

<template>
  <div class="supply-shop">
    <p>Supply Shop</p>
    <div class="cards">
      <GameCard selectable type="spark" v-for="(i, index) in 9" :key="index" />
    </div>
  </div>
</template>

<style scoped>
.supply-shop {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
}
</style>
