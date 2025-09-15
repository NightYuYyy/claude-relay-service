<template>
  <div class="rounded-lg border border-purple-200 bg-purple-50 p-3 dark:border-purple-700 dark:bg-purple-900/20">
    <div class="mb-3 flex items-center gap-2">
      <div class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-purple-500">
        <i class="fas fa-layer-group text-xs text-white" />
      </div>
      <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200">
        渠道费用限制 (可选)
      </h4>
    </div>

    <div class="space-y-3">
      <!-- 平台级限制 -->
      <div>
        <h5 class="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">按平台限制</h5>
        <div class="space-y-2">
          <!-- Claude 平台 -->
          <PlatformLimitItem
            v-model:enabled="localPlatformLimits.claude.enabled"
            v-model:total-limit="localPlatformLimits.claude.totalLimit"
            v-model:daily-limit="localPlatformLimits.claude.dailyLimit"
            platform="Claude"
          />

          <!-- OpenAI 平台 -->
          <PlatformLimitItem
            v-model:enabled="localPlatformLimits.openai.enabled"
            v-model:total-limit="localPlatformLimits.openai.totalLimit"
            v-model:daily-limit="localPlatformLimits.openai.dailyLimit"
            platform="OpenAI"
          />

          <!-- Gemini 平台 -->
          <PlatformLimitItem
            v-model:enabled="localPlatformLimits.gemini.enabled"
            v-model:total-limit="localPlatformLimits.gemini.totalLimit"
            v-model:daily-limit="localPlatformLimits.gemini.dailyLimit"
            platform="Gemini"
          />
        </div>
      </div>

      <!-- 模型级限制 -->
      <div>
        <h5 class="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">按模型限制</h5>
        <div class="space-y-2">
          <!-- 已添加的模型限制 -->
          <ModelLimitItem
            v-for="(config, model) in localModelLimits"
            :key="model"
            v-model:total-limit="config.totalLimit"
            v-model:daily-limit="config.dailyLimit"
            :model="model"
            @remove="removeModelLimit(model)"
          />

          <!-- 添加模型限制 -->
          <div class="flex gap-2">
            <select
              v-model="newModelName"
              class="form-select flex-1 border-gray-300 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="">选择模型...</option>
              <optgroup label="Claude">
                <option value="claude-3-opus">Claude 3 Opus</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                <option value="claude-3-haiku">Claude 3 Haiku</option>
                <option value="claude-3.5-sonnet">Claude 3.5 Sonnet</option>
                <option value="claude-3.5-haiku">Claude 3.5 Haiku</option>
              </optgroup>
              <optgroup label="OpenAI">
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-5">GPT-5</option>
                <option value="codex">Codex</option>
              </optgroup>
              <optgroup label="Gemini">
                <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
              </optgroup>
            </select>
            <button
              class="rounded bg-purple-500 px-3 py-1 text-sm font-medium text-white hover:bg-purple-600 disabled:opacity-50 dark:bg-purple-600 dark:hover:bg-purple-700"
              type="button"
              :disabled="!newModelName || localModelLimits[newModelName]"
              @click="addModelLimit"
            >
              添加
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import PlatformLimitItem from './PlatformLimitItem.vue'
import ModelLimitItem from './ModelLimitItem.vue'

// Props
const props = defineProps({
  platformLimits: {
    type: Object,
    default: () => ({
      claude: { enabled: false, totalLimit: 0, dailyLimit: 0 },
      openai: { enabled: false, totalLimit: 0, dailyLimit: 0 },
      gemini: { enabled: false, totalLimit: 0, dailyLimit: 0 }
    })
  },
  modelLimits: {
    type: Object,
    default: () => ({})
  }
})

// Emits
const emit = defineEmits(['update:platformLimits', 'update:modelLimits'])

// Local state
const localPlatformLimits = ref({ ...props.platformLimits })
const localModelLimits = ref({ ...props.modelLimits })
const newModelName = ref('')

// Watch for prop changes
watch(() => props.platformLimits, (newVal) => {
  localPlatformLimits.value = { ...newVal }
}, { deep: true })

watch(() => props.modelLimits, (newVal) => {
  localModelLimits.value = { ...newVal }
}, { deep: true })

// Watch for local changes and emit
watch(localPlatformLimits, (newVal) => {
  emit('update:platformLimits', newVal)
}, { deep: true })

watch(localModelLimits, (newVal) => {
  emit('update:modelLimits', newVal)
}, { deep: true })

// Methods
const addModelLimit = () => {
  if (!newModelName.value || localModelLimits.value[newModelName.value]) {
    return
  }

  localModelLimits.value[newModelName.value] = {
    enabled: true,
    totalLimit: 0,
    dailyLimit: 0
  }
  newModelName.value = ''
}

const removeModelLimit = (model) => {
  delete localModelLimits.value[model]
}
</script>