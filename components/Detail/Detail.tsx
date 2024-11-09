import { Tag } from "../Tag/Tag";

interface DetailProps {
  children: string;
  tag: string;
}

export const Detail = ({ tag, children }: DetailProps) => (
  <div>
    <Tag className="mr-3">{tag}</Tag>
    <span className="dark:text-slate-300">{children}</span>
  </div>
);
