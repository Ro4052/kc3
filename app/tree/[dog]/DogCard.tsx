import { Card } from "@/components/Card/Card";
import { Detail } from "@/components/Detail/Detail";
import { Expand } from "@/components/icons/Expand";
import { Dog, Parent } from "@/models/dog";

interface ParentItemProps {
  gender: "Sire" | "Dam";
  parent: Parent;
}

const ParentItem = ({ gender, parent }: ParentItemProps) => (
  <div className="flex justify-between gap-2 px-2 py-1 border-t last:border-b hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700">
    <span>
      {gender} — {parent.name}
    </span>
    <Expand />
  </div>
);

interface DogCardProps {
  dog: Dog;
}

export const DogCard = ({ dog }: DogCardProps) => (
  <Card title={dog.name} titleLevel={2} className="w-fit h-fit">
    <Detail tag="Sex">{dog.sex}</Detail>
    <Detail tag="Colour">{dog.colour}</Detail>
    <Detail tag="DOB">{dog.dob}</Detail>
    <div className="mt-4">
      {dog.sire && <ParentItem gender="Sire" parent={dog.sire} />}
      {dog.dam && <ParentItem gender="Dam" parent={dog.dam} />}
    </div>
  </Card>
);
