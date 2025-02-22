// store/pokemonDetailSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemonDetails } from "../services/pokemonService";

export const fetchSelectedPokemon = createAsyncThunk(
    "pokemonDetail/fetchSelectedPokemon",
    async (id, { rejectWithValue }) => {
        try {
            return await getPokemonDetails(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const pokemonDetailSlice = createSlice({
    name: "pokemonDetail",
    initialState: { selectedPokemon: null, status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSelectedPokemon.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSelectedPokemon.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedPokemon = action.payload;
            })
            .addCase(fetchSelectedPokemon.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default pokemonDetailSlice.reducer;
