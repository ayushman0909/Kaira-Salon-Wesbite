import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Star } from "lucide-react";

import { db } from "../lib/firebase";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // =========================
  // GET APPROVED REVIEWS
  // =========================

  useEffect(() => {
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("status", "==", "approved"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const approvedReviews = snapshot.docs.map(
          (item) => ({
            id: item.id,
            ...item.data(),
          })
        );

        setReviews(approvedReviews);
      },
      (error) => {
        console.error(
          "Approved reviews error:",
          error
        );
      }
    );

    return () => unsubscribe();
  }, []);

  // =========================
  // SUBMIT REVIEW
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write your review.");
      return;
    }

    if (comment.trim().length < 10) {
      setError(
        "Please write at least 10 characters."
      );
      return;
    }

    try {
      setSubmitting(true);

      await addDoc(collection(db, "reviews"), {
        name: name.trim(),
        rating: Number(rating),
        comment: comment.trim(),
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setName("");
      setRating(0);
      setComment("");

      setSuccess(
        "Thank you! Your review has been submitted and is awaiting approval."
      );
    } catch (error) {
      console.error(
        "Review submission error:",
        error
      );

      setError(
        error.message ||
          "Unable to submit your review."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="reviews"
      className="bg-[var(--surface)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            Client Stories
          </p>

          <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Loved by our
            <span className="italic">
              {" "}clients.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-[var(--muted)] sm:text-base">
            Real experiences from our beautiful
            clients.
          </p>
        </div>

        {/* =========================
            APPROVED REVIEWS
        ========================= */}

        {reviews.length > 0 && (
          <div className="mb-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 transition duration-300 hover:-translate-y-1"
              >
                {/* STARS */}

                <div className="flex gap-1 text-[var(--accent)]">
                  {Array.from({
                    length: 5,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      fill={
                        index <
                        Number(review.rating || 0)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>

                {/* REVIEW */}

                <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                  "{review.comment}"
                </p>

                {/* NAME */}

                <div className="mt-6 border-t border-[var(--border)] pt-4">
                  <p className="text-sm font-medium">
                    {review.name}
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                    Verified Client
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* =========================
            REVIEW FORM
        ========================= */}

        <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--border)] bg-[var(--background)] p-5 sm:p-8 lg:p-10">
          <div className="mb-7">
            <h3 className="font-serif text-3xl">
              Share your experience
            </h3>

            <p className="mt-2 text-sm text-[var(--muted)]">
              We'd love to hear about your visit.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div>
              <label
                htmlFor="review-name"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.15em]"
              >
                Your Name
              </label>

              <input
                id="review-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your name"
                maxLength={60}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 text-sm outline-none transition focus:border-[var(--accent)]"
              />
            </div>

            {/* RATING */}

            <div className="mt-6">
              <label className="mb-3 block text-xs font-medium uppercase tracking-[0.15em]">
                Your Rating
              </label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={28}
                      fill={
                        star <= rating
                          ? "currentColor"
                          : "none"
                      }
                      className={
                        star <= rating
                          ? "text-[var(--accent)]"
                          : "text-[var(--muted)]"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* COMMENT */}

            <div className="mt-6">
              <label
                htmlFor="review-comment"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.15em]"
              >
                Your Review
              </label>

              <textarea
                id="review-comment"
                value={comment}
                onChange={(event) =>
                  setComment(event.target.value)
                }
                placeholder="Tell us about your experience..."
                maxLength={500}
                rows={5}
                className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 text-sm leading-6 outline-none transition focus:border-[var(--accent)]"
              />

              <p className="mt-2 text-right text-[11px] text-[var(--muted)]">
                {comment.length}/500
              </p>
            </div>

            {/* ERROR */}

            {error && (
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm leading-6 text-green-600">
                {success}
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-xl bg-[var(--foreground)] px-6 py-4 text-sm font-medium text-[var(--background)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Submitting..."
                : "Submit Review"}
            </button>

            <p className="mt-4 text-center text-[11px] text-[var(--muted)]">
              Reviews are published after approval.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Reviews;