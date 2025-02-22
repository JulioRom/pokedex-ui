const BASE_URL = "https://pokeapi.co/api/v2";

// 🔹 Agregar timeout de 10 segundos y manejo de reintentos
export const apiFetch = async (endpoint, retries = 3, timeout = 10000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const controller = new AbortController();
            const signal = controller.signal;

            // Si la API no responde en `timeout` ms, cancelamos la petición
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(`${BASE_URL}${endpoint}`, { signal });
            clearTimeout(timeoutId);

            if (!response.ok) throw new Error(`Error en API: ${response.statusText}`);

            return await response.json();
        } catch (error) {
            console.error(`Intento ${i + 1} - Error al obtener datos de ${endpoint}:`, error);
            if (i === retries - 1) throw error; // Si es el último intento, lanza el error
        }
    }
};
