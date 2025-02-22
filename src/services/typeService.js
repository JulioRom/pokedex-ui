// services/typeService.js
import { apiFetch } from "./apiHelper";

export const getPokemonTypes = async () => {
    try {
        const data = await apiFetch("/type");
        if (!data.results) throw new Error("No se encontraron tipos en la API.");
        
        return data.results.map((type) => type.name);
    } catch (error) {
        console.error("Error en getPokemonTypes:", error);
        throw error;
    }
};
