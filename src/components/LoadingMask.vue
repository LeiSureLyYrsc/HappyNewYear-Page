<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps<{
  text: string
  color: string
  duration?: number
}>()

const isLoading = ref(true)
const showText = ref(false)
const charAnimDuration = ref('2.5s')

const maskTextChars = computed(() => Array.from(props.text))

watch(
  () => props.text,
  async () => {
    isLoading.value = true
    showText.value = false

    await nextTick()
    showText.value = true

    const staggerDelay = 50
    const bufferTime = 0 // 缩短缓冲时间，让遮罩消失更紧凑
    let totalDuration = 0
    let animDuration = 2500

    if (props.duration) {
      totalDuration = props.duration
      const totalStagger = (Math.max(maskTextChars.value.length, 1) - 1) * staggerDelay
      animDuration = Math.max(500, totalDuration - totalStagger - bufferTime)
    } else {
      totalDuration = maskTextChars.value.length * staggerDelay + animDuration + bufferTime
    }

    charAnimDuration.value = `${animDuration}ms`

    setTimeout(() => {
      isLoading.value = false
    }, totalDuration)
  },
  { immediate: true },
)
</script>

<template>
  <div class="loading-mask" :class="{ hidden: !isLoading }" :style="{ backgroundColor: color }">
    <div class="loading-content" v-if="showText">
      <span
        v-for="(char, index) in maskTextChars"
        :key="index"
        class="char"
        :style="{
          animationDelay: `${index * 0.05}s`,
          animationDuration: charAnimDuration,
        }"
      >
        {{ char === ' ' ? '&nbsp;' : char }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    opacity 0.4s ease,
    visibility 0.4s ease;
  opacity: 1;
  visibility: visible;
}

.loading-mask.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.loading-content {
  text-align: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
}

.char {
  display: inline-block;
  opacity: 0;
  animation-name: fadeInUpOut;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation-fill-mode: forwards;
}

@keyframes fadeInUpOut {
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(10px);
  }
  20% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
  80% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
    filter: blur(10px);
  }
}
</style>
