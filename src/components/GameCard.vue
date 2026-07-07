<script setup lang="ts">
import { ref, computed } from 'vue'

const { type } = defineProps<{
  type: 'crystal' | 'spark' | 'rageborne' | 'power' | 'minion'
}>()

const selected = ref(false)
const isSelectable = computed(() => type !== 'minion' && type !== 'rageborne')

function toggleSelected() {
  if (!isSelectable.value) return
  selected.value = !selected.value
}
</script>

<template>
  <article class="card" :class="{ selectable: isSelectable, selected }" @click="toggleSelected">
    <img :src="`img/${type}.jpg`" alt="" />
    <p v-if="type === 'rageborne'">Health: 70/70</p>
    <p v-if="type === 'minion'">Health: 5/5</p>
    <p v-if="type === 'power'">Triggers in: 2 turn(s)</p>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.25rem;
  transition: margin-bottom 0.2s;
}

.card.selectable:hover {
  cursor: pointer;
  margin-bottom: 1rem;
}

.card.selected {
  border: 1px solid white;
  border-radius: 0.5rem;
}

img {
  height: 17.5rem;
  width: 12.5rem;
  border-radius: 0.5rem;
}
</style>
