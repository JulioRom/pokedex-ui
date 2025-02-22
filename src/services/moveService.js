// services/moveService.js
import { apiFetch } from "./apiHelper";

export const getMoves = async (id) => {
    return await apiFetch(`/move/${id}`);
};
