<script setup lang="ts">
defineProps<{
  label: string
  days: number
  hours: number
  minutes: number
  seconds: number
  isArrived: boolean
  arrivedTexts: string[]
}>()

const formatNum = (num: number) => num.toString().padStart(2, '0')
</script>

<template>
  <div class="countdown-card">
    <div v-if="!isArrived">
      <h2>{{ label }}</h2>
      <div class="timer-box">
        <div class="time-unit">
          <span class="number">{{ formatNum(days) }}</span>
          <span class="label">天</span>
        </div>
        <div class="time-unit">
          <span class="number">{{ formatNum(hours) }}</span>
          <span class="label">时</span>
        </div>
        <div class="time-unit">
          <span class="number">{{ formatNum(minutes) }}</span>
          <span class="label">分</span>
        </div>
        <div class="time-unit">
          <span class="number">{{ formatNum(seconds) }}</span>
          <span class="label">秒</span>
        </div>
      </div>
    </div>
    <div v-else class="celebration">
      <template v-for="(text, index) in arrivedTexts" :key="index">
        <h1 v-if="index === 1" class="highlight">{{ text }}</h1>
        <h3 v-else-if="index > 1">{{ text }}</h3>
        <h2 v-else>{{ text }}</h2>
      </template>
    </div>
  </div>
</template>

<style scoped>
.countdown-card {
  background: var(--card-bg, rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition:
    transform 0.3s ease,
    background-color 0.5s ease;
}

.countdown-card:hover {
  transform: translateY(-3px);
}

h2 {
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
}

.timer-box {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--time-unit-bg, rgba(0, 0, 0, 0.2));
  padding: 0.8rem;
  border-radius: 8px;
  min-width: 70px;
  transition: background-color 0.5s ease;
}

.number {
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  color: #ffd700;
}

.label {
  font-size: 0.8rem;
  font-weight: bold;
  opacity: 0.8;
  margin-top: 0.3rem;
}

.celebration {
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.highlight {
  font-size: 3rem;
  color: #ffd700;
  margin: 0.5rem 0;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 600px) {
  .timer-box {
    gap: 0.5rem;
  }

  .time-unit {
    min-width: 55px;
    padding: 0.5rem;
  }

  .number {
    font-size: 1.4rem;
  }
}
</style>
