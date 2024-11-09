import { Card } from "@/components/Card/Card";
import { Detail } from "@/components/Detail/Detail";
import { Collapse } from "@/components/icons/Collapse";
import { Expand } from "@/components/icons/Expand";
import { Dog, Parent } from "@/models/dog";
import { FamilyTree } from "@/models/family-tree";

interface ParentItemProps {
  expanded: boolean;
  gender: "Sire" | "Dam";
  parent: Parent;
}

const ParentItem = ({ expanded, gender, parent }: ParentItemProps) => (
  <div className="flex justify-between gap-2 px-2 py-1 border-t last:border-b hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700">
    <span>
      {gender} — {parent.name}
    </span>
    {expanded ? <Collapse /> : <Expand />}
  </div>
);

interface DogCardProps {
  dog: Dog;
  tree: FamilyTree;
}

export const DogCard = ({ dog, tree }: DogCardProps) => (
  <Card title={dog.name} titleLevel={2} className="w-full h-fit">
    <Detail tag="Sex">{dog.sex}</Detail>
    <Detail tag="Colour">{dog.colour}</Detail>
    <Detail tag="DOB">{dog.dob}</Detail>
    <div className="mt-4">
      {dog.sire && (
        <ParentItem expanded={!!tree.left} gender="Sire" parent={dog.sire} />
      )}
      {dog.dam && (
        <ParentItem expanded={!!tree.right} gender="Dam" parent={dog.dam} />
      )}
    </div>
  </Card>
);
