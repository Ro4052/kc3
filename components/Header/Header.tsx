import { twMerge } from "tailwind-merge";

export type HeaderLevel = 1 | 2 | 3;

const levelClass: Record<HeaderLevel, string> = {
  1: "text-2xl",
  2: "text-xl",
  3: "text-l",
};

const renderHeader = (className: string, text: string, level: HeaderLevel) =>
  ({
    1: <h1 className={className}>{text}</h1>,
    2: <h2 className={className}>{text}</h2>,
    3: <h3 className={className}>{text}</h3>,
  }[level]);

interface HeaderProps {
  children: string;
  className?: string;
  level: HeaderLevel;
}

export const Header = ({ children, className, level }: HeaderProps) =>
  renderHeader(twMerge(levelClass[level], className), children, level);
