export interface Parent {
  name: string;
  id: string;
}

export interface Dog {
  name: string;
  sire?: Parent;
  dam?: Parent;
}
