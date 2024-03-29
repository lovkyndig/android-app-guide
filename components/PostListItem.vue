<script setup lang="ts">

const props = defineProps<{
  article: any
}>()

const getCoverUrl = (relativeURL:string) => {
  if (relativeURL.startsWith('./')) {
    const articleFolderPathArr = props.article._path.split('/').slice(0, -1)
    const imagePathArr = relativeURL.split('/').slice(1)

    return [...articleFolderPathArr, ...imagePathArr].join('/')
  } else {
    return relativeURL
  }
}
</script>

<template>
  <div
    class="pb-4 relative z-10 space-y-2 rounded-xl"
  >
    <div
      v-if="props.article.cover"
      :style="`background-image: url('${getCoverUrl(props.article.cover)}')`"
      class="w-1/5 h-[90%] absolute bottom-0 right-0 -z-10 bg-contain bg-right-top bg-no-repeat"
    >
      <div
        class="absolute inset-0"
        style="background: linear-gradient(135deg, rgba(249,250,251,1) 40%, rgba(249,250,251,0.6) 80%, rgba(249,250,251,0.9) 100%)"
      />
    </div>
    <!-- h3 changed after lighthouse-test 26.10.2023 -->
    <NuxtLink :to="props.article._path" class="group block py-4 transition-colors duration-300 space-y-2">
      <h2 class="font-bold text-2xl text-gray-600 group-hover:text-blue-400 transition-colors duration-500">
        {{ props.article.title || "This Post Hasn't Title Yet" }}
      </h2>
      <p v-if="props.article.description" class="text-gray-600 short-description">
        {{ props.article.description }}
      </p>
    </NuxtLink>

    <div v-if="props.article.tags" class="grow flex flex-wrap gap-2">
      <NuxtLink
        v-for="tag in props.article.tags"
        :key="tag"
        :to="{ path: '/list', query: { tags: [tag] } }"
        class="px-2 py-1 text-xs text-blue-700 hover:text-blue-950 bg-purple-100 transition-colors duration-300 rounded"
      >
        #{{ tag }}
      </NuxtLink>
    </div>
    <NuxtLink
      v-if="props.article.series"
      :to="{ path: '/list', query: { series: props.article.series } }"
      class="w-fit px-2 py-1 flex justify-center items-center space-x-1 text-green-700 hover:text-green-950 bg-purple-100 transition-colors duration-300 rounded"
    >
      <Icon name="bi:collection" />
      <p class="text-xs">
        {{ props.article.series }}
      </p>
    </NuxtLink>
  </div>
</template>

<style scoped>
/* short-description here and in list.vue. Added 29.03.23 in Church Postil v1.0.0 beta 4. */
.short-description {
  max-lines: 3;
  overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   max-height: 5rem;      /* fallback (5rem, 5em or 68px) */
   -webkit-line-clamp: 3; /* number of lines to show */
   -webkit-box-orient: vertical;
}
</style>
