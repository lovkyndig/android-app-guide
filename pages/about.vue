<script setup lang="ts">
const appConfig = useAppConfig()

// added in android-app-guide v1.0.0 beta 10 (30.09.2023)
const { $webnoti } = useNuxtApp() as any
onMounted(() => {
  $webnoti(`${appConfig.myLayer.about.notification}`)
})
</script>

<template>
  <div>
    <Head>
      <Title>About</Title>
    </Head>
    <NuxtLayout name="base">
      <ContentDoc class="about-me-content-container container mx-auto lg:max-w-4xl px-6 md:px-12 py-12">
        <template #not-found>
          <div class="about-me-content-container">
            <h1 style="display: none">
              {{ appConfig.myLayer.about.title }}
            </h1>
            <p class="max-w-prose mx-auto p-4 mt-8">
              This page wasn't visited before you was going <b>offline</b>!
              <br>
              After the page is cached (on visit) it will be available offline.
            </p>
          </div>
        </template>
      </ContentDoc>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
.about-me-content-container {
  h1, h2, h3, h4, h5, h6 {
    @apply py-8 sm:py-10 font-bold text-center;
  }

  p {
    @apply py-4 text-lg
  }
}
</style>
