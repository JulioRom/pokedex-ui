const API_BASE_URL = "https://pokeapi.co/api/v2";

/**
 * Obtiene una lista de Pokémon paginada
 * @param {number} page - Número de página
 * @returns {Promise<Object>} - Datos de los Pokémon
 */
export const fetchPokemonList = async (page) => {
  try {
    const limit = 30;
    const offset = (page - 1) * limit;
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

    if (!response.ok) throw new Error("Error al obtener la lista de Pokémon");

    return await response.json();
  } catch (error) {
    console.error("Error en fetchPokemonList:", error);
    throw error;
  }
};

/**
 * Obtiene los detalles de un Pokémon
 * @param {string | number} id - ID o nombre del Pokémon
 * @returns {Promise<Object>} - Datos del Pokémon
 */
export const fetchPokemonDetail = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
    if (!response.ok) throw new Error("Error al obtener detalles del Pokémon");

    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      height: data.height / 10, // Convertimos decímetros a metros
      weight: data.weight / 10, // Convertimos hectogramos a kilogramos
      base_experience: data.base_experience,
      stats: data.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
      })),
      types: data.types.map((t) => t.type.name), // 📌 Extrae correctamente los tipos
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`
    };
  } catch (error) {
    console.error("Error en fetchPokemonDetail:", error);
    return { id, name: "Desconocido", height: 0, weight: 0, base_experience: 0, stats: [] };
  }
};


export const fetchAllPokemon = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=1000`);
    if (!response.ok) throw new Error("Error al obtener la lista completa de Pokémon");

    const data = await response.json();

    // Obtenemos solo los primeros 30 Pokémon detallados para mejorar rendimiento
    const detailedPokemonPromises = data.results.slice(0, 30).map(async (pokemon) => {
      const detailsResponse = await fetch(pokemon.url);
      const details = await detailsResponse.json();

      return {
        name: pokemon.name,
        id: details.id,
        image: details.sprites.front_default,
        types: details.types.map((type) => type.type.name), // Extraemos solo los nombres de los tipos
      };
    });

    const detailedPokemon = await Promise.all(detailedPokemonPromises);

    return detailedPokemon;
  } catch (error) {
    console.error("Error en fetchAllPokemon:", error);
    throw error;
  }
};



export const fetchPokemonTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/type`);
    if (!response.ok) throw new Error("Error al obtener los tipos de Pokémon");
    return await response.json();
  } catch (error) {
    console.error("Error en fetchPokemonTypes:", error);
    throw error;
  }
};

