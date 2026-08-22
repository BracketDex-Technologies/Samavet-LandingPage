import { useEffect } from 'react'

declare global {
  interface Window {
    PromotionHub?: {
      init: (options: { product: string }) => void
    }
    PromotionHubQueue?: Array<{ product: string }>
    __epawatiPromotionHubLoaded?: boolean
  }
}

const promotionHubUrl =
  import.meta.env.VITE_PROMOTION_HUB_URL ||
  (import.meta.env.DEV ? 'http://localhost:3000' : 'https://promotion-hub-omega.vercel.app')

export default function PromotionHubWidget() {
  useEffect(() => {
    if (window.__epawatiPromotionHubLoaded) {
      return
    }

    window.__epawatiPromotionHubLoaded = true
    window.PromotionHubQueue = window.PromotionHubQueue || []

    const initOptions = { product: 'e-pawati' }

    if (window.PromotionHub?.init) {
      window.PromotionHub.init(initOptions)
      return
    }

    window.PromotionHubQueue.push(initOptions)

    if (document.querySelector('script[data-promotion-hub-widget="true"]')) {
      return
    }

    const script = document.createElement('script')
    script.src = `${promotionHubUrl.replace(/\/$/, '')}/widget.js`
    script.async = true
    script.dataset.promotionHubWidget = 'true'
    document.body.appendChild(script)
  }, [])

  return null
}
