import Footer from "@/components/footer";
import Relogio from "@/components/relogio";

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Relogio />
        <Footer />
      </div>
    </>
  );
}
