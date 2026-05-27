import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CollectionGrid from "@/components/CollectionGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <CollectionGrid />
      </main>
      <Footer />
    </>
  );
}
