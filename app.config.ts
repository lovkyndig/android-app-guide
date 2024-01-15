import pkg from './package.json'

export default defineAppConfig({
  nuxtIcon: {},
  myLayer: {
    meta: {
      name: 'Android App Guide',
      version: pkg.version,
      description: pkg.description,
      homepage: pkg.homepage
    },
    menu: {
      logo: 'Kyrie Eleison', // max 13 char
      btn: 'Google',
      mobil: 'Kyrie',
      restricted: /^\/(article\/restricted|article\/sequred|article\/login)\/.*/
    },
    author: pkg.author,
    email: 'jesu.broder@gmail.com',
    avatar: '/img/svg/avatar.svg',
    favicon: '/favicon.svg',
    assetTypes: [],
    giscus: {
      repo: 'lovkyndig/android-app-guide',
      repoId: 'R_kgDOK7vZ6w',
      category: 'Comments',
      categoryId: 'DIC_kwDOK7vZ684CcXg5',
      mapping: 'url',
      reactionsEnabled: '1',
      emitMetadata: '0',
      inputPosition: 'top',
      theme: 'noborder_dark',
      lang: 'en',
      loading: 'lazy'
    },
    privacy: {
      title: 'Privacy Policy following because this is an Android App.',
      description: 'The Privacy Policy, Sitemap and Rss for "Android App Guide". Privacy Policy is requrid for all Android Apps.',
      notification: 'Privacy police is normally not recuried, but because this app is published on Google Play - Google need it.'
    },
    about: {
      title: 'Information about this App, and going on Google Play Store',
      description: 'About the guidelines and description of the app "Android App Guide", and the creator - the laywer Kyrie Eleison.',
      notification: 'A laywer from Norway, Kyrie Eleison, has made this app! Like it? Follow him on GitHub!'
    },
    home: {
      title: 'How to Create an App and go on Google Play Store?',
      description: 'How to Create a Android App in less than a week, with no programming skills? Answer: Follow my guidelines and read this documentation:)',
      notification: 'How to create an android app in one week?'
    },
    slug: {
      description: 'Guidelines and documentation for "Android App Guide" with url: ',
      notification: 'Read the documentation with guidelines about how to create a Android App in one week.'
    },
    list: {
      tags: 'Guidelines in "Android App Guide" with tag: ',
      tags_all: 'All guidelines"',
      description: 'This is the list of content in the "Android App Guide" - with responsive design for mobile and laptop.',
      notification: 'Search and find what you are locking for - with the amazing search-functionality on this Android App.'
    },
    scrollSmooth: true,
    homePage: {
      showBlogPosts: true,
      postItemLimit: 20
    },
    privacyPage: true,
    articlePage: {
      showTime: true,
      outdated: {
        show: false,
        threshold: 30
      },
      showCatalog: false
    },
    search: {
      exclude: [
        '/',
        '/about/',
        '/privacy/',
        '/list/'
      ]
    }
  }
})
/*
ahrefs LENGTH guide:
Title: 50-60
Descriptionn 110-130
*/
