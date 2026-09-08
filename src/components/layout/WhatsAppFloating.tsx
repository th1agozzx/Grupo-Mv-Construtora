import { waLink } from "@/config/empresa";

export function WhatsAppFloating() {
  return (
    <a
      href={waLink("Olá! Gostaria de solicitar um orçamento à MV Construtora.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Entrar em contato com a MV Construtora no WhatsApp"
      className="group fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-4 pr-5 font-bold text-white shadow-2xl shadow-black/30 ring-4 ring-[#25D366]/25 transition-all hover:scale-[1.03] hover:bg-[#20BA5A]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-8 w-8 shrink-0 fill-current"
      >
        <path d="M16.02 3.2a12.74 12.74 0 0 0-10.9 19.35L3.2 28.8l6.4-1.86A12.79 12.79 0 1 0 16.02 3.2Zm0 23.25c-2.04 0-4.04-.55-5.78-1.6l-.42-.25-3.8 1.1 1.13-3.68-.28-.45a10.4 10.4 0 1 1 9.15 4.88Zm5.7-7.8c-.31-.16-1.84-.91-2.12-1.01-.29-.1-.5-.16-.71.16-.21.31-.82 1-1 1.2-.18.21-.37.23-.68.08-1.84-.92-3.05-1.65-4.27-3.74-.32-.55.32-.51.92-1.69.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.53-.54-.71-.55h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.38 4.76.75.32 1.34.51 1.8.65.76.24 1.46.21 2 .13.61-.09 1.84-.75 2.1-1.47.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.36Z" />
      </svg>
      <span className="hidden text-sm sm:inline">Fale conosco pelo WhatsApp</span>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-40 blur-lg -z-10" />
    </a>
  );
}
