import { MudarTema } from "@/components/buttonTheme";
import Relogio from "@/components/relogio";

export default function Home() {
  return (
    <>
      <main className="h-[100vh] flex items-center justify-center">
        <MudarTema />
        <Relogio />
      </main>
      <footer>
        <div className="flex justify-center -mt-12">
          <p className="text-center text-white pb-2">
            @ 2023 - Apptivium Technologies
          </p>
        </div>
      </footer>
    </>
  );
}
