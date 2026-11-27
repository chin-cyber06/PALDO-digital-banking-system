import { onBeforeUnmount, onMounted } from "vue"

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

/** Dialog behaviour: focus on open, Tab loop, Esc to close, scroll lock, focus restore. */
export function useFocusTrap(elRef, { onEscape } = {}) {
  let previous = null
  let el = null

  const onKeydown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation()
      onEscape?.()
      return
    }
    if (event.key !== "Tab") return
    const nodes = el.querySelectorAll(FOCUSABLE)
    if (!nodes.length) return
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }

  onMounted(() => {
    el = elRef.value
    if (!el) return
    previous = document.activeElement
    document.body.style.overflow = "hidden"
    el.addEventListener("keydown", onKeydown)
    ;(el.querySelector("input,select,textarea") ?? el).focus()
  })
  onBeforeUnmount(() => {
    el?.removeEventListener("keydown", onKeydown)
    document.body.style.overflow = ""
    previous?.focus?.()
  })
}
