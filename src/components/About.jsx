import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function About() {
  return (
    <section
      id="about"
      className="
        overflow-hidden
        bg-[var(--background)]
        py-24
        sm:py-32
        lg:py-40
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          lg:px-8
        "
      >
        {/* TOP LABEL */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="
            flex items-center gap-3
            text-xs font-medium uppercase
            tracking-[0.25em]
            text-[var(--accent)]
          "
        >
          <span className="h-px w-8 bg-[var(--accent)]" />

          About Kaira
        </motion.div>

        {/* MAIN GRID */}

        <div
          className="
            mt-12
            grid
            gap-14
            lg:grid-cols-[1.1fr_0.9fr]
            lg:items-end
            lg:gap-20
          "
        >

          {/* LEFT — HEADING */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h2
              className="
                max-w-4xl
                font-serif
                text-4xl
                leading-[1.05]
                tracking-tight
                text-[var(--foreground)]
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              More than a salon.

              <br />

              <span className="italic font-light text-[var(--accent)]">
                Your beauty ritual.
              </span>
            </h2>
          </motion.div>

          {/* RIGHT — DESCRIPTION */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p
              className="
                text-base
                leading-8
                text-[var(--muted)]
                sm:text-lg
              "
            >
              At Kaira Unisex Salon, beauty is personal.
              From precision haircuts and transformative
              colour to skincare, nails, makeup and
              specialised beauty treatments, every service
              is designed around you.
            </p>

            <p
              className="
                mt-5
                text-base
                leading-8
                text-[var(--muted)]
                sm:text-lg
              "
            >
              Our approach combines modern techniques,
              attention to detail and a relaxed atmosphere
              to create an experience that leaves you
              looking your best and feeling even better.
            </p>

            <a
              href="#services"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-3
                border-b
                border-[var(--foreground)]/20
                pb-2
                text-sm
                font-medium
                text-[var(--foreground)]
                transition-all
                duration-300
                hover:gap-5
                hover:border-[var(--accent)]
              "
            >
              Explore our services

              <ArrowUpRight
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                "
              />
            </a>
          </motion.div>

        </div>

        {/* IMAGE AREA */}

        <div
          className="
            relative
            mt-20
            grid
            gap-5
            sm:mt-28
            sm:grid-cols-[0.75fr_1.25fr]
            sm:items-end
          "
        >

          {/* SMALL IMAGE */}

          <motion.div
            initial={{
              opacity: 0,
              y: 70,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              aspect-[4/5]
              overflow-hidden
              sm:mb-16
            "
          >
            <img
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=85"
              alt="Salon beauty treatment"
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-1000
                hover:scale-105
              "
            />
          </motion.div>

          {/* LARGE IMAGE */}

          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1.1,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              aspect-[4/3]
              overflow-hidden
            "
          >
            <img
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1600&q=90"
              alt="Professional hair styling"
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-1000
                hover:scale-105
              "
            />

            {/* FLOATING STAT */}

            <div
              className="
                absolute
                bottom-5
                left-5
                flex
                items-center
                gap-4
                bg-white/90
                px-5
                py-4
                backdrop-blur-md
                dark:bg-black/80
              "
            >
              <span
                className="
                  font-serif
                  text-3xl
                  text-[var(--accent)]
                "
              >
                01
              </span>

              <span
                className="
                  max-w-[130px]
                  text-[10px]
                  uppercase
                  leading-4
                  tracking-[0.15em]
                  text-neutral-600
                  dark:text-neutral-300
                "
              >
                One destination.
                Endless possibilities.
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default About;