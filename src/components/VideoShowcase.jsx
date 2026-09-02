import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "The Kaira Experience",
    category: "Salon",
    src: "/videos/salon-1.mp4",
    poster:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: 2,
    title: "Hair Transformation",
    category: "Hair",
    src: "/videos/hair-1.mp4",
    poster:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1800&q=85",
  },
];

function VideoShowcase() {
  const videoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      await videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const changeVideo = (video) => {
    setActiveVideo(video);
    setIsPlaying(false);
  };

  return (
    <section
      id="video-showcase"
      className="bg-[var(--background)] px-5 py-24 md:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
              05 — The Experience
            </span>

            <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-[var(--foreground)] md:text-6xl lg:text-7xl">
              See the
              <span className="ml-2 italic">Kaira difference.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
            Step inside our world of beauty, creativity and attention to
            detail.
          </p>
        </motion.div>

        {/* Main Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="group relative aspect-[16/9] overflow-hidden bg-black md:aspect-[21/10]"
        >
          <AnimatePresence mode="wait">
            <motion.video
              key={activeVideo.id}
              ref={videoRef}
              poster={activeVideo.poster}
              src={activeVideo.src}
              muted={isMuted}
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>

          {/* Dark overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

          {/* Center play button */}
          <button
            type="button"
            onClick={togglePlay}
            className={`absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-md transition-all duration-500 hover:scale-110 hover:bg-white/20 ${
              isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            }`}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            <Play
              size={24}
              fill="currentColor"
              className="ml-1"
            />
          </button>

          {/* Bottom information */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-8">
            <div>
              <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-white/60">
                {activeVideo.category}
              </span>

              <h3 className="font-serif text-2xl text-white md:text-3xl">
                {activeVideo.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={toggleMute}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-md transition hover:bg-white/10"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX size={16} />
              ) : (
                <Volume2 size={16} />
              )}
            </button>
          </div>
        </motion.div>

        {/* Video selector */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {videos.map((video, index) => (
            <button
              key={video.id}
              type="button"
              onClick={() => changeVideo(video)}
              className={`group flex items-center gap-4 border p-3 text-left transition-all duration-300 ${
                activeVideo.id === video.id
                  ? "border-[var(--accent)]"
                  : "border-[var(--border)] hover:border-[var(--accent)]"
              }`}
            >
              <div className="relative h-16 w-24 shrink-0 overflow-hidden">
                <img
                  src={video.poster}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-black">
                    <Play size={10} fill="currentColor" />
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {video.category}
                </span>

                <p className="mt-1 font-serif text-lg text-[var(--foreground)]">
                  {video.title}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 border-t border-[var(--border)] pt-8 text-center"
        >
          <p className="mx-auto max-w-2xl font-serif text-2xl leading-relaxed text-[var(--foreground)] md:text-3xl">
            "Your style is personal.
            <span className="italic text-[var(--accent)]">
              {" "}
              Your salon should be too.
            </span>
            "
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default VideoShowcase;