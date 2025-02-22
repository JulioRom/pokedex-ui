// store/typeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemonTypes } from "../services/typeService";

export const fetchPokemonTypes = createAsyncThunk(
    "types/fetchPokemonTypes",
    async (_, { rejectWithValue }) => {
        try {
            return await getPokemonTypes();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const typeSlice = createSlice({
    name: "types",
    initialState: { types: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemonTypes.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPokemonTypes.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.types = action.payload;
            })
            .addCase(fetchPokemonTypes.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default typeSlice.reducer;
