import { createSlice } from "@reduxjs/toolkit";

const moveSlice = createSlice({
    name: "moves",
    initialState: { moves: [] },  // 🔹 Estado vacío temporal
    reducers: {}
});

// 🔹 Exportamos un reducer vacío para evitar errores en Redux
export default moveSlice.reducer;
