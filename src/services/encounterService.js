// services/encounterService.js
import { apiFetch } from "./apiHelper";

export const getEncounterLocations = async (id) => {
    return await apiFetch(`/pokemon/${id}/encounters`);
};
