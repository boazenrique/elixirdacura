// Tipos para o Facebook Pixel
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: Record<string, string | number | boolean>) => void
  }
}

// Função para disparar eventos do Facebook Pixel
export function trackFBEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  try {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", eventName, params)
    }
  } catch {
    // Silently fail if pixel is unavailable or blocked
  }
}

// Eventos customizados para o funil
export function trackFunnelStep(step: string, percentComplete: number) {
  trackFBEvent("ViewContent", {
    content_name: `Funil - ${step}`,
    content_category: "Diagnóstico Intestinal",
    value: percentComplete,
    currency: "BRL",
  })
}

// Evento de iniciar checkout
export function trackInitiateCheckout(value: number) {
  trackFBEvent("InitiateCheckout", {
    content_name: "Protocolo Intestino Livre",
    content_category: "Diagnóstico Intestinal",
    value: value,
    currency: "BRL",
    num_items: 1,
  })
}

// Evento de lead (quando completa o diagnóstico)
export function trackLead() {
  trackFBEvent("Lead", {
    content_name: "Diagnóstico Completo",
    content_category: "Diagnóstico Intestinal",
  })
}
