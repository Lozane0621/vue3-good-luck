<template>
  <div class="content">
    <a-result class="mt-5" status="404" subtitle="Whoops, that page is gone.">
      <template #extra>
        <a-space>
          <a-button type="primary" @click="back">返回</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const back = () => {
  // warning： Go to the node that has the permission
  router.push({ path: '/' })
}
</script>

<style scoped></style>
