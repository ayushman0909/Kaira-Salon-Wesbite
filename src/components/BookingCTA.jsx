import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  MessageCircle,
  Phone,
} from "lucide-react";

function BookingCTA() {
  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-[var(--foreground)] px-5 py-24 text-[var(--background)] md:px-10 lg:px-16 lg:py-32"
    >
      {/* Decorative circle */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[var(--background)]/10" />

      <div className="pointer-events-none absolute -bottom-48 -left-48 h-[32rem] w-[32rem] rounded-full border border-[var(--background)]/5" />

      <div className="relative mx-auto max-w-7xl">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            08 — Your appointment
          </span>
        </motion.div>

        {/* Main content */}
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="max-w-5xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Ready for your
              <span className="block italic text-[var(--accent)]">
                next look?
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="max-w-md text-sm leading-7 text-[var(--background)]/60">
              Whether it's a fresh haircut, a complete transformation or your
              special day, our team is ready to create something you'll love.
            </p>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="group mt-7 rounded-3xl inline-flex items-center gap-3 bg-[var(--accent)] px-6 py-4 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-1"
            >
              Book via WhatsApp

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </motion.div>
        </div>

        {/* Contact options */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid border-y border-[var(--background)]/10 sm:grid-cols-3"
        >
          {/* Appointment */}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="group border-b border-[var(--background)]/10 p-6 transition-colors hover:bg-[var(--background)]/5 sm:border-b-0 sm:border-r"
          >
            <CalendarDays
              size={20}
              strokeWidth={1.5}
              className="mb-8 text-[var(--accent)]"
            />

            <span className="block text-[10px] uppercase tracking-[0.25em] text-[var(--background)]/40">
              Appointment
            </span>

            <span className="mt-2 block font-serif text-xl">
              Book a visit
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="group border-b border-[var(--background)]/10 p-6 transition-colors hover:bg-[var(--background)]/5 sm:border-b-0 sm:border-r"
          >
            <MessageCircle
              size={20}
              strokeWidth={1.5}
              className="mb-8 text-[var(--accent)]"
            />

            <span className="block text-[10px] uppercase tracking-[0.25em] text-[var(--background)]/40">
              WhatsApp
            </span>

            <span className="mt-2 block font-serif text-xl">
              Chat with us
            </span>
          </a>

          {/* Phone */}
          <a
            href="tel:+919999999999"
            className="group p-6 transition-colors hover:bg-[var(--background)]/5"
          >
            <Phone
              size={20}
              strokeWidth={1.5}
              className="mb-8 text-[var(--accent)]"
            />

            <span className="block text-[10px] uppercase tracking-[0.25em] text-[var(--background)]/40">
              Call
            </span>

            <span className="mt-2 block font-serif text-xl">
              Speak to us
            </span>
          </a>
        </motion.div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex flex-col justify-between gap-4 text-xs text-[var(--background)]/40 sm:flex-row"
        >
          <span>Kaira Unisex Salon</span>

          <span>
            Milap Market, J 45, Opposite Subhash Nagar, New Delhi
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default BookingCTA;