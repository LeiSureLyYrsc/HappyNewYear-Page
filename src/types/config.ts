import type { Ref } from 'vue'

export interface BackgroundConfig {
  image: string
  title: string
  maskText?: string
  maskColor?: string
  textColor: string
  cardBackgroundColor: string
  timeUnitBackgroundColor: string
  titleStyle?: Record<string, string>
  style: Record<string, string>
}

export interface AppConfig {
  time_to_date: Ref<boolean>
  time_to_date_second: Ref<boolean>
  config: Ref<{
    backgrounds: {
      default: BackgroundConfig
      newYear: BackgroundConfig
      chineseNewYear: BackgroundConfig
    }
    tabTitle: string
    tabIcon: string
    maskDuration?: number
    githubUrl?: string
  }>
  countdowns: Ref<{
    newYear: { targetDate: string; label: string; arrivedTexts: string[] }
    chineseNewYear: { targetDate: string; label: string; arrivedTexts: string[] }
  }>
}
