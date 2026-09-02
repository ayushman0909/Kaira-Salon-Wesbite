import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import gallery1 from "../assets/images/Gallery/gallery1.jpg"
import gallery7 from "../assets/images/Gallery/gallery7.jpg"

function Transformation() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (event) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const clientX =
      event.touches?.[0]?.clientX ?? event.clientX;

    const newPosition =
      ((clientX - rect.left) / rect.width) * 100;

    setPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  return (
    <section
      id="transformation"
      className="overflow-hidden bg-[var(--surface)] px-5 py-24 md:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 grid gap-8 md:grid-cols-2 md:items-end"
        >
          <div>
            <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
              06 — Transformation
            </span>

            <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-[var(--foreground)] md:text-6xl lg:text-7xl">
              Before.
              <br />
              <span className="italic">After.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[var(--muted)] md:ml-auto">
            Every transformation begins with understanding your style,
            personality and what makes you feel confident.
          </p>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div
            ref={containerRef}
            onMouseMove={(event) => {
              if (event.buttons === 1) handleMove(event);
            }}
            onTouchMove={handleMove}
            className="relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden bg-neutral-200 md:aspect-[16/9]"
          >
            {/* AFTER IMAGE */}
            <img
              src={gallery1}
              alt="After transformation"
              draggable="false"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* BEFORE IMAGE */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${position}%` }}
            >
              <img
                src={gallery7}
                alt="Before transformation"
                draggable="false"
                className="absolute inset-0 h-full w-full max-w-none object-cover"
                style={{
                  width: containerRef.current
                    ? `${containerRef.current.offsetWidth}px`
                    : "100%",
                }}
              />
            </div>

            {/* Labels */}
            <div className="absolute left-5 top-5 md:left-8 md:top-8">
              <span className="bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
                Before
              </span>
            </div>

            <div className="absolute right-5 top-5 md:right-8 md:top-8">
              <span className="bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
                After
              </span>
            </div>

            {/* Slider Line */}
            <div
              className="absolute inset-y-0 z-10 w-px bg-white"
              style={{ left: `${position}%` }}
            >
              {/* Handle */}
              <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/40 text-white shadow-xl backdrop-blur-md">
                <ArrowLeftRight size={19} strokeWidth={1.5} />
              </div>
            </div>

            {/* Bottom hint */}
            <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 md:bottom-8">
              <span className="whitespace-nowrap bg-black/40 px-4 py-2 text-[9px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
                Drag to compare
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 grid gap-6 border-t border-[var(--border)] pt-7 sm:grid-cols-3"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
              Transformation
            </span>

            <p className="mt-2 font-serif text-xl text-[var(--foreground)]">
              A completely refreshed look
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
              Approach
            </span>

            <p className="mt-2 font-serif text-xl text-[var(--foreground)]">
              Personalised to you
            </p>
          </div>

          <div className="sm:text-right">
            <a
              href="#booking"
              className="inline-flex items-center border-b border-[var(--foreground)] pb-1 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Start your transformation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Transformation;