<template>
  <div class="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
    <div class="mb-2 flex items-center justify-between">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ model }}</span>
      <button
        class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        type="button"
        @click="$emit('remove')"
      >
        <i class="fas fa-times text-xs" />
      </button>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div>
        <input
          v-model.number="localTotalLimit"
          class="form-input w-full border-gray-300 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
          placeholder="0"
          step="0.01"
          type="number"
        />
        <span class="text-xs text-gray-500 dark:text-gray-400">总体限额 ($)</span>
      </div>
      <div>
        <input
          v-model.number="localDailyLimit"
          class="form-input w-full border-gray-300 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
          placeholder="0"
          step="0.01"
          type="number"
        />
        <span class="text-xs text-gray-500 dark:text-gray-400">每日限额 ($)</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  model: {
    type: String,
    required: true
  },
  totalLimit: {
    type: Number,
    default: 0
  },
  dailyLimit: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:totalLimit', 'update:dailyLimit', 'remove'])

// Local state
const localTotalLimit = ref(props.totalLimit)
const localDailyLimit = ref(props.dailyLimit)

// Watch props
watch(
  () => props.totalLimit,
  (val) => {
    localTotalLimit.value = val
  }
)
watch(
  () => props.dailyLimit,
  (val) => {
    localDailyLimit.value = val
  }
)

// Emit updates
watch(localTotalLimit, (val) => {
  const numVal = val || 0
  if (numVal !== props.totalLimit) {
    emit('update:totalLimit', numVal)
  }
})
watch(localDailyLimit, (val) => {
  const numVal = val || 0
  if (numVal !== props.dailyLimit) {
    emit('update:dailyLimit', numVal)
  }
})
</script>
