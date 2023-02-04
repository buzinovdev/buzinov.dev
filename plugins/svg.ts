import {defineNuxtPlugin} from "nuxt/app";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('svg', {
    mounted (image) {
      fetch(image.src)
        .then(res => res.text())
        .then(data => {
          const parser: DOMParser = new DOMParser();
          const svg: SVGSVGElement | null = parser.parseFromString(data, 'image/svg+xml').querySelector('svg')
          if (image.id) { // @ts-ignore
            svg.id = image.id;
          }
          if (image.className) { // @ts-ignore
            svg.classList = image.classList;
          }
          image.parentNode.replaceChild(svg, image);
        })
        .catch(error => console.error(error))
    }
  })
})