<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useOnline } from '@vueuse/core'

const appConfig = useAppConfig() as any
const online = useOnline().value

const time2load = ref(false)
const timer = setTimeout(() => {
  time2load.value = true
  clearTimeout(timer)
}, 1200)
</script>

<template>
  <span
    v-if="online"
    class="relative"
  >
    <Giscus
      :repo="appConfig.myLayer.giscus.repo"
      :repo-id="appConfig.myLayer.giscus.repoId"
      :category="appConfig.myLayer.giscus.category"
      :category-id="appConfig.myLayer.giscus.categoryId"
      :mapping="appConfig.myLayer.giscus.mapping"
      strict="0"
      :reactions-enabled="appConfig.myLayer.giscus.reactions"
      :emit-metadata="appConfig.myLayer.giscus.emitMetadata"
      :inut-position="appConfig.myLayer.giscus.inputPosition"
      :theme="appConfig.myLayer.giscus.theme"
      :lang="appConfig.myLayer.giscus.lang"
      crossorigin="anonymous"
      loading="lazy"
    />
    <CustomGiscusConfirmCookies v-if="time2load" />
  </span>
</template>

<style scooped>
/*
Inserted in MardownPost.vue - it was given the best style.

sources:
https://giscus.app/
https://github.com/giscus/giscus-component/tree/main
https://www.freecodecamp.org/news/github-discussions-as-chat-system/
https://github.com/settings/installations/43603183
https://github.com/giscus/giscus-component/blob/main/vue/src/App.vue
input-position="bottom"
*/
</style>
