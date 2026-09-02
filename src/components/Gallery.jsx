import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  X,
} from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "Signature Hair",
    category: "Hair",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85",
    className: "md:col-span-5 md:row-span-2",
  },
  {
    id: 2,
    title: "Beauty Details",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
    className: "md:col-span-3",
  },
  {
    id: 3,
    title: "Salon Experience",
    category: "Experience",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=85",
    className: "md:col-span-4",
  },
  {
    id: 4,
    title: "Hair Transformation",
    category: "Hair",
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=85",
    className: "md:col-span-4",
  },
  {
    id: 5,
    title: "Modern Styling",
    category: "Styling",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=85",
    className: "md:col-span-3",
  },
  {
    id: 6,
    title: "Beauty Ritual",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85",
    className: "md:col-span-5",
  },
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const currentIndex = galleryItems.findIndex(
    (item) => item.id === selectedImage?.id
  );

  const showPrevious = () => {
    const previousIndex =
      currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;

    setSelectedImage(galleryItems[previousIndex]);
  };

  const showNext = () => {
    const nextIndex =
      currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;

    setSelectedImage(galleryItems[nextIndex]);
  };

  return (
    <>
      <section
        id="gallery"
        className="bg-[var(--background)] px-5 py-24 md:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end"
          >
            <div>
              <span className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-[var(--accent)]">
                04 — Gallery
              </span>

              <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-[var(--foreground)] md:text-6xl lg:text-7xl">
                Beauty in
                <span className="ml-2 italic">every detail.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
              A glimpse into the Kaira experience — from precision hair
              transformations to the little details that complete your look.
            </p>
          </motion.div>

          {/* Gallery */}
          <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-12 md:auto-rows-[180px]">
            {galleryItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setSelectedImage(item)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className={`group relative overflow-hidden rounded-sm text-left ${
                  item.className
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/40" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="mb-1 block text-[10px] uppercase tracking-[0.25em] text-white/70">
                        {item.category}
                      </span>

                      <h3 className="font-serif text-xl text-white">
                        {item.title}
                      </h3>
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white">
                      <Maximize2 size={15} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-10 flex items-center justify-between border-t border-[var(--border)] pt-6"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
              Kaira Unisex Salon
            </span>

            <a
              href="#booking"
              className="group flex items-center gap-3 text-sm font-medium text-[var(--foreground)]"
            >
              Create your look
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] transition-transform duration-300 group-hover:rotate-45">
                <ArrowRight size={14} />
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
              aria-label="Close gallery"
            >
              <X size={20} />
            </button>

            {/* Previous */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrevious();
              }}
              className="absolute left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 md:left-8"
              aria-label="Previous image"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative max-h-[85vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[80vh] max-w-full object-contain"
              />

              <div className="mt-4 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                  {selectedImage.category}
                </span>

                <h3 className="mt-1 font-serif text-2xl text-white">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 md:right-8"
              aria-label="Next image"
            >
              <ArrowRight size={18} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-white/50">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(galleryItems.length).padStart(2, "0")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Gallery;