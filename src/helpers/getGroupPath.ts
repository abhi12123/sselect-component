import type { IGroup } from "../types";

export const getGroupPath = (group: IGroup | null) => {
  return group?.path.map((el) => el.group_id).join(".");
};
