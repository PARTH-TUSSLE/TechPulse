import Navbar from "@/components/Navbar";
import Backdrop from "@/components/Backdrop";
import Hero from "@/components/Hero";
import Purpose from "@/components/Purpose";
import Team from "@/components/Team";
import Events from "@/components/Events";
import JoinUs from "@/components/JoinUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-clip">
      <Backdrop />
      <Navbar />
      <main className="relative z-10 w-full max-w-full overflow-x-clip" id="main">
        <Hero />
        <Purpose />
        <Team />
        <Events />
        <JoinUs />
      </main>
      <Footer />
    </div>
  );
}