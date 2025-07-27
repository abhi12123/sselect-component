import type { IGroup } from "../types";

export const getBreadCrumbArray = (group: IGroup | null) => {
  return group?.path?.slice(-2) || [];
};
