import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reviews", href: "#reviews" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("kaira-theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const nextMode = !darkMode;

    setDarkMode(nextMode);

    if (nextMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("kaira-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("kaira-theme", "light");
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={` 
        fixed top-0 left-0 z-50 w-full 
        transition-all duration-500 
        ${
          scrolled
            ? "border-b border-black/10 bg-[#f8f6f1]/85 backdrop-blur-lg dark:border-white/10 dark:bg-[#11100f]/85"
            : "bg-transparent"
        }
      `}
    >
      <div
        className="
          mx-auto flex h-20 max-w-7xl items-center
          justify-between px-5
          lg:px-8
        "
      >
        {/* LOGO */}

        <a href="#home" className="group flex items-center">
          <img
            src="/logo.png"
            alt="KAIRA Unisex Salon"
            className="h-18 rounded-[50%] w-auto object-contain sm:h-15 lg:h-20"
          />
        </a>

        {/* DESKTOP NAV */}

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`
        relative py-2 text-sm font-medium
        transition-colors duration-300
        ${
          scrolled
            ? "text-[var(--muted)] hover:text-[var(--foreground)]"
            : "text-gray-200 hover:text-white/80 dark:text-white dark:hover:text-white/80"
        }
      `}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* ACTIONS */}

        <div className="flex items-center gap-2">
          {/* THEME */}

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="
              grid h-10 w-10 place-items-center
              rounded-full
              border border-black/10
              text-[var(--foreground)]
              transition-all duration-300
              hover:border-[var(--accent)]
              dark:border-white/10
            "
          >
            {darkMode ? (
              <Sun size={17} strokeWidth={1.7} />
            ) : (
              <Moon size={17} strokeWidth={1.7} />
            )}
          </button>

          {/* BOOK */}

          <a
            href="#booking"
            className="
              hidden items-center gap-2
              rounded-full
              bg-[var(--foreground)]
              px-5 py-2.5
              text-xs font-medium
              text-[var(--background)]
              transition-all duration-300
              hover:-translate-y-0.5
              sm:flex
            "
          >
            Book Appointment
            <ArrowUpRight size={14} />
          </a>

          {/* MOBILE MENU */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="
              grid h-10 w-10 place-items-center
              rounded-full
              border border-black/10
              text-[var(--foreground)]
              lg:hidden
              dark:border-white/10
            "
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}

      <div
        className={`
          overflow-hidden border-t border-black/10
          bg-[var(--surface)]
          transition-all duration-500
          dark:border-white/10
          lg:hidden
          ${menuOpen ? "max-h-96" : "max-h-0"}
        `}
      >
        <nav className="flex flex-col px-5 py-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="
                border-b border-black/5
                py-4 text-sm
                text-[var(--muted)]
                dark:border-white/5
              "
            >
              {link.name}
            </a>
          ))}

          <a
            href="#booking"
            onClick={closeMenu}
            className="
              mt-5 flex items-center
              justify-center gap-2
              rounded-full
              bg-[var(--foreground)]
              px-5 py-3
              text-sm
              text-[var(--background)]
            "
          >
            Book Appointment
            <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
