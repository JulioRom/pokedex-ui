import { useQuery } from "@tanstack/react-query";
import { getAllPokemon, fetchPokemonTypes } from "../services/pokemonService";
import { useState, useMemo } from "react";

export const usePokemonList = () => {
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [weightRange, setWeightRange] = useState(10000);
    const [heightRange, setHeightRange] = useState(200);
    const [expBaseRange, setExpBaseRange] = useState(700);

    const { data: allPokemon = [], isLoading, error } = useQuery({
        queryKey: ["allPokemon"],
        queryFn: async () => {
            try {
                const pokemonData = await getAllPokemon();
                console.log("✅ Pokémon cargados:", pokemonData.length);
                return pokemonData;
            } catch (err) {
                console.error("⚠️ Error al obtener Pokémon:", err);
                return [];
            }
        },
        staleTime: 1000 * 60 * 10,
        cacheTime: 1000 * 60 * 30
    });

    const { data: types = [] } = useQuery({
        queryKey: ["pokemonTypes"],
        queryFn: fetchPokemonTypes,
        staleTime: Infinity
    });

    const filteredPokemon = useMemo(() => {
        if (!Array.isArray(allPokemon) || allPokemon.length === 0) {
            console.warn("⚠️ No hay Pokémon cargados todavía.");
            return [];
        }

        return allPokemon.filter((pokemon) => {
            console.log("🎯 Pokémon cargados:", allPokemon.slice(0, 5)); // Muestra los primeros 5 Pokémon

            const matchesSearch = pokemon.name.toLowerCase().includes(search.toLowerCase());
            const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;

            // 📌 Validar valores y evitar que `0` elimine todos los Pokémon
            const matchesWeight = weightRange > 0 ? (pokemon.weight ?? 999) <= weightRange : true;
            const matchesHeight = heightRange > 0 ? (pokemon.height ?? 999) <= heightRange : true;
            const matchesExp = expBaseRange > 0 ? (pokemon.base_experience ?? 999) <= expBaseRange : true;

            return matchesSearch && matchesType && matchesWeight && matchesHeight && matchesExp;
        });

    }, [allPokemon, search, selectedType, weightRange, heightRange, expBaseRange]);

    return {
        filteredPokemon,
        search,
        setSearch,
        selectedType,
        setSelectedType,
        types,
        weightRange,
        setWeightRange,
        heightRange,
        setHeightRange,
        expBaseRange,
        setExpBaseRange,
        isLoading,
        error
    };
};
