"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { MudarTema } from "./buttonTheme";

type FusoHorario = {
  value: string;
  label: string;
};

export const fusosHorarios: FusoHorario[] = [
  {
    value: "America/Noronha",
    label: "Fernando de Noronha (GMT-2)",
  },
  {
    value: "America/Sao_Paulo",
    label: "Brasília (GMT-3)",
  },
  {
    value: "America/Manaus",
    label: "Manaus (GMT-4)",
  },
  {
    value: "America/Rio_Branco",
    label: "Rio Branco (GMT-5)",
  },
];

export default function Relogio() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const [time, setTime] = useState({ horas: "", minutos: "", segundos: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fuso = localStorage.getItem("fusoHorario");

    if (fuso) {
      setValue(fuso);
    }
  }, []);

  useEffect(() => {
    const getFormattedTime = (fuso: string) => {
      const now = new Date();

      if (fuso === "") {
        return {
          horas: "00",
          minutos: "00",
          segundos: "00",
        };
      }

      const dataString = now.toLocaleTimeString("pt-BR", { timeZone: fuso });
      const [horas, minutos, segundos] = dataString.split(":");

      return {
        horas,
        minutos,
        segundos,
      };
    };

    setTime(getFormattedTime(value));
    setLoading(false);

    const interval = setInterval(() => {
      setTime(getFormattedTime(value));
    }, 1000);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <>
      <div className="flex justify-center mt-9 space-x-4">
        {loading ? (
          <>
            <Skeleton className="h-[40px] w-[40px] bg-white dark:bg-relogio" />
            <Skeleton className="h-[40px] w-[280px] bg-white dark:bg-relogio" />
          </>
        ) : (
          <>
            <MudarTema />
            <Select
              value={value}
              onValueChange={(fuso) => {
                setValue(fuso);
                localStorage.setItem("fusoHorario", fuso);
              }}
            >
              <SelectTrigger className="w-[280px] dark:bg-relogio">
                <SelectValue placeholder="Selecione um fuso horário" />
              </SelectTrigger>
              <SelectContent>
                {fusosHorarios.map((fuso) => (
                  <SelectItem key={fuso.value} value={fuso.value}>
                    {fuso.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>

      <div className="flex-grow flex-col flex items-center justify-center -mt-12">
        <div className="flex flex-col items-center justify-center mb-10 text-white">
          <h1 className="text-4xl font-bold">Relógio Digital</h1>
          <p className="text-md mt-2">
            Acompanhe o horário de diferentes fusos.
          </p>
        </div>

        <div className="flex items-center justify-around h-[200px] w-[700px] bg-transparent rounded-[3px]">
          {loading ? (
            <>
              <Skeleton className="h-[170px] w-[150px] flex flex-col items-center justify-center bg-white dark:bg-relogio tracking-[3px] rounded-[7px]" />
              <Skeleton className="h-[170px] w-[150px] flex flex-col items-center justify-center bg-white dark:bg-relogio tracking-[3px] rounded-[7px]" />
              <Skeleton className="h-[170px] w-[150px] flex flex-col items-center justify-center bg-white dark:bg-relogio tracking-[3px] rounded-[7px]" />
            </>
          ) : (
            <>
              <div className="h-[170px] w-[150px] flex flex-col items-center justify-center font-[60px] text-[rgba(5, 5, 5, 0.9)] dark:text-white bg-white dark:bg-relogio tracking-[3px] rounded-[7px]">
                <span className="font-bold text-[60px]">{time.horas}</span>
                <span className="font-bold text-[10px] uppercase">Horas</span>
              </div>

              <div className="h-[170px] w-[150px] flex flex-col items-center justify-center font-[60px] text-[rgba(5, 5, 5, 0.9)] dark:text-white bg-white dark:bg-relogio tracking-[3px] rounded-[7px]">
                <span className="font-bold text-[60px]">{time.minutos}</span>
                <span className="font-bold text-[10px] uppercase">Minutos</span>
              </div>

              <div className="h-[170px] w-[150px] flex flex-col items-center justify-center font-[60px] text-[rgba(5, 5, 5, 0.9)] dark:text-white bg-white dark:bg-relogio tracking-[3px] rounded-[7px]">
                <span className="font-bold text-[60px]">{time.segundos}</span>
                <span className="font-bold text-[10px] uppercase">
                  Segundos
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
