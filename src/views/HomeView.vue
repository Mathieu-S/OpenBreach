<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <h1>Open Breach</h1>
    <p>An open source implementation of Aeon's End</p>
  </header>

  <main>
    <nav>
      <RouterLink to="/game">Star a new game</RouterLink>
      <RouterLink to="/config">Configuration</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </main>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
}
</style>
