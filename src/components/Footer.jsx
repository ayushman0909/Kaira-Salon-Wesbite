import {
  ArrowUpRight,
  
  
  MapPin,
  Phone,
} from "lucide-react";
import { FaInstagram ,FaFacebook } from "react-icons/fa";

const serviceLinks = [
  "Hair",
  "Skin & Facials",
  "Nails",
  "Brows & Lashes",
  "Waxing",
  "Makeup & Bridal",
];

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
];

function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-[var(--background)]">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 lg:px-16 lg:py-24">
        {/* Brand */}
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a
              href="#home"
              className="inline-block font-serif text-4xl tracking-tight"
            >
              Kaira
              <span className="italic text-[var(--accent)]">.</span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--background)]/50">
              A modern unisex salon in New Delhi, creating personalised
              beauty experiences with precision, creativity and care.
            </p>

            {/* Social */}
            <div className="mt-8 flex gap-3">
              <a
                href="#"
                aria-label="FaInstagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--background)]/15 transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)]"
              >
                <FaInstagram size={16} strokeWidth={1.5} />
              </a>

              <a
                href="#"
                aria-label="FaFacebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--background)]/15 transition-all duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)]"
              >
                <FaFacebook size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
              Explore
            </span>

            <nav className="mt-6 flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-[var(--background)]/60 transition-colors hover:text-[var(--background)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
              Services
            </span>

            <div className="mt-6 flex flex-col gap-3">
              {serviceLinks.map((service) => (
                <a
                  key={service}
                  href="#services"
                  className="w-fit text-sm text-[var(--background)]/60 transition-colors hover:text-[var(--background)]"
                >
                  {service}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
              Visit
            </span>

            <div className="mt-6 space-y-6">
              <div className="flex gap-3">
                <MapPin
                  size={17}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-[var(--accent)]"
                />

                <p className="text-sm leading-6 text-[var(--background)]/60">
                  Milap Market, J 45,
                  <br />
                  Opposite Subhash Nagar,
                  <br />
                  New Delhi — 110027
                </p>
              </div>

              <a
                href="tel:+919999999999"
                className="flex items-center gap-3 text-sm text-[var(--background)]/60 transition-colors hover:text-[var(--background)]"
              >
                <Phone
                  size={17}
                  strokeWidth={1.5}
                  className="text-[var(--accent)]"
                />

                +91 XXXXX XXXXX
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 border-y border-[var(--background)]/10 py-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
                Your next look starts here
              </span>

              <h3 className="mt-3 font-serif text-3xl md:text-4xl">
                Let's create something beautiful.
              </h3>
            </div>

            <a
              href="#booking"
              className="group rounded-3xl inline-flex items-center gap-3 self-start bg-[var(--accent)] px-6 py-4 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-1"
            >
              Book Appointment

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col justify-between gap-4 pt-8 text-[10px] uppercase tracking-[0.15em] text-[var(--background)]/30 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Kaira Unisex Salon. All rights
            reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>

            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;