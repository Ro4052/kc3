import { twJoin } from "tailwind-merge";

import { Dog } from "@/models/dog";
import { FamilyTree } from "@/models/family-tree";

import { DogCard } from "./DogCard";
import { getDog } from "./get-dog";

interface TreeNodeProps {
  dog: Dog;
  tree: FamilyTree;
}

export const TreeNode = async ({ dog, tree }: TreeNodeProps) => {
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
        <DogCard dog={dog} tree={tree} />
      </div>
      {(leftTreeNode || rightTreeNode) && (
        <div className="grid gap-4">
          <div className="min-h-28">
            {leftTreeNode && <TreeNode dog={leftTreeNode} tree={tree.left!} />}
          </div>
          <div className="min-h-28">
            {rightTreeNode && (
              <TreeNode dog={rightTreeNode} tree={tree.right!} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
