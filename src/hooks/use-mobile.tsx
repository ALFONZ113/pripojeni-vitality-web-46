
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      if (!isReady) setIsReady(true)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    setIsReady(true)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // For compatibility with components that expect just a boolean
  if (typeof isMobile === 'boolean') {
    return {
      isMobile,
      isReady,
      // Add this to support backward compatibility with code that expects just a boolean
      ...(typeof isMobile === 'boolean' && { valueOf: () => isMobile })
    }
  }

  return {
    isMobile: false,
    isReady: false
  }
}
