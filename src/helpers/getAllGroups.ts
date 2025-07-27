import type { IGroup } from "../types";

export const getAllGroups = (sampleData: Record<string, IGroup>) => {
  return Object.keys(sampleData).map((node) => sampleData[node]);
};
