<template>
  <div class="home">
    <RotatingGlobe></RotatingGlobe>
    <div class="fixed bottom-10">
      <ul class="menu bg-base-200 menu-horizontal rounded-box">
        <li @click="handleMenuClick('ocr')">
          <a>
            <IconScan />
            OCR识别
          </a>
        </li>
        <li @click="handleMenuClick('ssq')">
          <a>
            <IconHeart />
            双色球
            <span class="badge badge-sm badge-warning" v-show="todayLottery==='ssq'">今日</span>
          </a>
        </li>
        <li @click="handleMenuClick('dlt')">
          <a>
            <IconHeart />
            大乐透
            <span class="badge badge-sm badge-warning" v-show="todayLottery==='dlt'">今日</span>
          </a>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script setup>
import RotatingGlobe from '@/components/RotatingGlobe.vue'
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { IconHeart,IconScan } from '@arco-design/web-vue/es/icon'
import { Modal } from '@arco-design/web-vue'
import '@arco-design/web-vue/es/modal/style/css.js'

const router = useRouter()

const todayLottery = ref(null)

const handleMenuClick = (path) => {
  router.push(path)
}

onMounted(() => {
  const today = new Date()
  // 获取星期几（0-6，0代表星期天，1代表星期一，依此类推）
  const dayOfWeek = today.getDay()
  const dltDays = [1, 3, 6]
  const ssqDays = [0, 2, 4]
  if (dltDays.includes(dayOfWeek)) {
    todayLottery.value = 'dlt'
  } else if (ssqDays.includes(dayOfWeek)) {
    todayLottery.value = 'ssq'
  } else {
    Modal.info({
      title: '休息提示',
      content: '今天休息，明天再来吧!',
      hideCancel: true,
      alignCenter: true
    })
  }
})
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
