import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import VideoShowcase from "../components/VideoShowcase";
import Transformation from "../components/Transformation";
import Reviews from "../components/Reviews";
import Location from "../components/Location";
import BookingCTA from "../components/BookingCTA";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <VideoShowcase />
        <Transformation />
        <Reviews />
        <Location />
        <BookingCTA />
      </main>

      <Footer />
      <FloatingWhatsApp/>
    </>
  );
}

export default Home;