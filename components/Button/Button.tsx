import { twMerge } from "tailwind-merge";

type Variant = "primary";

const variantClass: Record<Variant, string> = {
  primary: "bg-green-400 hover:bg-green-500 disabled:bg-green-400",
};

interface ButtonProps {
  children: string;
  disabled?: boolean;
  type: "submit";
  variant: Variant;
}

export const Button = ({ children, disabled, type, variant }: ButtonProps) => (
  <button
    className={twMerge(
      "rounded-md p-2 font-semibold text-stone-800 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 disabled:opacity-70 disabled:focus:outline-0",
      variantClass[variant]
    )}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
);
