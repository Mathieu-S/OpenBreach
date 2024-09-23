<script setup lang="ts">
import { type PlayerCard, type NemesisCard, NemesisCardType, PlayerCardType } from '@/models'
import { computed } from 'vue'

const props = defineProps<{
  cardData: PlayerCard | NemesisCard
  typeCard: string
}>()

const cardStyle = computed(() => {
  if (props.typeCard === 'nemesis') {
    switch (props.cardData.type) {
      case NemesisCardType.Attack:
        return 'card nemesis attack'
      case NemesisCardType.Minion:
        return 'card nemesis minion'
      case NemesisCardType.Power:
        return 'card nemesis power'
      default:
        return 'card'
    }
  } else {
    switch (props.cardData.type) {
      case PlayerCardType.Gem:
        return 'card player gem'
      case PlayerCardType.Relic:
        return 'card player relic'
      case PlayerCardType.Spell:
        return 'card player spell'
      default:
        return 'card'
    }
  }
})
</script>

<template>
  <article :class="cardStyle">
    <div>{{ props.cardData.name }}</div>
    <p>{{ props.cardData.effectText }}</p>
  </article>
</template>

<style scoped>
.card {
  border: 1px white solid;
  height: 20rem;
  width: 15rem;
}

.nemesis:hover {
  box-shadow: 0px 0px 10px 1px red;
}

.player:hover {
  box-shadow: 0px 0px 10px 1px white;
}

.nemesis.attack {
  border-color: rgb(195, 0, 255);
}

.nemesis.minion {
  border-color: rgb(0, 140, 255);
}

.nemesis.power {
  border-color: rgb(219, 197, 0);
}

.player.gem {
  border-color: rgb(195, 0, 255);
}

.player.relic {
  border-color: rgb(0, 140, 255);
}

.player.spell {
  border-color: rgb(219, 197, 0);
}
</style>
