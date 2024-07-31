<template>
  <div class="p-5">
    <a-typography>
      <a-typography-title class="text-center"> 大乐透选号指南 </a-typography-title>
    </a-typography>
    <a-row :gutter="24">
      <a-col :span="12" :xxl="12" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <div class="flex justify-between items-center">
          <a-typography-title :heading="4"> 数据展示 </a-typography-title>
          <a-upload
            :auto-upload="false"
            @change="onFileChange"
            accept=".txt"
            :show-file-list="false"
          >
            <template #upload-button>
              <a-button type="outline">
                <template #icon>
                  <icon-upload />
                </template>
                上传txt文件
              </a-button>
            </template>
          </a-upload>
        </div>
        <a-table :data="formatData" :pagination="{ 'show-page-size': true }">
          <template #columns>
            <a-table-column title="前区号码" data-index="frontBall">
              <template #cell="{ record }">
                <div class="flex">
                  <div
                    v-for="item in record.frontBall"
                    :key="item"
                    class="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500 text-white text-sm m-1"
                  >
                    {{ item }}
                  </div>
                </div>
              </template>
            </a-table-column>
            <a-table-column title="后区号码" data-index="backBall">
              <template #cell="{ record }">
                <div class="flex">
                  <div
                    v-for="item in record.backBall"
                    :key="item"
                    class="w-6 h-6 rounded-full flex items-center justify-center bg-yellow-500 text-purple-800 text-sm m-1"
                  >
                    {{ item }}
                  </div>
                </div>
              </template>
            </a-table-column>
            <a-table-column
              title="金额"
              data-index="cost"
              :sortable="{
                sortDirections: ['ascend', 'descend'],
                defaultSortOrder: 'descend'
              }"
            ></a-table-column>
            <a-table-column title="类型" data-index="type">
              <template #cell="{ record }">
                <a-tag
                  :color="
                    record.type === 'large' ? 'red' : record.type === 'small' ? 'gray' : 'orangered'
                  "
                >
                  {{ record.type === 'large' ? '大票' : record.type === 'small' ? '小票' : '中票' }}
                </a-tag>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-col>
      <a-col :span="12" :xxl="12" :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
        <a-typography-title :heading="4"> 频率统计表 </a-typography-title>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-card title="前区号码频率（从大到小排列）">
              <a-table :data="frequency.frontBall" :pagination="{ 'show-page-size': true }">
                <template #columns>
                  <a-table-column title="号码" data-index="number">
                    <template #cell="{ record }">
                      <div
                        class="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500 text-white text-sm"
                      >
                        {{ record.number }}
                      </div>
                    </template>
                  </a-table-column>
                  <a-table-column title="次数" data-index="count"> </a-table-column>
                </template>
              </a-table>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="后区号码频率（从大到小排列）">
              <a-table :data="frequency.backBall" :pagination="{ 'show-page-size': true }">
                <template #columns>
                  <a-table-column title="号码" data-index="number">
                    <template #cell="{ record }">
                      <div
                        class="w-6 h-6 rounded-full flex items-center justify-center bg-yellow-500 text-purple-800 text-sm"
                      >
                        {{ record.number }}
                      </div>
                    </template>
                  </a-table-column>
                  <a-table-column title="次数" data-index="count"> </a-table-column>
                </template>
              </a-table>
            </a-card>
          </a-col>
        </a-row>
        <a-typography-title :heading="4"> 号码分析 </a-typography-title>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-card title="前区号码">
              <table class="table" v-if="hotWarmCold.frontBall">
                <tbody>
                  <tr>
                    <td width="100">热号</td>
                    <td>
                      <div class="flex flex-wrap">
                        <div
                          v-for="item in hotWarmCold.frontBall.hot"
                          :key="item"
                          class="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500 text-white text-sm m-1"
                        >
                          {{ item }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>温号</td>
                    <td>
                      <div class="flex flex-wrap">
                        <div
                          v-for="item in hotWarmCold.frontBall.warm"
                          :key="item"
                          class="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500 text-white text-sm m-1"
                        >
                          {{ item }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>冷号</td>
                    <td>
                      <div class="flex flex-wrap">
                        <div
                          v-for="item in hotWarmCold.frontBall.cold"
                          :key="item"
                          class="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500 text-white text-sm m-1"
                        >
                          {{ item }}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="后区号码">
              <table class="table" v-if="hotWarmCold.backBall">
                <tbody>
                  <tr>
                    <td width="100">热号</td>
                    <td>
                      <div class="flex flex-wrap">
                        <div
                          v-for="item in hotWarmCold.backBall.hot"
                          :key="item"
                          class="w-6 h-6 rounded-full flex items-center justify-center bg-yellow-500 text-purple-800 text-sm m-1"
                        >
                          {{ item }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>温号</td>
                    <td>
                      <div class="flex flex-wrap">
                        <div
                          v-for="item in hotWarmCold.backBall.warm"
                          :key="item"
                          class="w-6 h-6 rounded-full flex items-center justify-center bg-yellow-500 text-purple-800 text-sm m-1"
                        >
                          {{ item }}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>冷号</td>
                    <td>
                      <div class="flex flex-wrap">
                        <div
                          v-for="item in hotWarmCold.backBall.cold"
                          :key="item"
                          class="w-6 h-6 rounded-full flex items-center justify-center bg-yellow-500 text-purple-800 text-sm m-1"
                        >
                          {{ item }}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </a-card>
          </a-col>
        </a-row>
        <a-typography-title :heading="4"> 购买方案 </a-typography-title>
        <a-table :columns="columns" :data="purchasePlan" :pagination="false">
          <template #number="{ record }">
            <a-input v-model="record.number" />
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { calculateDLTCost, calculateLotteryType, countOccurrences } from '@/utils'
import { IconUpload } from '@arco-design/web-vue/es/icon'
const formatData = ref([])
const frequency = ref({ frontBall: [], backBall: [] })
const hotWarmCold = ref({
  frontBall: {
    hot: [],
    warm: [],
    cold: []
  },
  backBall: {
    hot: [],
    warm: [],
    cold: []
  }
})

const columns = [
  {
    title: '彩票',
    dataIndex: 'name'
  },
  {
    title: '购买方案',
    dataIndex: 'plan'
  },
  {
    title: '号码',
    dataIndex: 'number',
    slotName: 'number'
  }
]

const purchasePlan = reactive([
  {
    key: '1',
    name: '票1',
    plan: '自选1注追加8倍',
    number: ''
  },
  {
    key: '2',
    name: '票2',
    plan: '自选一注+机选一注追加3倍',
    number: ''
  },
  {
    key: '3',
    name: '票3',
    plan: '2胆+4拖+1胆+2拖追加',
    number: ''
  },
  {
    key: '4',
    name: '票4',
    plan: '机选2注追加',
    number: ''
  }
])

// 格式化元素数据
const formatDataFromTxt = (txtData) => {
  const lines = txtData.trim().split('\n')
  const data = []

  // 每三行为一组数据
  for (let i = 0; i < lines.length; i += 3) {
    const frontBall = lines[i].trim().split(' ')
    const backBall = lines[i + 1].trim().split(' ')
    data.push({
      frontBall,
      backBall,
      id: uuidv4()
    })
  }

  // 计算金额和票类
  data.forEach((item) => {
    item.cost = calculateDLTCost(item.frontBall.length, item.backBall.length)
    item.type = calculateLotteryType(item.cost)
  })
  formatData.value = data
}

// 统计号码出现频率
const calculateFrequency = () => {
  const frequencyObject = {
    frontBall: [],
    backBall: []
  }

  // 初始化前区号码数组
  for (let i = 1; i <= 35; i++) {
    frequencyObject.frontBall.push({
      number: i < 10 ? `0${i}` : `${i}`,
      count: 0
    })
  }
  // 初始化后区号码数组
  for (let i = 1; i <= 12; i++) {
    frequencyObject.backBall.push({
      number: i < 10 ? `0${i}` : `${i}`,
      count: 0
    })
  }

  // 计算所有的前区号码
  const allfrontBall = formatData.value.reduce((acc, item) => {
    return acc.concat(item.frontBall)
  }, [])

  // 计算所有的后区号码
  const allbackBall = formatData.value.reduce((acc, item) => {
    return acc.concat(item.backBall)
  }, [])

  // 计算前区号码频率
  frequencyObject.frontBall.forEach((element) => {
    element.count = countOccurrences(allfrontBall, element.number)
  })

  // 计算后区号码频率
  frequencyObject.backBall.forEach((element) => {
    element.count = countOccurrences(allbackBall, element.number)
  })

  // 按照频率进行倒序
  frequencyObject.frontBall = frequencyObject.frontBall.sort((a, b) => b.count - a.count)
  frequencyObject.backBall = frequencyObject.backBall.sort((a, b) => b.count - a.count)

  frequency.value = frequencyObject
}

// 热号、温号、冷号分析
const numberAnalyse = () => {
  /**
   * 前区号码：热号取前top8,冷号取后top8,温号取中间部分
   * 后区号码：热号取前top4,冷号取后top4,温号取中间部分
   */
  const hotWarmColdObject = {
    frontBall: {
      hot: [],
      warm: [],
      cold: []
    },
    backBall: {
      hot: [],
      warm: [],
      cold: []
    }
  }

  // 统计热号、温号、冷号
  function classifyNumbers(sortedFrequency, hotCount, coldCount) {
    const hotNumbers = sortedFrequency.slice(0, hotCount).map((item) => item.number)
    const coldNumbers = sortedFrequency
      .slice(-coldCount)
      .sort((a, b) => a.count - b.count)
      .map((item) => item.number)
    const warmNumbers = sortedFrequency.slice(hotCount, -coldCount).map((item) => item.number)
    return { hot: hotNumbers, warm: warmNumbers, cold: coldNumbers }
  }
  hotWarmColdObject.frontBall = classifyNumbers(frequency.value.frontBall, 8, 8)
  hotWarmColdObject.backBall = classifyNumbers(frequency.value.backBall, 4, 4)
  hotWarmCold.value = hotWarmColdObject
}

// 读取文件
const onFileChange = (fileList) => {
  // 取最后一个文件
  const info = fileList[fileList.length - 1]
  const reader = new FileReader()
  reader.onload = (e) => {
    const data = e.target.result
    formatDataFromTxt(data)
    calculateFrequency()
    numberAnalyse()
  }
  reader.readAsText(info.file)
}
</script>
