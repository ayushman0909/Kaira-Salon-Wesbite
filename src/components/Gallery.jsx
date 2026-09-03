import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { X } from "lucide-react";

import { db } from "../lib/firebase";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const galleryQuery = query(
      collection(db, "gallery"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      galleryQuery,
      (snapshot) => {
        const images = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setGallery(images);
      },
      (error) => {
        console.error("Gallery loading error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section
      id="gallery"
      className="bg-[var(--background)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            Our Work
          </p>

          <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Beauty in
            <span className="italic"> every detail.</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            Explore our latest transformations, hairstyles,
            makeup looks and beauty work.
          </p>
        </div>

        {/* EMPTY STATE */}
        {gallery.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--border)] px-6 py-20 text-center">
            <p className="font-serif text-2xl">
              Our gallery is coming soon.
            </p>

            <p className="mt-2 text-sm text-[var(--muted)]">
              Beautiful salon transformations will appear here.
            </p>
          </div>
        ) : (
          /* GALLERY */
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {gallery.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedImage(item)}
                className="group relative mb-5 block w-full overflow-hidden rounded-2xl text-left break-inside-avoid"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title || "Kaira Unisex Salon"}
                  loading={index < 3 ? "eager" : "lazy"}
                  className="w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="p-5 text-white">
                    <p className="text-sm font-medium">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-white/70">
                      View image
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close image"
          >
            <X size={22} />
          </button>

          <div
            className="relative max-h-[90vh] max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title || "Kaira Unisex Salon"}
              className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
            />

            {selectedImage.title && (
              <p className="mt-4 text-center font-serif text-xl text-white">
                {selectedImage.title}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;