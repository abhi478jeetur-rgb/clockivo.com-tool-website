import { useEffect, useRef } from "react"

export interface ShortcutOptions {
  disabled?: boolean
  preventDefault?: boolean
}

/**
 * Custom React Hook to register global keyboard shortcuts cleanly.
 * Automatically ignores execution when typing inside text inputs, textareas, etc.
 * 
 * @param keys A single key/code string or an array of strings (e.g., "Space", "KeyR", ["KeyR", "KeyL"])
 * @param callback Callback to execute when keys are pressed
 * @param options Options to disable or control default behavior
 */
export function useKeyboardShortcut(
  keys: string | string[],
  callback: (e: KeyboardEvent) => void,
  options: ShortcutOptions = {}
) {
  const { disabled = false, preventDefault = true } = options
  const callbackRef = useRef(callback)

  // Maintain reference to the latest callback to avoid rebinding listener
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (disabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when typing in inputs or form fields
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.getAttribute("contenteditable") === "true"
      ) {
        return
      }

      const pressedCode = e.code              // e.g., "Space", "KeyR", "Escape"
      const pressedKey = e.key.toLowerCase()  // e.g., " ", "r", "escape"
      const targetKeys = Array.isArray(keys) ? keys : [keys]

      const isMatch = targetKeys.some((targetKey) => {
        const normalizedTarget = targetKey.toLowerCase()
        return (
          pressedCode.toLowerCase() === normalizedTarget ||
          pressedKey === normalizedTarget ||
          // Handle cases where user supplies just "R" but e.code is "KeyR"
          (normalizedTarget.length === 1 && pressedCode.toLowerCase() === `key${normalizedTarget}`)
        );
      })

      if (isMatch) {
        if (preventDefault) {
          e.preventDefault()
        }
        callbackRef.current(e)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [keys, disabled, preventDefault])
}
