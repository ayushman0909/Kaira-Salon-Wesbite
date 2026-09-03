import { motion } from "framer-motion";
import {
  Image,
  Scissors,
  Star,
  CalendarCheck,
} from "lucide-react";

function Dashboard() {
  const stats = [
    {
      title: "Gallery",
      value: "0",
      icon: Image,
      description: "Published images",
    },
    {
      title: "Services",
      value: "0",
      icon: Scissors,
      description: "Active services",
    },
    {
      title: "Reviews",
      value: "0",
      icon: Star,
      description: "Approved reviews",
    },
    {
      title: "Bookings",
      value: "0",
      icon: CalendarCheck,
      description: "Total bookings",
    },
  ];

  return (
    <div>
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
                  01
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