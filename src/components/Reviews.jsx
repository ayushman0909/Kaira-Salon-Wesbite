import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    service: "Hair Styling",
    review:
      "Absolutely loved the experience at Kaira. The team understood exactly what I wanted and the final look was even better than I imagined.",
  },
  {
    id: 2,
    name: "Neha Kapoor",
    service: "Facial & Skin Care",
    review:
      "The salon has such a beautiful atmosphere. The staff was professional, friendly and very attentive throughout the appointment.",
  },
  {
    id: 3,
    name: "Riya Mehta",
    service: "Hair Colour",
    review:
      "Finally found a salon where they actually listen before starting. My hair colour came out gorgeous. Highly recommended!",
  },
];

function Reviews() {
  return (
    <section
      id="reviews"
      className="bg-[var(--background)] px-5 py-24 md:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
              07 — Reviews
            </span>

            <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-[var(--foreground)] md:text-6xl lg:text-7xl">
              Loved by
              <span className="ml-2 italic">our clients.</span>
            </h2>
          </div>

          <div className="md:text-right">
            <div className="flex items-center gap-2 md:justify-end">
              <span className="font-serif text-4xl text-[var(--foreground)]">
                5.0
              </span>

              <div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={13}
                      fill="currentColor"
                      className="text-[var(--accent)]"
                    />
                  ))}
                </div>

                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  Client experience
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews */}
        <div className="grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="group bg-[var(--background)] p-7 transition-colors duration-500 hover:bg-[var(--surface)] md:p-9"
            >
              {/* Number */}
              <div className="mb-12 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={12}
                      fill="currentColor"
                      className="text-[var(--accent)]"
                    />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="min-h-[180px] font-serif text-xl leading-relaxed text-[var(--foreground)] md:text-2xl">
                "{review.review}"
              </blockquote>

              {/* Client */}
              <div className="mt-8 border-t border-[var(--border)] pt-5">
                <p className="text-sm font-medium text-[var(--foreground)]">
                  {review.name}
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  {review.service}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-col justify-between gap-6 border-t border-[var(--border)] pt-7 sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-serif text-2xl text-[var(--foreground)]">
              Had a Kaira experience?
            </p>

            <p className="mt-1 text-sm text-[var(--muted)]">
              We'd love to hear about it.
            </p>
          </div>

          <a
            href="#booking"
            className="group inline-flex items-center gap-3 self-start text-sm font-medium text-[var(--foreground)]"
          >
            Share your experience

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white">
              <ArrowUpRight size={15} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Reviews;