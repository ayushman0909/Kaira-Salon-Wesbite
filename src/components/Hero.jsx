import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

function Hero() {
  return (
    <section
      id="home"
      className="
        relative min-h-screen
        overflow-hidden
        bg-[var(--background)]
      "
    >
      {/* BACKGROUND IMAGE */}

      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2200&q=90"
          alt="Luxury salon interior"
          className="
            h-full w-full
            object-cover
          "
        />
      </motion.div>

      {/* OVERLAY */}

      <div
        className="
          absolute inset-0
          bg-black/45
          dark:bg-black/55
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative z-10
          mx-auto flex min-h-screen
          max-w-7xl
          flex-col justify-center
          px-5 pt-24
          lg:px-8
        "
      >

        {/* SMALL LABEL */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="
            mb-6 flex items-center gap-3
            text-xs uppercase
            tracking-[0.25em]
            text-white/75
          "
        >
          <span className="h-px w-8 bg-white/60" />

          Kaira Unisex Salon
        </motion.div>

        {/* HEADING */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            max-w-4xl
            font-serif
            text-5xl
            leading-[0.95]
            tracking-tight
            text-white
            sm:text-6xl
            md:text-7xl
            lg:text-[88px]
          "
        >
          Beauty,
          <br />

          <span className="italic font-light">
            refined.
          </span>

          <br />

          Confidence,
          <br />

          <span className="italic font-light">
            redefined.
          </span>
        </motion.h1>

        {/* BOTTOM CONTENT */}

        <div
          className="
            mt-10 flex
            flex-col gap-8
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <motion.p
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
            className="
              max-w-md
              text-sm leading-7
              text-white/70
            "
          >
            A modern beauty destination in New Delhi,
            where expert styling, beauty and self-care
            come together in one refined experience.
          </motion.p>

          <motion.a
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.95,
            }}
            href="#booking"
            className="
              group flex w-fit
              items-center gap-3
              rounded-full
              bg-white
              px-6 py-4
              text-sm font-medium
              text-black
              transition-all duration-300
              hover:gap-5
            "
          >
            Book Your Visit

            <ArrowUpRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </motion.a>

        </div>
      </div>

      {/* SCROLL INDICATOR */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.5,
          duration: 1,
        }}
        className="
          absolute bottom-8
          left-5 z-10
          flex items-center gap-3
          text-xs uppercase
          tracking-[0.2em]
          text-white/60
          lg:left-8
        "
      >
        <ArrowDown
          size={15}
          className="animate-bounce"
        />

        Scroll to explore
      </motion.div>

    </section>
  );
}

export default Hero;