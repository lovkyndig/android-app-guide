<script setup lang="ts">
import { useOnline } from '@vueuse/core'

const online = useOnline().value
const pagefindPath = '/_pagefind/pagefind.js'

const runtimeConfig = useRuntimeConfig()
const baseURL = runtimeConfig.app.baseURL

let pagefind: any

// if (!process.dev) {
try {
  pagefind = await import(/* @vite-ignore */pagefindPath)

  if (baseURL !== '/') {
    await pagefind.options({
      // eslint-disable-next-line
      baseURL: baseURL
    })
  }
} catch (error) {
  console.log(error)
}
// }

// search modal
const showSearchModal = useState<Boolean>('showSearchModal', () => false)

// stop body scroll when search modal show up
watch(showSearchModal, () => {
  if (!document?.body) { return }

  if (showSearchModal.value) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})

const searchInputDOM = ref<HTMLElement | null>(null) // get the input DOM

// when the search modal show up, auto focus the input box
onMounted(() => {
  watch(showSearchModal, () => {
    if (searchInputDOM.value && showSearchModal.value) {
      nextTick(() => {
        searchInputDOM.value?.focus()
      })
    }
  })
})

const focusInputHandler = () => {
  if (searchInputDOM.value) {
    searchInputDOM.value.focus()
  }
}

// listen input and then search
const searchState = ref<'waiting' | 'solved'>('waiting')
const inputText = ref<string>('')
const searchResults = ref<any[]>([])

watch(inputText, () => {
  searchState.value = 'waiting'
})

let timer: (null | ReturnType<typeof setTimeout>) = null
const appConfig = useAppConfig()

const debouncedSearch = (key: string, delay: number = 300) => {
  if (timer) {
    clearTimeout(timer)
  }

  if (key) {
    timer = setTimeout(async () => {
      if (pagefind) {
        try {
          const metaResults = await pagefind.search(key)

          timer = null
          if (metaResults.results.length > 0) {
            const resultsData = await Promise.all(metaResults.results.map((r: any) => r.data()));

            let filterResults = []

            if (appConfig?.myLayer?.search?.exclude && appConfig.myLayer.search.exclude.length > 0) {
              filterResults = resultsData.filter(item => !appConfig.myLayer.search.exclude.includes(item.url))
            }

            searchResults.value = filterResults
          } else {
            searchResults.value = []
          }
        } catch (error) {
          console.log(error)
        } finally {
          searchState.value = 'solved'
        }
      }
    }, delay)
  } else {
    timer = null
    searchResults.value = []
    inputText.value = ''
    searchState.value = 'solved'
  }
}

// added in android-app-guide v1.0.0 beta 7
const searchString = useState('searchString') // transfered to findNext.vue as queryparam
const { $checkSearchString } = useNuxtApp() as any

const inputHandler = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (pagefind) {
    pagefind.preload(target.value)
    debouncedSearch(target.value)
  }
  searchString.value = $checkSearchString(target.value) // added
}

const clearInputTextHandler = () => {
  inputText.value = ''
  searchResults.value = []
  searchState.value = 'waiting'
}
</script>

<template>
  <div class="expand-window p-4 fixed inset-0 z-[80] flex justify-center items-start">
    <div
      class="expand-window absolute inset-0 -z-10 flex justify-center items-center bg-black/5 backdrop-blur"
      @click="showSearchModal =false"
    />
    <div class="modal-container flex flex-col w-full max-w-prose">
      <div class="px-4 py-4 flex items-center gap-4 bg-white border-b rounded-t-lg">
        <button
          class="flex justify-center items-center"
          @click="focusInputHandler"
        >
          <Icon name="tabler:search" class="shrink-0 w-6 h-6 text-gray-600" />
        </button>

        <input
          v-if="online"
          ref="searchInputDOM"
          v-model="inputText"
          type="text"
          placeholder="Search Content"
          class="grow focus:outline-none"
          @input="inputHandler"
        >
        <!-- This button shows on big screens -->
        <button
          class="shrink-0 hidden sm:block px-2 py-1 text-xs text-gray-400 hover:text-gray-600 font-mono font-bold hover:bg-gray-50 border border-gray-400 hover:border-gray-600 rounded transition-colors duration-300"
          title="hide the search modal"
          @click="showSearchModal=false"
        >
          Esc
        </button>
        <!-- This button shows on mobile screens -->
        <button
          class="flex sm:hidden justify-center items-center text-gray-200 hover:text-gray-400 transition-colors"
          @click="clearInputTextHandler"
        >
          <Icon name="ion:close-circle" class="w-6 h-6" />
        </button>
      </div>

      <div class="modal-content-container px-4 overflow-y-auto bg-white rounded-b-lg">
        <div
          v-show="!inputText"
          class="p-16 flex flex-col justify-center items-center gap-y-8 text-purple-400"
        >
          <Icon name="fluent:text-t-28-filled" class="w-12 h-12" />
          <p v-if="online">Type to Search</p>
          <p v-else>Sorry! This search-functionality isn't offline-ready!</p>
        </div>
        <div
          v-show="inputText && searchState === 'waiting'"
          class="p-16 flex flex-col justify-center items-center gap-y-8 text-purple-400"
        >
          <Icon name="fluent:slide-search-28-filled" class="w-12 h-12 animate-bounce" />
          <p>Searching</p>
        </div>
        <ul
          v-show="searchResults.length>0"
          class="search-result p-4 space-y-2"
        >
          <li
            v-for="item in searchResults"
            :key="item.url"
            class="p-4 hover:text-white hover:bg-purple-500 rounded"
          >
            <!-- Changed 2023 by Kyrie Eleison (to get FindNext-component working) -->
            <!-- :to="item.url" -->
            <NuxtLink
              :to="`${item.url+'?searchparam='+searchString}`"
              aria-label="searchStringParam"
              @click.exact="showSearchModal=false"
            >
              <p class="font-bold">
                {{ item.meta.title }}
              </p>
              <p
                class="text-sm"
                v-html="item.excerpt"
              />
            </NuxtLink>
          </li>
        </ul>
        <div
          v-show="inputText && searchState === 'solved' && !(searchResults.length > 0)"
          class="p-16 flex flex-col justify-center items-center gap-y-8 text-red-400"
        >
          <Icon name="fluent:mail-inbox-dismiss-28-filled" class="w-12 h-12" />
          <p>Oops! There is no result.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.search-result {
  mark {
    @apply bg-yellow-300;
  }
}

.modal-container {
  max-height: 90dvh;
}

.modal-content-container::-webkit-scrollbar {
  display: none;
}
</style>
