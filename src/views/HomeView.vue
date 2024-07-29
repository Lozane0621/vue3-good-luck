<template>
  <main>
    <h3>Hello</h3>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Modal } from '@arco-design/web-vue'
import '@arco-design/web-vue/es/modal/style/css.js'
const router = useRouter()
onMounted(() => {
  const today = new Date()
  // 获取星期几（0-6，0代表星期天，1代表星期一，依此类推）
  const dayOfWeek = today.getDay()
  const dltDays = [1, 3, 6]
  const ssqDays = [0, 2, 4]
  if (dltDays.includes(dayOfWeek)) {
    router.push('/dlt')
  } else if (ssqDays.includes(dayOfWeek)) {
    router.push('/ssq')
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
