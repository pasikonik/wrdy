export default {
  mounted(el: HTMLElement, { value }: { value: boolean }) {
    el.style.visibility = value ? 'visible' : 'hidden'
  },
  updated(el: HTMLElement, { value }: { value: boolean }) {
    el.style.visibility = value ? 'visible' : 'hidden'
  },
}
