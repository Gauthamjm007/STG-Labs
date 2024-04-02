import { getUserAvatarUrl } from "../constants";
import { capitalize } from "lodash";
export const createEmptyUserField = (id: number) => {
  return {
    id,
    name: "",
    hobby: "",
    location: "",
    avatar: getUserAvatarUrl(id),
    createdAt: new Date().toISOString(),
    isNew: true,
  };
};

export const capitalizeString = capitalize;

export const getDatefromIsoString = (val: string) =>
  new Date(val).toJSON().slice(0, 10);
