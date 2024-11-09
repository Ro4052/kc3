export interface Dog {
  id: string;
  name: string;
  sire?: Dog;
  dam?: Dog;
}
