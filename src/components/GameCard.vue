<script setup lang="ts">
import { CardType } from '@/types/card'
import { computed } from 'vue'

const { id, type, selectable, animatable, selected } = defineProps<{
  id: string
  type: CardType
  animatable?: boolean
  selectable?: boolean
  selected?: boolean
}>()

const emit = defineEmits<{
  toggle: [id: string, type: CardType]
}>()

const imgUrl = computed(() => {
  switch (type) {
    case CardType.Randomizer:
      return 'img/rageborne.jpg'
    case CardType.Gem:
      return 'img/crystal.jpg'
    case CardType.Minion:
      return 'img/minion.jpg'
    case CardType.Relic:
      return 'img/relic.jpg'
    case CardType.Spell:
      return 'img/spark.jpg'
    case CardType.Power:
      return 'img/power.jpg'
    default:
      return 'img/crystal.jpg'
  }
})

function toggleSelected() {
  if (!selectable) return
  emit('toggle', id, type)
}
</script>

<template>
  <article class="card" :class="{ selectable, animatable, selected }" @click="toggleSelected">
    <img :src="imgUrl" alt="" />
    <p v-if="type === CardType.Randomizer">Health: 70/70</p>
    <p v-if="type === CardType.Minion">Health: 5/5</p>
    <p v-if="type === CardType.Power">Triggers in: 2 turn(s)</p>
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
  border-radius: 0.5rem;
}

.card.selectable {
  box-shadow: 0 0 0.5rem white;

  &:hover {
    cursor: pointer;
  }
}

.card.animatable:hover {
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
