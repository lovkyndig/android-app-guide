<script setup lang="ts">
const searchString = useState('searchString')

console.log('<FindNext is started')

const findNext = () => {
  const divElement = document.querySelector('#findNext')
  const text = searchString.value
  if (window.find) { // Firefox, Google Chrome, Safari
    const found = window.find(text)
    if (!found) {
      divElement.classList.add('hidden') // no more to search on this page.
    }
  } else {
    console.log('Your browser does not support this example!')
  }
}

onMounted(() => {
  if (document) {
    if (window.find) { // Firefox, Google Chrome, Safari
      const findBtn = document.querySelector('#findNextHeader')
      if (findBtn) { // if removes the error from Edge
        const timer = setTimeout(() => {
          findBtn.dispatchEvent(new Event('click')) // Fire event
          clearTimeout(timer)
        }, 800)
      }
    }
  }
})

/**
 * source:
 * http://help.dottoro.com/ljkjvqqo.php
 */
// eslint-disable-next-line
const tooltip = 'Click to find next search-string!'

const inputText = ref<string>('')

const inputHandler = (event: Event) => {
  // eslint-disable-next-line
  const target = event.target as HTMLInputElement
  // Not using this. The inputvalue is saved in "searchInput", defined below as ref.
}

/**
 * Draggable search-box
 * Source:
 * https://www.w3schools.com/howto/howto_js_draggable.asp
 */
onMounted(() => {
  dragElement(document.getElementById('findNext'))
  function dragElement (elmnt) {
    let pos1 = 0
    let pos2 = 0
    let pos3 = 0
    let pos4 = 0
    if (document.getElementById(elmnt.id + 'Header')) {
      // if present, the header is where you move the DIV from:
      // @ts-ignore
      document.getElementById(elmnt.id + 'Header').onmousedown = dragMouseDown
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown
    }

    function dragMouseDown (e) {
      e = e || window.event
      e.preventDefault()
      // get the mouse cursor position at startup:
      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = closeDragElement
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag
    }

    function elementDrag (e) {
      e = e || window.event
      e.preventDefault()
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
      elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
    }

    function closeDragElement () {
      // stop moving when mouse button is released:
      document.onmouseup = null
      document.onmousemove = null
    }
  }
})

/*
Remember to insert the following tag in SearchModal.vue (line 208)
<NuxtLink
  :to="`${item.url+'?searchparam='+searchString}`"
  aria-label="searchStringParam"
  @click.exact="showSearchModal=false"
/>
*/
</script>

<template>
  <div id="findNext" class="text-purple-600">
    <Icon
      id="findNextImg"
      name="icon-park:find"
      class="w-10 h-10"
      alt="img"
      :font-controlled="false"
      @click="findNext()"
    />
    <input
      id="findIndput"
      ref="searchInput"
      v-model="inputText"
      type="text"
      size="12"
      @input="inputHandler"
    >
  </div>
</template>

<style scoped>
* {
  position: fixed;
  background: transparent;
}
#findNext {
  height: 60px;
  width: 60px;
  z-index: 51;
}

#findNextImg {
  cursor: move
}

@media only screen and (max-width: 640px) {
  #findNext {
    top: 2px;
    right: 1px
  }
}
@media only screen and (min-width: 640px) {
  #findNext {
    top: 20px;
    right: 60px
  }
}

@media only screen and (max-width: 767px) {
  #findIndput {
    visibility: hidden
  }
}
@media only screen and (min-width: 767px) {
  #findIndput {
    visibility: hidden
  }
}
</style>
