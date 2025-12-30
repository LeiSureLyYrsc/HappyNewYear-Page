<script setup lang="ts">
import { onMounted, computed, inject, watch } from 'vue'
import type { AppConfig } from '@/types/config'
import { useTime, calculateTimeLeft } from '@/composables/useTime'
import { useFireworks } from '@/composables/useFireworks'
import LoadingMask from './LoadingMask.vue'
import CountdownTimer from './CountdownTimer.vue'
import IconGithub from './icons/IconGithub.vue'

const { time_to_date, time_to_date_second, config, countdowns } = inject('appConfig') as AppConfig

// --- Logic ---
const { now } = useTime()
const { launchFireworks } = useFireworks()

// Timestamps
const newYearTimestamp = computed(() => new Date(countdowns.value.newYear.targetDate).getTime())
const chineseNewYearTimestamp = computed(() =>
  new Date(countdowns.value.chineseNewYear.targetDate).getTime(),
)

// Countdowns
const newYearCountdown = computed(() =>
  calculateTimeLeft(
    newYearTimestamp.value,
    now.value,
    time_to_date.value || time_to_date_second.value,
  ),
)
const chineseNewYearCountdown = computed(() =>
  calculateTimeLeft(chineseNewYearTimestamp.value, now.value, time_to_date_second.value),
)

// Current Background
const currentBackground = computed(() => {
  if (chineseNewYearCountdown.value.isArrived) {
    return config.value.backgrounds.chineseNewYear
  }
  if (newYearCountdown.value.isArrived) {
    return config.value.backgrounds.newYear
  }
  return config.value.backgrounds.default
})

// Celebration Check
let newYearCelebrated = false
let chineseNewYearCelebrated = false

const checkCelebration = () => {
  if (newYearCountdown.value.isArrived && !newYearCelebrated) {
    newYearCelebrated = true
    launchFireworks()
  }
  if (chineseNewYearCountdown.value.isArrived && !chineseNewYearCelebrated) {
    chineseNewYearCelebrated = true
    launchFireworks()
  }
}

// Watch for celebration
watch(now, checkCelebration)

// Page Meta
const updatePageMeta = () => {
  document.title = config.value.tabTitle
  const link: HTMLLinkElement =
    document.querySelector("link[rel*='icon']") || document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'shortcut icon'
  link.href = config.value.tabIcon

  const head = document.getElementsByTagName('head')[0]
  if (head) {
    head.appendChild(link)
  }
}

onMounted(() => {
  updatePageMeta()
})
</script>

<template>
  <LoadingMask
    :text="currentBackground.maskText || 'Loading...'"
    :color="currentBackground.maskColor || '#000'"
    :duration="config.maskDuration"
  />

  <div
    class="countdown-container"
    :style="{
      backgroundImage: currentBackground.image,
      color: currentBackground.textColor,
      '--card-bg': currentBackground.cardBackgroundColor,
      '--time-unit-bg': currentBackground.timeUnitBackgroundColor,
      ...currentBackground.style,
      transition: 'background-image 1s ease-in-out, color 0.5s ease-in-out',
    }"
  >
    <div class="overlay"></div>
    <div class="content">
      <h1 class="main-title" :style="currentBackground.titleStyle">
        {{ currentBackground.title }}
      </h1>

      <!-- New Year Countdown -->
      <CountdownTimer
        class="new-year"
        :label="countdowns.newYear.label"
        :days="newYearCountdown.days"
        :hours="newYearCountdown.hours"
        :minutes="newYearCountdown.minutes"
        :seconds="newYearCountdown.seconds"
        :is-arrived="newYearCountdown.isArrived"
        :arrived-texts="countdowns.newYear.arrivedTexts"
      />

      <!-- Chinese New Year Countdown -->
      <CountdownTimer
        class="chinese-new-year"
        :label="countdowns.chineseNewYear.label"
        :days="chineseNewYearCountdown.days"
        :hours="chineseNewYearCountdown.hours"
        :minutes="chineseNewYearCountdown.minutes"
        :seconds="chineseNewYearCountdown.seconds"
        :is-arrived="chineseNewYearCountdown.isArrived"
        :arrived-texts="countdowns.chineseNewYear.arrivedTexts"
      />
    </div>

    <!-- Github Link -->
    <a
      v-if="config.githubUrl"
      :href="config.githubUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="github-link"
      :style="{ color: currentBackground.textColor }"
      title="View on GitHub"
    >
      <IconGithub />
    </a>
  </div>
</template>

<style scoped>
.countdown-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  z-index: 0;
}

.content {
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  width: 100%;
  max-width: 700px;
}

.main-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  transition: all 0.5s ease;
}

.chinese-new-year {
  border: 1px solid rgba(255, 215, 0, 0.3);
}

@media (max-width: 600px) {
  .main-title {
    font-size: 1.8rem;
  }
}

.github-link {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.8;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Card Style */
  background: var(--card-bg, rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.github-link:hover {
  opacity: 1;
  transform: translateX(-50%) scale(1.1);
  background: var(--card-bg, rgba(255, 255, 255, 0.2));
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}
</style>
