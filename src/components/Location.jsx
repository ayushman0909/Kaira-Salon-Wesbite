import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";

const address =
  "Milap Market, J 45, Opposite Subhash Nagar, Block J, Beri Wala Bagh, Milap Nagar, New Delhi, Delhi 110027";

const mapQuery = encodeURIComponent(address);

function Location() {
  return (
    <section
      id="location"
      className="bg-[var(--surface)] px-5 py-24 md:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            09 — Visit us
          </span>

          <h2 className="max-w-4xl font-serif text-4xl leading-[1.05] tracking-tight text-[var(--foreground)] md:text-6xl lg:text-7xl">
            Find your way
            <span className="ml-2 italic">to Kaira.</span>
          </h2>
        </motion.div>

        {/* Main grid */}
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between border border-[var(--border)] bg-[var(--background)] p-7 md:p-10"
          >
            <div>
              {/* Address */}
              <div className="border-b border-[var(--border)] pb-8">
                <MapPin
                  size={21}
                  strokeWidth={1.5}
                  className="mb-6 text-[var(--accent)]"
                />

                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                  Address
                </span>

                <p className="mt-3 max-w-sm font-serif text-xl leading-relaxed text-[var(--foreground)]">
                  {address}
                </p>
              </div>

              {/* Hours */}
              <div className="border-b border-[var(--border)] py-8">
                <Clock3
                  size={21}
                  strokeWidth={1.5}
                  className="mb-6 text-[var(--accent)]"
                />

                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                  Opening hours
                </span>

                <div className="mt-4 space-y-2 text-sm text-[var(--foreground)]">
                  <div className="flex justify-between gap-4">
                    <span>Monday — Sunday</span>
                    <span className="text-[var(--muted)]">
                      10:00 AM — 8:00 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="py-8">
                <Phone
                  size={21}
                  strokeWidth={1.5}
                  className="mb-6 text-[var(--accent)]"
                />

                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                  Contact
                </span>

                <a
                  href="tel:+919999999999"
                  className="mt-3 block font-serif text-xl text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                >
                  +91 XXXXX XXXXX
                </a>
              </div>
            </div>

            {/* Directions */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border border-[var(--border)] px-5 py-4 text-sm text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
            >
              <span className="flex items-center gap-3">
                <Navigation size={16} />
                Get directions
              </span>

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative min-h-[420px] overflow-hidden border border-[var(--border)] md:min-h-[550px]"
          >
            <iframe
              title="Kaira Unisex Salon location"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.15]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Map label */}
            <div className="pointer-events-none absolute left-5 top-5 md:left-7 md:top-7">
              <div className="flex items-center gap-3 bg-[var(--surface)]/90 px-4 py-3 shadow-lg backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />

                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--foreground)]">
                  Kaira Unisex Salon
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 grid gap-px bg-[var(--border)] sm:grid-cols-3"
        >
          <div className="bg-[var(--surface)] p-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
              Location
            </span>

            <p className="mt-2 text-sm text-[var(--foreground)]">
              Opposite Subhash Nagar
            </p>
          </div>

          <div className="bg-[var(--surface)] p-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
              Area
            </span>

            <p className="mt-2 text-sm text-[var(--foreground)]">
              Milap Nagar, New Delhi
            </p>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between bg-[var(--surface)] p-6 transition-colors hover:bg-[var(--background)]"
          >
            <span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                Navigation
              </span>

              <span className="mt-2 block text-sm text-[var(--foreground)]">
                Open in Google Maps
              </span>
            </span>

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Location;