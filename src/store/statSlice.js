import { createSlice } from "@reduxjs/toolkit";

const statsSlice = createSlice({
    name: "stats",
    initialState: { stats: [] },  // Estado vacío temporal
    reducers: {}
});

// Exportamos un reducer vacío para evitar errores en Redux
export default statsSlice.reducer;
