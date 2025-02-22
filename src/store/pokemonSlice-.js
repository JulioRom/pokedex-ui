import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPokemonDetail, fetchPokemonList, fetchPokemonTypes as fetchTypesFromAPI } from "../services/pokeApi";

// Acción asíncrona para obtener todos los Pokémon paginados
export const fetchAllPokemon = createAsyncThunk(
    "pokemon/fetchAllPokemon",
    async (page, { rejectWithValue }) => {
        try {
            const data = await fetchPokemonList(page);
            const filtData = data.results.map((pokemon) => ({
                id: pokemon.url.split("/").slice(-2, -1)[0],
                name: pokemon.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/").slice(-2, -1)[0]}.png`,
                
            }));
            return filtData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Acción asíncrona para obtener detalles de un Pokémon
export const fetchSelectedPokemon = createAsyncThunk(
    "pokemon/fetchSelectedPokemon",
    async (id, { rejectWithValue }) => {
        try {
            return await fetchPokemonDetail(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

//  Acción asíncrona para obtener los tipos de Pokémon
export const fetchPokemonTypes = createAsyncThunk(
    "pokemon/fetchPokemonTypes",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchTypesFromAPI();
            return data.results.map((type) => type.name);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        allPokemon: [],
        selectedPokemon: null,
        search: "",
        selectedType: "",
        types: [],
        status: "idle",
        error: null
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setSelectedType: (state, action) => {
            state.selectedType = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPokemon.fulfilled, (state, action) => {
                state.allPokemon = action.payload;
            })
            .addCase(fetchSelectedPokemon.fulfilled, (state, action) => {
                state.selectedPokemon = action.payload;
            })
            .addCase(fetchPokemonTypes.fulfilled, (state, action) => {
                state.types = action.payload;
            });
    }
});

export const { setSearch, setSelectedType } = pokemonSlice.actions;
export default pokemonSlice.reducer;
