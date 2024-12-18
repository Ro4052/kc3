import { NextRequest } from "next/server";

import { htmlToDog } from "@/lib/details-extractor";

const baseURL = process.env.NEXT_PUBLIC_KC_BASE_URL!;
const dogSearchPath = "/search/dog-profile/";
const idSearchParam = "dogId";

interface RequestConfig {
  params: Promise<{ dog: string }>;
}

export async function GET(request: NextRequest, { params }: RequestConfig) {
  const dogId = (await params).dog;

  const pageRequestURL = new URL(dogSearchPath, baseURL);
  pageRequestURL.searchParams.append(idSearchParam, dogId);

  const page = await fetch(pageRequestURL);
  const content = await page.text();

  try {
    const dog = htmlToDog(content);
    if (!dog) {
      console.error("Dog could not be extracted");
      throw new Error("Dog could not be extracted");
    }

    return Response.json(dog);
  } catch {
    return new Response("Dog profile not found", { status: 404 });
  }
}
