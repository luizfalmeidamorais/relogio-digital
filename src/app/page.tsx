import { MudarTema } from "@/components/buttonTheme";
import Footer from "@/components/footer";
import Relogio from "@/components/relogio";

export default function Home() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <main className="flex-grow flex items-center justify-center">
          <MudarTema />
          <Relogio />
        </main>
        <Footer />
      </div>
    </>
  );
}
