<script setup lang="ts">
import GameCard from '@/components/GameCard.vue'
</script>

<template>
  <main class="game-view">
    <section class="nemesis-area">
      <GameCard type="rageborne" />
      <div class="nemesis-cards">
        <GameCard type="minion" />
        <GameCard type="power" />
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
        <li><button>Show supply</button></li>
        <li><button>Show discard</button></li>
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
      <GameCard type="spark" v-for="(i, index) in 2" :key="index" />
      <GameCard type="crystal" v-for="(i, index) in 3" :key="index" />
    </section>
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
