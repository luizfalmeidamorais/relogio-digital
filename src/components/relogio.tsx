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

export type FusoHorario = {
  value: string;
  label: string;
};

export default function Relogio({
  fusosHorarios,
}: {
  fusosHorarios: FusoHorario[];
}) {
  const [loading, setLoading] = useState(true);

  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const [time, setTime] = useState({ horas: "", minutos: "", segundos: "", dia: "", mes: "", ano: "" });

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
          dia: "00",
          mes: "00",
          ano: "00",
        };
      }

      const dataString = now.toLocaleTimeString("pt-BR", { timeZone: fuso });
      const [horas, minutos, segundos] = dataString.split(":");
      const [dia, mes, ano] = now
        .toLocaleDateString("pt-BR", {
          timeZone: fuso,
        })
        .split("/");

      return {
        horas,
        minutos,
        segundos,
        dia,
        mes,
        ano,
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

      <div className="flex-grow flex-col flex items-center justify-center">
        <div className="flex flex-col items-center justify-center mb-10 text-white -mt-12">
          {loading ? (
            <>
              <Skeleton className="h-[40px] w-[252.95px] bg-white dark:bg-relogio" />
              <Skeleton className="h-[24px] w-[316.67px] bg-white dark:bg-relogio mt-2" />
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold">Relógio Digital</h1>
              <p className="text-md mt-2">
                {time.dia}/{time.mes}/{time.ano}
              </p>
            </>
          )}
        </div>

        <div className="flex items-center justify-around h-1/3 max-md:mt-12 max-md:h-1/2 w-full bg-transparent rounded-[3px] max-md:justify-center max-md:gap-5 max-md:flex-col md:w-[700px]">
          {loading ? (
            <>
              <Skeleton className="h-[170px] w-[150px] max-md:p-3 flex flex-col items-center justify-center bg-white dark:bg-relogio tracking-[3px] rounded-[7px]" />
              <Skeleton className="h-[170px] w-[150px] max-md:p-3 flex flex-col items-center justify-center bg-white dark:bg-relogio tracking-[3px] rounded-[7px]" />
              <Skeleton className="h-[170px] w-[150px] max-md:p-3 flex flex-col items-center justify-center bg-white dark:bg-relogio tracking-[3px] rounded-[7px]" />
            </>
          ) : (
            <>
              <div className="h-[170px] w-[150px] max-md:p-3 flex flex-col items-center justify-center font-[60px] text-[rgba(5, 5, 5, 0.9)] dark:text-white bg-white dark:bg-relogio tracking-[3px] rounded-[7px]">
                <span className="font-bold text-[60px]">{time.horas}</span>
                <span className="font-bold text-[10px] uppercase">Horas</span>
              </div>

              <div className="h-[170px] w-[150px] max-md:p-3 flex flex-col items-center justify-center font-[60px] text-[rgba(5, 5, 5, 0.9)] dark:text-white bg-white dark:bg-relogio tracking-[3px] rounded-[7px]">
                <span className="font-bold text-[60px]">{time.minutos}</span>
                <span className="font-bold text-[10px] uppercase">Minutos</span>
              </div>

              <div className="h-[170px] w-[150px] max-md:p-3 flex flex-col items-center justify-center font-[60px] text-[rgba(5, 5, 5, 0.9)] dark:text-white bg-white dark:bg-relogio tracking-[3px] rounded-[7px]">
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
