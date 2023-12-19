"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";

export function MudarTema() {
  const { theme, setTheme } = useTheme();
  const [animationKey, setAnimationKey] = React.useState(0);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="dark:bg-relogio">
          <Icon
            icon={
              theme === "dark"
                ? "line-md:moon-loop"
                : "line-md:sunny-outline-loop"
            }
            className={
              theme === "dark"
                ? "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                : "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            }
            key={animationKey}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeTheme("light")}>
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("dark")}>
          Noturno
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeTheme("system")}>
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
