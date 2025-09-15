<template>
  <div class="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
    <label class="mb-2 flex cursor-pointer items-center">
      <input
        v-model="localEnabled"
        class="mr-2 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700"
        type="checkbox"
      />
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ platform }}</span>
    </label>
    <div class="grid grid-cols-2 gap-2" :class="{ 'opacity-50': !localEnabled }">
      <div>
        <input
          v-model.number="localTotalLimit"
          class="form-input w-full border-gray-300 text-sm disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
          :disabled="!localEnabled"
          placeholder="0"
          step="0.01"
          type="number"
        />
        <span class="text-xs text-gray-500 dark:text-gray-400">总体限额 ($)</span>
      </div>
      <div>
        <input
          v-model.number="localDailyLimit"
          class="form-input w-full border-gray-300 text-sm disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
          :disabled="!localEnabled"
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
  platform: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    default: false
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

const emit = defineEmits(['update:enabled', 'update:totalLimit', 'update:dailyLimit'])

// Local state
const localEnabled = ref(props.enabled)
const localTotalLimit = ref(props.totalLimit)
const localDailyLimit = ref(props.dailyLimit)

// Watch props
watch(
  () => props.enabled,
  (val) => {
    localEnabled.value = val
  }
)
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
watch(localEnabled, (val) => {
  if (val !== props.enabled) {
    emit('update:enabled', val)
  }
})
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
