import { ref, onMounted, onUnmounted } from 'vue'

export function useTime() {
  const now = ref(Date.now())
  const timer = ref<number | null>(null)

  const startTimer = () => {
    timer.value = window.setInterval(() => {
      now.value = Date.now()
    }, 1000)
  }

  const stopTimer = () => {
    if (timer.value) clearInterval(timer.value)
  }

  onMounted(startTimer)
  onUnmounted(stopTimer)

  return {
    now,
  }
}

export function calculateTimeLeft(target: number, now: number, forceArrive: boolean = false) {
  if (forceArrive) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isArrived: true,
    }
  }

  const difference = target - now

  if (difference <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isArrived: true,
    }
  }

  return {
    total: difference,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isArrived: false,
  }
}
