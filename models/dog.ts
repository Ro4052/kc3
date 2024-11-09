export interface Parent {
  id: string;
  name: string;
}

export type Sex = "Dog" | "Bitch";

export interface Dog {
  name: string;
  sex: "Dog" | "Bitch";
  colour: string;
  dob: string;
  sire?: Parent;
  dam?: Parent;
}
