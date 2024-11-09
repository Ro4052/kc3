import { FamilyTree } from "@/models/family-tree";

import { TreeNode } from "./TreeNode";
import { getDog } from "./get-dog";

interface FamilyTreeProps {
  params: Promise<{ dog: string }>;
}

export const generateMetadata = async ({ params }: FamilyTreeProps) => {
  const dogId = (await params).dog;
  const dog = await getDog(dogId);

  return {
    title: `kc3 | ${dog ? dog.name : "Family tree"}`,
    description: `kc3 - ${dog ? `${dog.name}` : ""}Kennel Club family tree`,
  };
};

export default async function FamilyTreePage({ params }: FamilyTreeProps) {
  const dogId = (await params).dog;
  const dog = await getDog(dogId);

  if (!dog) {
    return "Couldn't find dog profile :(";
  }

  const tree: FamilyTree = { id: dogId };

  return (
    <div className="grid w-screen h-screen content-center justify-around">
      <TreeNode dog={dog} tree={tree} />
    </div>
  );
}
