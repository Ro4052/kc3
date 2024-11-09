import { Dog } from "@/models/dog";
import { FamilyTree } from "@/models/family-tree";
import { DogCard } from "./DogCard";
import { twJoin } from "tailwind-merge";

interface TreeNodeProps {
  dog: Dog;
  getDog: (id: string) => Promise<Dog | null>;
  tree: FamilyTree;
}

export const TreeNode = async ({ dog, getDog, tree }: TreeNodeProps) => {
  const leftTreeNode = tree.left && (await getDog(tree.left.id));
  const rightTreeNode = tree.right && (await getDog(tree.right.id));

  return (
    <div
      className={twJoin(
        "grid gap-6",
        (leftTreeNode || rightTreeNode) && "grid-cols-2"
      )}
    >
      <div className="grid content-center">
        <DogCard dog={dog} />
      </div>
      <div className="grid gap-4">
        {leftTreeNode && (
          <TreeNode dog={leftTreeNode} getDog={getDog} tree={tree.left!} />
        )}
        {rightTreeNode && (
          <TreeNode dog={rightTreeNode} getDog={getDog} tree={tree.right!} />
        )}
      </div>
    </div>
  );
};
