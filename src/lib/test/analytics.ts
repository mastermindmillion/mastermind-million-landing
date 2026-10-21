declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

type EventName =
  | "test_start"
  | "question_answered"
  | "lead_captured"
  | "result_viewed"
  | "cta_click_agendar"
  | "booking_completed";

export function trackEvent(name: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", name, params);
  window.fbq?.("trackCustom", name, params);
}
