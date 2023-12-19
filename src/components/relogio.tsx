"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function Relogio() {
  const [time, setTime] = useState({ horas: "", minutos: "", segundos: "" });
  const [loading, setLoading] = useState(true);
  const [fusoHorario, setFusoHorario] = useState("America/Sao_Paulo");

  useEffect(() => {
    const getFormattedTime = () => {
      const now = new Date();
      return {
        horas: now.getHours().toString().padStart(2, "0"),
        minutos: now.getMinutes().toString().padStart(2, "0"),
        segundos: now.getSeconds().toString().padStart(2, "0"),
      };
    };

    setTime(getFormattedTime());
    setLoading(false);

    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="flex items-center justify-around h-[200px] w-[550px] bg-transparent rounded-[3px]">
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
              <span className="font-bold text-[10px]">Horas</span>
            </div>

            <div className="h-[170px] w-[150px] flex flex-col items-center justify-center font-[60px] text-[rgba(5, 5, 5, 0.9)] dark:text-white bg-white dark:bg-relogio tracking-[3px] rounded-[7px]">
              <span className="font-bold text-[60px]">{time.minutos}</span>
              <span className="font-bold text-[10px]">Minutos</span>
            </div>

            <div className="h-[170px] w-[150px] flex flex-col items-center justify-center font-[60px] text-[rgba(5, 5, 5, 0.9)] dark:text-white bg-white dark:bg-relogio tracking-[3px] rounded-[7px]">
              <span className="font-bold text-[60px]">{time.segundos}</span>
              <span className="font-bold text-[10px]">Segundos</span>
            </div>
          </>
        )}
      </div>
  );
}
