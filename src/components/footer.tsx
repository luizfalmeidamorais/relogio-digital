import { Skeleton } from "./ui/skeleton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-[rgba(5, 5, 5, 0.9)] dark:text-white bg-white dark:bg-relogio p-6 text-center mt-auto">
      <p className="dark:text-white text-[14px]">
        Feito com ❤️ por{" "}
        <a href="https://github.com/luizfalmeidamorais" className="font-bold">
          Luiz F.
        </a>
      </p>

      <div className="text-[12px]">
        Layout inspirado em{" "}
        <a
          className="hover:text-blue-80 dark:hover:text-white font-bold"
          href="https://www.youtube.com/watch?v=GK0ok3ZCXwM"
        >
          Larissa Kich
        </a>
      </div>

      <div className="font-bold mt-3 text-[15px]">
        {currentYear} &copy; Apptivium Technologies
      </div>
    </footer>
  );
}
