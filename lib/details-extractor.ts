import { parse, HTMLElement } from "node-html-parser";

import { Dog, Parent, Sex } from "@/models/dog";

const extractName = (html: HTMLElement): string | undefined =>
  html.querySelector("h1.o-dog-header__title")?.textContent ?? undefined;

const extractDetailsBlock = (html: HTMLElement): HTMLElement[] => [
  ...html.querySelectorAll(".o-dog-header__details-item"),
];

const extractDetail = (
  detailsBlock: HTMLElement[],
  detail: string
): string | undefined => {
  const detailContainer = detailsBlock.find(
    (e) => e.querySelector(".o-dog-header__details-key")?.textContent === detail
  );

  return detailContainer?.querySelector(".o-dog-header__details-value")
    ?.textContent;
};

const extractSex = (detailsBlock: HTMLElement[]): Sex | undefined => {
  const sex = extractDetail(detailsBlock, "Sex");

  return sex ? (sex as Sex) : undefined;
};

const extractColour = (detailsBlock: HTMLElement[]): string | undefined =>
  extractDetail(detailsBlock, "Colour");

const extractDob = (detailsBlock: HTMLElement[]): string | undefined =>
  extractDetail(detailsBlock, "Born");

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
): Pick<Dog, "sire" | "dam"> | undefined => {
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

export const htmlToDog = (id: string, htmlString: string): Dog | undefined => {
  const parsedHtml = parse(htmlString);

  const name = extractName(parsedHtml);

  const detailsBlock = extractDetailsBlock(parsedHtml);
  const sex = extractSex(detailsBlock);
  const colour = extractColour(detailsBlock);
  const dob = extractDob(detailsBlock);

  // TODO: Should some of these fields be optional?
  if (!name || !sex || !colour || !dob) {
    return;
  }

  return {
    name,
    sex,
    colour,
    dob,
    ...extractParents(extractPedigree(parsedHtml)),
  };
};
