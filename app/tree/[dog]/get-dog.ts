import { headers } from "next/headers";

import { Dog } from "@/models/dog";
import { baseURLHeader } from "@/models/headers";

export const getDog = async (id: string): Promise<Dog | null> => {
  const baseURL = (await headers()).get(baseURLHeader);
  const response = await fetch(`${baseURL}/api/tree/dog/${id}`);
  if (!response.ok) {
    return null;
  }

  return await response.json();
};
