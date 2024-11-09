import { twMerge } from "tailwind-merge";
import { Header, HeaderLevel } from "../Header/Header";

type CardItem = string | JSX.Element | undefined;

interface CardProps {
  children: CardItem | CardItem[];
  className?: string;
  title?: string;
  titleLevel?: HeaderLevel;
}

export const Card = ({ children, className, title, titleLevel }: CardProps) => (
  <div
    className={twMerge(
      "bg-white dark:bg-slate-800 rounded-lg p-6 ring-1 ring-slate-900/5 shadow-xl",
      className
    )}
  >
    {title && (
      <Header className="mb-4" level={titleLevel ?? 3}>
        {title}
      </Header>
    )}
    <div className="grid gap-2">{children}</div>
  </div>
);
