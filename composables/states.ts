// import { useWindowSize } from '@vueuse/core'
/**
 *
 * window width and heigh
 * change when window resize in /layout/base.vue component
 *
 */
/*
interface WindowSize {
  height: number;
  width: number;
}
*/

export const useWindowSize = () => useState('windowSize', () => {
  return {
    height: 0, // 0 originalt
    width: 0
  }
})

/**
 *
 * page scroll distance
 * change when page scroll in /layout/base.vue component
 *
 */
export const usePageScrollTop = () => useState<number>('pageScrollTop', () => 0)

/**
 *
 * home page layout mode
 *
 */
export const useHomepageLayoutMode = () => useState<'post' | 'folder'>('homepageLayoutMode', () => 'post')

/**
 *
 * article catalog
 *
 */
// export const useBlogSidebarFloat = () => useState<Boolean>('blogSidebarFloat', () => false)
// export const useNoteSidebarFloat = () => useState<Boolean>('noteSidebarFloat', () => true)
// export const useToggleBlogSidebarFloat = () => useState<Boolean>('toggleBlogSidebarFloat', () => false)
// export const useToggleNoteSidebarFloat = () => useState<Boolean>('toggleNoteSidebarFloat', () => true)
// export const useFloatBlogCatalogType = () => useState<'list' | 'tree'>('floatBlogCatalogType', () => 'list')
// export const useFloatNoteCatalogType = () => useState<'list' | 'tree'>('floatNoteCatalogType', () => 'tree')

/**
 *
 * image zoom
 *
 */
export interface ZoomImageType {
  src: string;
  alt?: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

export const useShowZoomImage = () => useState<'show' | 'hiding' | 'hidden'>('showZoomImage', () => 'hidden')
export const useZoomImage = () => useState<null | ZoomImageType>('zoomImage', () => null)
export const useCurrentZoomImage = () => useState<null | ZoomImageType>('currentZoomImage', () => null)
export const useZoomImageList = () => useState<ZoomImageType[]>('zoomImageList', () => [])

// file type mapping
export const useFileTypeMap = () => useState('fileTypeMap', () => {
  return {
    default: {
      iconName: 'bi:file-earmark-text' // bi:
    },
    markdown: {
      iconName: 'bi:markdown-fill' // bi:
    },
    json: {
      iconName: 'bi:filetype-json' // bi:
    },
    csv: {
      iconName: 'bi:filetype-csv' // bi:
    }
  }
})

/**
 *
 * Creating state to transfer search-input to url and handled on loading md-page
 * from SearchMode.vue to [...slug].vue
 * The value isn't saved in searchString but only used in SearchModal
 *
 */
// export const useSearchString = () => useState<String>('searchString', () => { return '' })
export const useSearchString = () => useState<String>('searchString', () => '')

/**
 * Added 2023
 */
declare global {
  interface Window {
    find: any
  }
}
