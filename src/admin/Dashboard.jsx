import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Image,
  Scissors,
  Star,
  CalendarCheck,
} from "lucide-react";

import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "../lib/firebase";

function Dashboard() {
  const [galleryCount, setGalleryCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let loaded = 0;

    const checkLoading = () => {
      loaded += 1;

      if (loaded === 4) {
        setLoading(false);
      }
    };

    // =========================
    // GALLERY COUNT
    // =========================
    const unsubscribeGallery = onSnapshot(
      collection(db, "gallery"),
      (snapshot) => {
        setGalleryCount(snapshot.size);
        checkLoading();
      },
      (error) => {
        console.error("Gallery count error:", error);
        checkLoading();
      }
    );

    // =========================
    // SERVICES COUNT
    // =========================
    const unsubscribeServices = onSnapshot(
      collection(db, "services"),
      (snapshot) => {
        setServicesCount(snapshot.size);
        checkLoading();
      },
      (error) => {
        console.error("Services count error:", error);
        checkLoading();
      }
    );

    // =========================
    // APPROVED REVIEWS COUNT
    // =========================
    const reviewsQuery = query(
      collection(db, "reviews"),
      where("status", "==", "approved")
    );

    const unsubscribeReviews = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        setReviewsCount(snapshot.size);
        checkLoading();
      },
      (error) => {
        console.error("Reviews count error:", error);
        checkLoading();
      }
    );

    // =========================
    // BOOKINGS COUNT
    // =========================
    const unsubscribeBookings = onSnapshot(
      collection(db, "bookings"),
      (snapshot) => {
        setBookingsCount(snapshot.size);
        checkLoading();
      },
      (error) => {
        console.error("Bookings count error:", error);

        // If bookings collection doesn't exist yet,
        // keep the count at 0.
        setBookingsCount(0);
        checkLoading();
      }
    );

    return () => {
      unsubscribeGallery();
      unsubscribeServices();
      unsubscribeReviews();
      unsubscribeBookings();
    };
  }, []);

  const stats = [
    {
      title: "Gallery",
      value: loading ? "..." : galleryCount,
      icon: Image,
      description: "Published images",
    },
    {
      title: "Services",
      value: loading ? "..." : servicesCount,
      icon: Scissors,
      description: "Active services",
    },
    {
      title: "Reviews",
      value: loading ? "..." : reviewsCount,
      icon: Star,
      description: "Approved reviews",
    },
    {
      title: "Bookings",
      value: loading ? "..." : bookingsCount,
      icon: CalendarCheck,
      description: "Total bookings",
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--accent)]">
          Overview
        </p>

        <h1 className="font-serif text-4xl">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-[var(--muted)]">
          Manage your Kaira Unisex Salon website.
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.4,
              }}
              className="
                rounded-2xl
                border border-[var(--border)]
                bg-[var(--surface)]
                p-5
              "
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                  <Icon size={20} />
                </div>

                <span className="text-xs text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="text-sm text-[var(--muted)]">
                {stat.title}
              </p>

              <p className="mt-1 text-3xl font-semibold">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-[var(--muted)]">
                {stat.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* WELCOME */}
      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="font-serif text-2xl">
          Welcome to Kaira Admin
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted)]">
          From this dashboard you will be able to manage
          gallery images, salon services and customer reviews.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;