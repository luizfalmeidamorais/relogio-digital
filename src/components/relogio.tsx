"use client";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { CommandEmpty } from "cmdk";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type FusoHorario = {
  value: string;
  label: string;
};

const fusosHorarios: FusoHorario[] = [
  {
    value: "America/Sao_Paulo",
    label: "Brasília (GMT-3)",
  },
  {
    value: "America/Manaus",
    label: "Manaus (GMT-4)",
  },
  {
    value: "America/Noronha",
    label: "Fernando de Noronha (GMT-2)",
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
    const getFormattedTime = (fuso: string) => {
      const now = new Date();

      if (fuso === "") {
        return {
          horas: now.getHours().toString().padStart(2, "0"),
          minutos: now.getMinutes().toString().padStart(2, "0"),
          segundos: now.getSeconds().toString().padStart(2, "0"),
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
    <div className="flex items-center justify-around h-[200px] w-[850px] bg-transparent rounded-[3px]">
      {loading ? (
        <>
          <Skeleton className="h-[170px] w-[150px] flex flex-col items-center justify-center bg-white dark:bg-relogio tracking-[3px] rounded-[7px]" />
          <Skeleton className="h-[170px] w-[150px] flex flex-col items-center justify-center bg-white dark:bg-relogio tracking-[3px] rounded-[7px]" />
          <Skeleton className="h-[170px] w-[150px] flex flex-col items-center justify-center bg-white dark:bg-relogio tracking-[3px] rounded-[7px]" />
        </>
      ) : (
        <>
          <Select>
            <SelectTrigger className="w-[280px]">
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
            <span className="font-bold text-[10px] uppercase">Segundos</span>
          </div>
        </>
      )}
    </div>
  );
}
