// store/pokemonListSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPokemon } from "../services/pokemonService"; // 🔹 Usamos `getAllPokemon` en lugar de `getPokemonList`

// ✅ Obtener todos los Pokémon en una sola solicitud
export const fetchAllPokemon = createAsyncThunk(
    "pokemonList/fetchAllPokemon",
    async (_, { rejectWithValue }) => { // 🔹 Eliminamos `page` porque ya no paginamos
        try {
            return await getAllPokemon();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const pokemonListSlice = createSlice({
    name: "pokemonList",
    initialState: { allPokemon: [], status: "idle", error: null, search: "", selectedType: "" },
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
            .addCase(fetchAllPokemon.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllPokemon.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allPokemon = action.payload || [];
            })
            .addCase(fetchAllPokemon.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { setSearch, setSelectedType } = pokemonListSlice.actions;
export default pokemonListSlice.reducer;
