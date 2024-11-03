interface InputProps {
  placeholder?: string;
}

export const Input = ({ placeholder }: InputProps) => (
  <input
    className="rounded-md border-2 border-gray-200 outline-0 dark:border-gray-300/20 bg-slate-100/20 dark:bg-slate-900/20 p-2 focus:border-slate-500 dark:focus:border-slate-400"
    placeholder={placeholder}
  />
);
