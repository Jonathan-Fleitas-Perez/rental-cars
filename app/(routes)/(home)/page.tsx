import { Navbar } from "@/components/Shared/Navbar"
import { FirstBlock } from "./components/FirstBlock"
import { SliderBrands } from "./components/SliderBrands"
import { Features } from "./components/Features"
import { OurFleet } from "./components/OurFleet"
import { DriveToday } from "./components/DriveToday"
import { Testimonials } from "./components/Testimonials"
import { LoadingScreen } from "@/components/Shared/LoadingScreen"
import { Footer } from "@/components/Shared/Footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-white overflow-x-hidden">
      <LoadingScreen />
      <Navbar />
      <FirstBlock />
      <SliderBrands />
      <Features />
      <OurFleet />
      <Testimonials />
      <DriveToday />
      
      {/* 🚀 Shared Footer */}
      <Footer />
    </main>
  );
}
