import Footer from "@/components/footer";
import Relogio, { FusoHorario } from "@/components/relogio";

export async function getData() {
  const res = await fetch("http://worldtimeapi.org/api/timezone");
  const data = await res.json();

  const fusosHorarios: FusoHorario[] = data.map((fuso: string) => {
    const label = fuso.replace("_", " ").replace("/", " - ");
    return { value: fuso, label: label };
  });

  return fusosHorarios
}

export default async function Home() {
  const data = await getData()

  return (
    <>
      <div className="flex flex-col h-screen">
        <Relogio fusosHorarios={data} />
        <Footer />
      </div>
    </>
  );
}
