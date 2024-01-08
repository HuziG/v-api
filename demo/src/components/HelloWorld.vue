<template>
  <div>
    <button @click="handleGet">GET</button>

    <div v-if="use_getJSON.loading.value">
      加载中
    </div>
    <div v-else :style="{
      marginTop: '10px'
    }">{{ use_getJSON.result.value || '暂无数据' }}</div>
  </div>
</template>

<script lang="ts" setup>
import { getJSON } from './api';

import vApi from '../../../package/index'

const use_getJSON = vApi<{}, { userId: number }>({
  fun: getJSON
});

const handleGet = () => {
  use_getJSON.load().then((res) => {
    console.log(res)
  })
};
</script>

<style lang="scss" scoped>

</style>
