import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { serviceCategories } from "../data/services";

function Services() {
  const [activeCategory, setActiveCategory] = useState(
    serviceCategories[0].id
  );

  const activeService = serviceCategories.find(
    (category) => category.id === activeCategory
  );

  return (
    <section
      id="services"
      className="
        overflow-hidden
        bg-[var(--surface)]
        py-16
        sm:py-24
        md:py-28
        lg:py-40
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ================= HEADER ================= */}
        <div
          className="
            flex
            flex-col
            gap-7
            lg:flex-row
            lg:items-end
            lg:justify-between
            lg:gap-8
          "
        >
          <div className="w-full">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="
                flex
                items-center
                gap-2.5
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-[var(--accent)]
                sm:gap-3
                sm:text-xs
                sm:tracking-[0.25em]
              "
            >
              <span className="h-px w-6 bg-[var(--accent)] sm:w-8" />
              Our Services
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="
                mt-4
                max-w-3xl
                font-serif
                text-[2.35rem]
                leading-[1.02]
                tracking-tight
                sm:mt-5
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Everything you need
              <br />
              <span className="font-light italic text-[var(--accent)]">
                to feel your best.
              </span>
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            className="
              w-full
              max-w-md
              text-sm
              leading-6
              text-[var(--muted)]
              sm:text-base
              sm:leading-7
              lg:pb-1
            "
          >
            From hair transformations to skincare, nails and beauty
            treatments, discover a complete range of services for both women
            and men.
          </motion.p>
        </div>

        {/* ================= SERVICES ================= */}
        <div
          className="
            mt-12
            border-t
            border-black/10
            dark:border-white/10
            sm:mt-16
            lg:mt-24
          "
        >
          <div
            className="
              grid
              lg:grid-cols-[280px_1fr]
            "
          >
            {/* ================= CATEGORY NAV ================= */}
            <div
              className="
                min-w-0
                border-b
                border-black/10
                dark:border-white/10
                lg:border-b-0
                lg:border-r
                lg:pr-10
              "
            >
              <div
                className="
                  flex
                  w-full
                  overflow-x-auto
                  overscroll-x-contain
                  scrollbar-hide
                  lg:block
                  lg:overflow-visible
                "
              >
                {serviceCategories.map((category, index) => {
                  const isActive = category.id === activeCategory;

                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`
                        group
                        relative
                        shrink-0
                        px-1
                        py-4
                        pr-7
                        text-left
                        text-xs
                        transition-all
                        duration-300

                        sm:py-5
                        sm:pr-8
                        sm:text-sm

                        lg:block
                        lg:w-full
                        lg:px-0
                        lg:py-5

                        ${
                          isActive
                            ? "text-[var(--foreground)]"
                            : "text-[var(--muted)] hover:text-[var(--foreground)]"
                        }
                      `}
                    >
                      <span
                        className="
                          flex
                          items-center
                          justify-between
                          gap-3
                          whitespace-nowrap
                          lg:gap-4
                        "
                      >
                        <span>
                          <span className="text-[10px] sm:text-xs">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="ml-2 sm:ml-3">
                            {category.title}
                          </span>
                        </span>

                        {/* Desktop arrow */}
                        <ChevronDown
                          size={15}
                          className={`
                            hidden
                            transition-transform
                            duration-300
                            lg:block
                            ${
                              isActive
                                ? "-rotate-90 opacity-100"
                                : "opacity-0"
                            }
                          `}
                        />
                      </span>

                      {/* Active indicator */}
                      <span
                        className={`
                          absolute
                          bottom-0
                          left-0
                          h-px
                          bg-[var(--accent)]
                          transition-all
                          duration-500

                          lg:bottom-auto
                          lg:left-auto
                          lg:right-0
                          lg:top-1/2
                          lg:h-8
                          lg:w-px
                          lg:-translate-y-1/2

                          ${
                            isActive
                              ? "w-full lg:opacity-100"
                              : "w-0 lg:opacity-0"
                          }
                        `}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= SERVICE LIST ================= */}
            <div
              className="
                min-h-0
                w-full
                lg:min-h-[500px]
                lg:pl-14
              "
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="
                    py-8
                    sm:py-10
                    lg:py-14
                  "
                >
                  {/* ================= CATEGORY DESCRIPTION ================= */}
                  <div
                    className="
                      mb-7
                      flex
                      flex-col
                      gap-3
                      sm:mb-10
                      sm:flex-row
                      sm:items-end
                      sm:justify-between
                    "
                  >
                    <h3
                      className="
                        font-serif
                        text-2xl
                        leading-tight
                        sm:text-3xl
                        md:text-4xl
                      "
                    >
                      {activeService.title}
                    </h3>

                    <p
                      className="
                        w-full
                        max-w-sm
                        text-xs
                        leading-6
                        text-[var(--muted)]
                        sm:text-sm
                      "
                    >
                      {activeService.description}
                    </p>
                  </div>

                  {/* ================= SERVICE ITEMS ================= */}
                  <div
                    className="
                      border-t
                      border-black/10
                      dark:border-white/10
                    "
                  >
                    {activeService.services.map((service, index) => (
                      <motion.div
                        key={service.name}
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: index * 0.045,
                          duration: 0.35,
                        }}
                        className="
                          group
                          flex
                          min-w-0
                          items-center
                          justify-between
                          gap-3
                          border-b
                          border-black/10
                          py-4
                          dark:border-white/10
                          sm:gap-5
                          sm:py-6
                        "
                      >
                        {/* Service name */}
                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                            sm:gap-4
                          "
                        >
                          <span
                            className="
                              shrink-0
                              text-[9px]
                              text-[var(--muted)]
                              sm:text-[10px]
                            "
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span
                            className="
                              min-w-0
                              text-xs
                              leading-5
                              transition-transform
                              duration-300
                              group-hover:translate-x-1
                              sm:text-base
                            "
                          >
                            {service.name}
                          </span>
                        </div>

                        {/* Price */}
                        <span
                          className="
                            shrink-0
                            whitespace-nowrap
                            text-[10px]
                            text-[var(--accent)]
                            sm:text-sm
                          "
                        >
                          {service.price}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* ================= BOOK CTA ================= */}
                  <a
                    href="#booking"
                    className="
                      group
                      mt-7
                      inline-flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      bg-[var(--foreground)]
                      px-5
                      py-3.5
                      text-xs
                      font-medium
                      text-[var(--background)]
                      transition-all
                      duration-300
                      hover:gap-5

                      sm:mt-8
                      sm:w-auto
                      sm:px-6
                    "
                  >
                    Book a service

                    <ArrowUpRight
                      size={15}
                      className="
                        transition-transform
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                      "
                    />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;