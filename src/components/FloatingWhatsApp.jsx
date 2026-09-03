import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/919278678662"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Kaira Unisex Salon on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl md:bottom-7 md:right-7"
    >
      <FaWhatsapp size={28} />

      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--accent)] opacity-20" />
    </motion.a>
  );
}

export default FloatingWhatsApp;