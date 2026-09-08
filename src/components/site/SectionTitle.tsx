import { motion } from "framer-motion";

import { VIEWPORT_REVEAL } from "./animacoes";
import { useReveal } from "@/hooks/use-reduced-motion";

export function SectionTitle({
  eyebrow,
  title,
  light = false,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
  /** Nas páginas de serviço o título da seção de abertura é o H1 da página. */
  as?: "h1" | "h2";
}) {
  const reveal = useReveal();

  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_REVEAL}
      className="max-w-3xl"
    >
      <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-red-600">
        <span className="h-px w-8 bg-red-600" /> {eyebrow}
      </p>
      <Tag
        className={`text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl ${light ? "text-white" : "text-zinc-950"}`}
      >
        {title}
      </Tag>
    </motion.div>
  );
}
