import { useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { Check, Trash2, X } from "lucide-react";

import { db } from "../lib/firebase";

function ReviewsManager() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const reviewsQuery = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setReviews(data);
        setLoading(false);
      },
      (error) => {
        console.error("Reviews fetch error:", error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleStatus = async (review, status) => {
    try {
      setProcessing(review.id);
      setError("");

      await updateDoc(doc(db, "reviews", review.id), {
        status,
        moderatedAt: new Date(),
      });
    } catch (error) {
      console.error("Review update error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (review) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this review?"
    );

    if (!confirmed) return;

    try {
      setProcessing(review.id);
      setError("");

      await deleteDoc(doc(db, "reviews", review.id));
    } catch (error) {
      console.error("Review delete error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setProcessing(null);
    }
  };

  const pendingReviews = reviews.filter(
    (review) => review.status === "pending"
  );

  const approvedReviews = reviews.filter(
    (review) => review.status === "approved"
  );

  const declinedReviews = reviews.filter(
    (review) => review.status === "declined"
  );

  return (
    <div>
      {/* HEADER */}

      <div className="mb-8">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
          Management
        </p>

        <h1 className="font-serif text-4xl sm:text-5xl">
          Reviews
        </h1>

        <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
          Review customer feedback and approve the reviews
          that should appear on the website.
        </p>
      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* STATS */}

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Total"
          value={reviews.length}
        />

        <StatCard
          label="Pending"
          value={pendingReviews.length}
        />

        <StatCard
          label="Approved"
          value={approvedReviews.length}
        />

        <StatCard
          label="Declined"
          value={declinedReviews.length}
        />
      </div>

      {/* LOADING */}

      {loading ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center">
          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />

          <p className="mt-4 text-sm text-[var(--muted)]">
            Loading reviews...
          </p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--border)] p-12 text-center">
          <p className="font-serif text-2xl">
            No reviews yet.
          </p>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Customer reviews will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* PENDING */}

          {pendingReviews.length > 0 && (
            <ReviewSection
              title="Pending Reviews"
              count={pendingReviews.length}
            >
              {pendingReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  processing={processing === review.id}
                  onApprove={() =>
                    handleStatus(review, "approved")
                  }
                  onDecline={() =>
                    handleStatus(review, "declined")
                  }
                  onDelete={() =>
                    handleDelete(review)
                  }
                />
              ))}
            </ReviewSection>
          )}

          {/* APPROVED */}

          {approvedReviews.length > 0 && (
            <ReviewSection
              title="Approved Reviews"
              count={approvedReviews.length}
            >
              {approvedReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  processing={processing === review.id}
                  onDecline={() =>
                    handleStatus(review, "declined")
                  }
                  onDelete={() =>
                    handleDelete(review)
                  }
                />
              ))}
            </ReviewSection>
          )}

          {/* DECLINED */}

          {declinedReviews.length > 0 && (
            <ReviewSection
              title="Declined Reviews"
              count={declinedReviews.length}
            >
              {declinedReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  processing={processing === review.id}
                  onApprove={() =>
                    handleStatus(review, "approved")
                  }
                  onDelete={() =>
                    handleDelete(review)
                  }
                />
              ))}
            </ReviewSection>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
        {label}
      </p>

      <p className="mt-2 font-serif text-3xl">
        {value}
      </p>
    </div>
  );
}

/* =========================
   REVIEW SECTION
========================= */

function ReviewSection({ title, count, children }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="font-serif text-2xl">
          {title}
        </h2>

        <span className="rounded-full bg-[var(--background)] px-2.5 py-1 text-xs text-[var(--muted)]">
          {count}
        </span>
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}

/* =========================
   REVIEW CARD
========================= */

function ReviewCard({
  review,
  processing,
  onApprove,
  onDecline,
  onDelete,
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          {/* NAME + STATUS */}

          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-medium">
              {review.name || "Anonymous"}
            </h3>

            <StatusBadge status={review.status} />
          </div>

          {/* STARS */}

          <div className="mt-3 flex gap-1 text-[var(--accent)]">
            {Array.from({ length: 5 }).map(
              (_, index) => (
                <span key={index}>
                  {index < Number(review.rating || 0)
                    ? "★"
                    : "☆"}
                </span>
              )
            )}
          </div>

          {/* COMMENT */}

          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            "{review.comment}"
          </p>

          {/* DATE */}

          {review.createdAt?.toDate && (
            <p className="mt-4 text-[11px] text-[var(--muted)]">
              {review.createdAt
                .toDate()
                .toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
            </p>
          )}
        </div>

        {/* ACTIONS */}

        <div className="flex shrink-0 flex-wrap gap-2">
          {review.status !== "approved" && (
            <button
              type="button"
              disabled={processing}
              onClick={onApprove}
              className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2.5 text-xs font-medium text-green-600 transition hover:bg-green-500/20 disabled:opacity-50"
            >
              <Check size={15} />
              Approve
            </button>
          )}

          {review.status !== "declined" && (
            <button
              type="button"
              disabled={processing}
              onClick={onDecline}
              className="flex items-center gap-2 rounded-lg bg-orange-500/10 px-3 py-2.5 text-xs font-medium text-orange-600 transition hover:bg-orange-500/20 disabled:opacity-50"
            >
              <X size={15} />
              Decline
            </button>
          )}

          <button
            type="button"
            disabled={processing}
            onClick={onDelete}
            className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2.5 text-xs font-medium text-red-500 transition hover:bg-red-500/20 disabled:opacity-50"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({ status }) {
  const styles = {
    pending:
      "bg-yellow-500/10 text-yellow-600",
    approved:
      "bg-green-500/10 text-green-600",
    declined:
      "bg-red-500/10 text-red-500",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
        styles[status] ||
        "bg-[var(--background)] text-[var(--muted)]"
      }`}
    >
      {status || "unknown"}
    </span>
  );
}

export default ReviewsManager;