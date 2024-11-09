import { Dog } from "@/models/dog";
import { baseURLHeader } from "@/models/headers";
import { headers } from "next/headers";

const getDog = async (id: string): Promise<Dog> => {
  const baseURL = (await headers()).get(baseURLHeader);
  const response = await fetch(`${baseURL}/api/tree/dog/${id}`);
  if (!response.ok) {
    throw new Error("Error fetching data");
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
    title: `kc3 | ${dog.name}`,
    description: `kc3 - ${dog.name} Kennel Club family tree`,
  };
};

export default async function FamilyTree({ params }: FamilyTreeProps) {
  const dogId = (await params).dog;
  const dog = await getDog(dogId);

  return (
    <div className="grid">
      <span>Family tree for: {dog.name}</span>
      {dog.sire && <span>Sire: {dog.sire.name}</span>}
      {dog.dam && <span>Dam: {dog.dam.name}</span>}
    </div>
  );
}