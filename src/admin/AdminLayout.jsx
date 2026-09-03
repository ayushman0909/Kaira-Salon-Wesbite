import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../lib/firebase";

import {
  LayoutDashboard,
  Image,
  Scissors,
  Star,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu with Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigation = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Gallery",
      path: "/admin/gallery",
      icon: Image,
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: Scissors,
    },
    {
      name: "Reviews",
      path: "/admin/reviews",
      icon: Star,
    },
  ];

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ================================
          MOBILE HEADER
      ================================= */}

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]/95 px-5 py-4 backdrop-blur-xl lg:hidden">
        <div>
          <p className="font-serif text-2xl">Kaira.</p>

          <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
            Salon Administration
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((previous) => !previous)}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-xl
            border border-[var(--border)]
            transition
            hover:bg-[var(--background)]
          "
          aria-label={
            mobileOpen ? "Close admin menu" : "Open admin menu"
          }
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <div className="flex min-h-screen">
        {/* ================================
            SIDEBAR
        ================================= */}

        <aside
          className={`
            fixed inset-y-0 left-0 z-50
            w-[280px]
            border-r border-[var(--border)]
            bg-[var(--surface)]
            shadow-2xl
            transition-transform duration-300 ease-out

            lg:static
            lg:z-auto
            lg:translate-x-0
            lg:shadow-none

            ${
              mobileOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          <div className="flex h-full flex-col">
            {/* ================================
                BRAND
            ================================= */}

            <div className="border-b border-[var(--border)] px-6 py-7">
              <NavLink
                to="/admin"
                onClick={closeMobileMenu}
                className="block"
              >
                <p className="font-serif text-3xl leading-none">
                  Kaira.
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />

                  <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                    Salon Administration
                  </p>
                </div>
              </NavLink>
            </div>

            {/* ================================
                NAVIGATION
            ================================= */}

            <div className="flex-1 overflow-y-auto px-4 py-7">
              <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                Management
              </p>

              <nav className="space-y-1.5">
                {navigation.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end={item.path === "/admin"}
                      onClick={closeMobileMenu}
                      className={({ isActive }) => `
                        group flex items-center gap-3
                        rounded-xl px-3.5 py-3
                        text-sm
                        transition-all duration-200

                        ${
                          isActive
                            ? `
                              bg-[var(--foreground)]
                              text-[var(--background)]
                              shadow-lg
                            `
                            : `
                              text-[var(--muted)]
                              hover:bg-[var(--background)]
                              hover:text-[var(--foreground)]
                            `
                        }
                      `}
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={`
                              flex h-9 w-9 items-center
                              justify-center rounded-lg
                              transition
                              ${
                                isActive
                                  ? "bg-white/10"
                                  : "bg-[var(--background)] group-hover:bg-[var(--surface)]"
                              }
                            `}
                          >
                            <Icon size={17} />
                          </span>

                          <span className="flex-1">
                            {item.name}
                          </span>

                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>

              {/* Website link */}
              <div className="mt-8">
                <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                  Website
                </p>

                <NavLink
                  to="/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMobileMenu}
                  className="
                    group flex items-center gap-3
                    rounded-xl px-3.5 py-3
                    text-sm text-[var(--muted)]
                    transition
                    hover:bg-[var(--background)]
                    hover:text-[var(--foreground)]
                  "
                >
                  <span
                    className="
                      flex h-9 w-9 items-center
                      justify-center rounded-lg
                      bg-[var(--background)]
                    "
                  >
                    <ExternalLink size={17} />
                  </span>

                  <span className="flex-1">
                    View Website
                  </span>
                </NavLink>
              </div>
            </div>

            {/* ================================
                ADMIN USER
            ================================= */}

            <div className="border-t border-[var(--border)] p-4">
              <div className="mb-3 rounded-xl bg-[var(--background)] p-3">
                <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  Signed in as
                </p>

                <p className="truncate text-xs font-medium">
                  {auth.currentUser?.email || "Admin"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="
                  flex w-full items-center gap-3
                  rounded-xl px-3.5 py-3
                  text-sm text-red-500
                  transition
                  hover:bg-red-500/10
                "
              >
                <span
                  className="
                    flex h-9 w-9 items-center
                    justify-center rounded-lg
                    bg-red-500/10
                  "
                >
                  <LogOut size={17} />
                </span>

                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ================================
            MOBILE OVERLAY
        ================================= */}

        {mobileOpen && (
          <button
            type="button"
            aria-label="Close admin menu"
            onClick={closeMobileMenu}
            className="
              fixed inset-0 z-40
              bg-black/50
              backdrop-blur-[2px]
              lg:hidden
            "
          />
        )}

        {/* ================================
            MAIN CONTENT
        ================================= */}

        <main className="min-w-0 flex-1">
          <div className="mx-auto min-h-screen w-full max-w-7xl px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;