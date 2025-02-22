// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import pokemonListReducer from "./pokemonListSlice";
import pokemonDetailReducer from "./pokemonDetailSlice";
import typeReducer from "./typeSlice";
import moveReducer from "./moveSlice";
import encounterReducer from "./encounterSlice";
import statReducer from "./statSlice";

export const store = configureStore({
    reducer: {
        pokemonList: pokemonListReducer,  
        pokemonDetail: pokemonDetailReducer,
        types: typeReducer,
        moves: moveReducer,
        encounters: encounterReducer,
        stats: statReducer
    },
});
