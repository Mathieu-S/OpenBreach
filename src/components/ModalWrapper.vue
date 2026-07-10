<script setup lang="ts">
import { useTemplateRef } from 'vue'

defineExpose({ open })
const emit = defineEmits<{
  closed: []
}>()

const modal = useTemplateRef<HTMLDialogElement>('modal')

function open() {
  modal.value?.showModal()
}

function close() {
  emit('closed')
  modal.value?.close()
}
</script>

<template>
  <dialog ref="modal" class="modal-wrapper" @keydown.esc="close">
    <slot></slot>
    <menu class="bulletless-list">
      <li><button @click="close">Close</button></li>
    </menu>
  </dialog>
</template>

<style scoped>
.modal-wrapper {
  color: var(--color-text);
  background-color: var(--color-background);
}

.modal-wrapper menu {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
