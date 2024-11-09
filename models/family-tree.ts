export interface FamilyTree {
  id: string; // TODO: Is this duplicating data?
  left?: FamilyTree;
  right?: FamilyTree;
}
