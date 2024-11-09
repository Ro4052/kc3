import { twMerge } from "tailwind-merge";

interface TagProps {
  children: string;
  className?: string;
}

export const Tag = ({ children, className }: TagProps) => (
  <label
    className={twMerge(
      "w-fit py-1 px-2 rounded-md font-semibold bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-slate-200",
      className
    )}
  >
    {children}
  </label>
);
