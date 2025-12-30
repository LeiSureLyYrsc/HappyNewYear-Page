import './assets/main.css'

import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 导入背景图片
import bgDefault from './assets/恭喜发财.webp'
import bgNewYear from './assets/恭喜发财-解冻一半.png'
import bgChineseNewYear from './assets/恭喜发财-解冻.webp'
import iconTab from './assets/恭喜发财图标.webp'

const app = createApp(App)

// --- 全局配置变量 (Moved from NewYearCountdown.vue) ---

// 1. 调试/测试变量：强制显示时间已到效果
const time_to_date = ref(false) // 第一阶段：元旦
const time_to_date_second = ref(false) // 第二阶段：春节

// 2. 页面基础配置
const config = ref({
  // 页面背景配置 (支持 CSS background 属性值，推荐使用 url() 引入图片)
  backgrounds: {
    // 默认背景 (倒计时进行中)
    default: {
      image: `url("${bgDefault}")`,
      title: '🎉 2026 倒计时 🎉',
      maskText: '🎉 2026 倒计时 🎉', // 遮罩文字
      maskColor: '#84b2d1ff', // 遮罩颜色
      textColor: 'black', // 字体颜色
      cardBackgroundColor: 'rgba(255, 255, 255, 0.1)', // 卡片背景 (控制模糊暗度)
      timeUnitBackgroundColor: 'rgba(0, 0, 0, 0.1)', // 时间单元背景
      titleStyle: {
        alignSelf: 'center', // 标题位置: flex-start(左), center(中), flex-end(右)
      },
      style: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      },
    },
    // 元旦背景 (2026元旦到达)
    newYear: {
      image: `url("${bgNewYear}")`,
      title: '🎉 新年快乐! 🎉',
      maskText: '🎉 新年快乐！ 🎉',
      maskColor: '#c07a7aff',
      textColor: 'black',
      cardBackgroundColor: 'rgba(250, 31, 31, 0.2)', // 红色调背景
      timeUnitBackgroundColor: 'rgba(204, 36, 36, 0.2)',
      titleStyle: {
        alignSelf: 'flex-end',
        marginLeft: '300px',
      },
      style: {
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      },
    },
    // 春节背景 (2026春节到达)
    chineseNewYear: {
      image: `url("${bgChineseNewYear}")`,
      title: '🎉 2026 新春快乐 🎉',
      maskText: '🧨 恭喜发财，万事如意！ 🧨',
      maskColor: '#d33030ff', // 深红色
      textColor: 'white',
      cardBackgroundColor: 'rgba(243, 9, 9, 0.2)', // 红色调背景
      timeUnitBackgroundColor: 'rgba(0, 0, 0, 0.1)',
      titleStyle: {
        alignSelf: 'center',
      },
      style: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      },
    },
  },
  // 浏览器标签页标题
  tabTitle: '2026 跨年倒计时',
  // 浏览器标签页图标 (可以是本地路径或 URL)
  tabIcon: iconTab,
  // 遮罩显示时间 (毫秒)，如果不设置则根据字幕长度自动计算
  maskDuration: 2000,
  // Github 仓库地址
  githubUrl: 'https://github.com/LeiSureLyYrsc/HappyNewYear-Page',
})

// 3. 倒计时配置
const countdowns = ref({
  newYear: {
    targetDate: '2026-01-01T00:00:00+08:00', // 目标时间
    label: '距离元旦还有', // 倒计时进行时的标题
    arrivedTexts: [
      // 时间到达后的文案 (数组每一项为一行)
      '再见，2025',
      '欢迎，2026',
      '新年快乐！Happy New Year!',
    ],
  },
  chineseNewYear: {
    targetDate: '2026-02-17T00:00:00+08:00',
    label: '距离春节还有',
    arrivedTexts: ['春节快乐!', '祝屏幕前的您万事如意，阖家幸福!'],
  },
})

// 提供给全局组件使用
app.provide('appConfig', {
  time_to_date,
  time_to_date_second,
  config,
  countdowns,
})

app.use(createPinia())
app.use(router)

app.mount('#app')
