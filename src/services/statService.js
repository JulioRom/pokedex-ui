// services/statService.js
import { apiFetch } from "./apiHelper";

export const getStats = async (id) => {
    const data = await apiFetch(`/pokemon/${id}`);
    return data.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
    }));
};
