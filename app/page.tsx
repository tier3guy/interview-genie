import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <main className="flex flex-col w-full overflow-x-hidden overflow-y-auto px-[5%]">
            <Navbar />
            <HeroSection />
        </main>
    );
}
