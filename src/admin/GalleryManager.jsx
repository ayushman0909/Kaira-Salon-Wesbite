import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../lib/firebase";

function GalleryManager() {
  const [gallery, setGallery] = useState([]);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // FETCH GALLERY
  // =========================

  useEffect(() => {
    const galleryQuery = query(
      collection(db, "gallery"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      galleryQuery,
      (snapshot) => {
        const galleryData = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setGallery(galleryData);
      },
      (error) => {
        console.error("Gallery fetch error:", error);
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, []);

  // =========================
  // UPLOAD IMAGE
  // =========================

  const handleUpload = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!file) {
      setError("Please select an image.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be smaller than 10MB.");
      return;
    }

    const cloudName =
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const uploadPreset =
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setError(
        "Cloudinary configuration is missing. Check your .env file."
      );

      return;
    }

    try {
      setUploading(true);

      // =========================
      // CLOUDINARY UPLOAD
      // =========================

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message ||
            "Cloudinary upload failed."
        );
      }

      // =========================
      // SAVE URL IN FIRESTORE
      // =========================

      await addDoc(collection(db, "gallery"), {
        title: title.trim() || "Kaira Unisex Salon",

        imageUrl: data.secure_url,

        publicId: data.public_id,

        format: data.format,

        width: data.width,

        height: data.height,

        createdAt: serverTimestamp(),
      });

      setFile(null);
      setTitle("");

      event.target.reset();

      setSuccess("Image uploaded successfully.");
    } catch (error) {
      console.error("Gallery upload error:", error);

      setError(
        error.message || "Something went wrong."
      );
    } finally {
      setUploading(false);
    }
  };

  // =========================
  // DELETE GALLERY RECORD
  // =========================

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this image?"
    );

    if (!confirmed) return;

    try {
      setDeleting(item.id);

      setError("");
      setSuccess("");

      await deleteDoc(
        doc(db, "gallery", item.id)
      );

      setSuccess("Gallery image removed.");
    } catch (error) {
      console.error("Delete error:", error);

      setError(
        error.message || "Something went wrong."
      );
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-8">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
          Management
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl">
          Gallery
        </h1>

        <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
          Upload and manage images displayed on
          the salon website.
        </p>
      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* =========================
          SUCCESS
      ========================= */}

      {success && (
        <div className="mb-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">
          {success}
        </div>
      )}

      {/* =========================
          UPLOAD FORM
      ========================= */}

      <form
        onSubmit={handleUpload}
        className="mb-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
      >
        <h2 className="font-serif text-2xl">
          Add Gallery Image
        </h2>

        <div className="mt-6 space-y-5">
          {/* TITLE */}

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em]">
              Image Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Example: Bridal Makeup"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)]"
            />
          </div>

          {/* FILE */}

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em]">
              Select Image
            </label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) =>
                setFile(
                  event.target.files?.[0] || null
                )
              }
              className="block w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm"
            />

            <p className="mt-2 text-xs text-[var(--muted)]">
              JPG, PNG or WebP • Maximum 10MB
            </p>
          </div>

          {/* PREVIEW */}

          {file && (
            <div className="overflow-hidden rounded-xl border border-[var(--border)]">
              <img
                src={URL.createObjectURL(file)}
                alt="Selected preview"
                className="h-56 w-full object-cover"
              />

              <div className="bg-[var(--background)] px-4 py-3">
                <p className="truncate text-xs text-[var(--muted)]">
                  {file.name}
                </p>
              </div>
            </div>
          )}

          {/* BUTTON */}

          <button
            type="submit"
            disabled={uploading}
            className="w-full rounded-xl bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {uploading
              ? "Uploading..."
              : "Upload Image"}
          </button>
        </div>
      </form>

      {/* =========================
          GALLERY
      ========================= */}

      <div>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl">
              Gallery Images
            </h2>

            <p className="mt-1 text-xs text-[var(--muted)]">
              Images currently stored in the gallery.
            </p>
          </div>

          <span className="rounded-full bg-[var(--background)] px-3 py-1 text-xs text-[var(--muted)]">
            {gallery.length}
          </span>
        </div>

        {gallery.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--border)] p-12 text-center">
            <p className="text-sm text-[var(--muted)]">
              No gallery images yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              >
                {/* IMAGE */}

                <div className="aspect-[4/3] overflow-hidden bg-[var(--background)]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                {/* INFO */}

                <div className="p-4">
                  <div className="mb-4">
                    <p className="truncate text-sm font-medium">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[11px] text-[var(--muted)]">
                      {item.format?.toUpperCase() ||
                        "IMAGE"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(item)
                    }
                    disabled={
                      deleting === item.id
                    }
                    className="w-full rounded-lg bg-red-500/10 px-3 py-2.5 text-xs font-medium text-red-500 transition hover:bg-red-500/20 disabled:opacity-50"
                  >
                    {deleting === item.id
                      ? "Removing..."
                      : "Remove Image"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GalleryManager;