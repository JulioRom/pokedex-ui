// services/pokemonService.js
import { apiFetch } from "./apiHelper";

export const getAllPokemon = async () => {
    const data = await apiFetch(`/pokemon?limit=1152`); // 🔹 Obtener TODOS los Pokémon (limit=1000)

    return await Promise.all(
        data.results.map(async (pokemon) => {
            const details = await apiFetch(`/pokemon/${pokemon.name}`);
            return {
                id: details.id,
                name: details.name,
                image: details.sprites.front_default,
                types: details.types.map(t => t.type.name),
                weight: details.weight, //  Asegurar que el peso se almacena
                height: details.height, // ✅Asegurar que la altura se almacena
                base_experience: details.base_experience, //  Guardar experiencia base
            };
        })
    );
};

export const getPokemonDetails = async (id) => {
    return await apiFetch(`/pokemon/${id}`);
};

// Obtener la lista de tipos de Pokémon
export const fetchPokemonTypes = async () => {
    const data = await apiFetch(`/type`);
    return data.results.map(type => type.name);
};
