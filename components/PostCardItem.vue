<script setup lang="ts">
const props = defineProps<{
  article: any;
  listLen: number
}>()

const getCoverUrl = (relativeURL:(string)) => {
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
    class="shrink-0 relative z-10 border border-purple-100 rounded-lg overflow-hidden"
    :class="props.listLen >= 2 ? 'w-5/6' : 'w-full'"
  >
    <div
      v-if="props.article.cover"
      :style="`background-image: url('${getCoverUrl(props.article.cover)}')`"
      class="w-2/3 h-2/3 absolute bottom-0 right-0 -z-10 bg-contain bg-right-bottom bg-no-repeat"
    >
      <div
        class="absolute inset-0"
        style="background: linear-gradient(135deg, rgba(249,250,251,1) 60%, rgba(249,250,251,0.8) 80%, rgba(249,250,251,0.6) 100%);"
      />
    </div>

    <NuxtLink
      :to="props.article._path"
      class="grow text-xl p-6 text-gray-600 hover:text-blue-400 transition-colors duration-300 space-y-4"
    >
      <!-- h3 changed to h2 and h-32 added to p-element -->
      <h2 class="font-bold">
        {{ props.article.title || "This Post Hasn't Title Yet" }}
      </h2>
      <p v-if="props.article.description" class="text-gray-600 text-sm h-32">
        {{ props.article.description }}
      </p>
    </NuxtLink>
    <div class="shrink-0 px-6 pb-6 flex justify-between items-start gap-2 my-footer">
      <div v-if="props.article.tags" class="scroll-container grow flex sm:flex-wrap gap-1 overflow-x-auto my-footer">
        <NuxtLink
          v-for="tag in props.article.tags"
          :key="tag"
          :to="{ path: '/list', query: { tags: [tag] } }"
          class="mt-2 shrink-0 px-2 py-1 text-xs text-blue-700 hover:text-blue-950 bg-purple-100 transition-colors duration-300 rounded"
        >
          #{{ tag }}
        </NuxtLink>
      </div>
      <NuxtLink
        v-if="props.article.series"
        :to="{ path: '/list', query: { series: props.article.series } }"
        title="Open up the folder series!"
        class="shrink-0 px-2 py-1 flex justify-center items-center text-green-700 hover:text-green-950 bg-purple-100 transition-colors duration-300 rounded"
      >
        <Icon name="bi:collection" />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-container::-webkit-scrollbar {
  display: none;
}

/*
29.09.2023 in android-app-guide v1.0.0 beta 9
Added in template abowe
height: 8rem added to p-element below
and
bg-slate-50 and opacity 80% added to two div below p-element
changed pb-6 to pb-1
*/
/* added 07.10.2023 to get better readability on the home-page
changed the colors 26.10.2023 to get rid of the errors about contrast in lighthouse
*/
p {
  height: 8rem
}
.my-footer {
  background-color: rgb(248 250 252);
  opacity: 1
}
#footer {
  padding-bottom: 0.25rem !important
}
</style>
