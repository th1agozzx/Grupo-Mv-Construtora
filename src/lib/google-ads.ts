const WHATSAPP_CONVERSION_ID = "AW-18469093492/Rk0UCMD0u4gdEPSA4OZE";

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function trackWhatsAppConversion() {
  if (typeof window === "undefined") return;

  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag === "function") {
    gtag("event", "conversion", { send_to: WHATSAPP_CONVERSION_ID });
  }
}
