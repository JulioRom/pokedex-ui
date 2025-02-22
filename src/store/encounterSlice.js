import { createSlice } from "@reduxjs/toolkit";

const encountersSlice = createSlice({
    name: "encounters",
    initialState: { encounters: [] },  
});

export default encountersSlice.reducer;
