import { headers } from "next/headers";

import { Dog } from "@/models/dog";
import { baseURLHeader } from "@/models/headers";
import { FamilyTree } from "@/models/family-tree";

import { TreeNode } from "./TreeNode";

// TODO: Move this function so it doesn't need to be passed down
const getDog = async (id: string): Promise<Dog | null> => {
  const baseURL = (await headers()).get(baseURLHeader);
  const response = await fetch(`${baseURL}/api/tree/dog/${id}`);
  if (!response.ok) {
    return null;
  }

  return await response.json();
};

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
      <TreeNode dog={dog} getDog={getDog} tree={tree} />
    </div>
  );
}
