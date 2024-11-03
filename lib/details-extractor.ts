import { parse, HTMLElement } from "node-html-parser";

import { Dog, Parent } from "@/models/dog";

const extractName = (html: HTMLElement): string | undefined =>
  html.querySelector("h1.o-dog-header__title")?.textContent ?? undefined;

const extractPedigree = (html: HTMLElement): HTMLElement | undefined =>
  html.querySelector(".m-pedigree-graph__list") ?? undefined;

const extractParent = (
  parents: HTMLElement[],
  parentGender: "Sire" | "Dam"
): Parent | undefined => {
  const anchor = parents
    .find(
      (p) =>
        p.querySelector(".m-pedigree-graph__dog-gender > span")?.textContent ===
        parentGender
    )
    ?.querySelector(".m-pedigree-graph__dog-link");

  const name = anchor?.textContent;
  const id = anchor?.getAttribute("href")?.replace(/.*DogId=(.*)/, "$1");

  if (name && id) {
    return {
      name,
      id,
    };
  }

  return undefined;
};

const extractParents = (
  pedigree: HTMLElement | undefined
): Omit<Dog, "name"> | undefined => {
  if (!pedigree) {
    return undefined;
  }

  const parents = [
    ...pedigree.querySelectorAll(
      ".m-pedigree-graph__dog--current ~ .m-pedigree-graph__list > .m-pedigree-graph__item > .m-pedigree-graph__dog"
    ),
  ];

  if (!parents.length) {
    return undefined;
  }

  const sire = extractParent(parents, "Sire");
  const dam = extractParent(parents, "Dam");

  return {
    sire,
    dam,
  };
};

export const htmlToDog = (htmlString: string): Dog | undefined => {
  const parsedHtml = parse(htmlString);

  const name = extractName(parsedHtml);
  if (!name) {
    return;
  }

  return {
    name,
    ...extractParents(extractPedigree(parsedHtml)),
  };
};
