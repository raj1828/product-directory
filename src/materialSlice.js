import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockMaterials } from "./mockData";

export const fetchMaterials = createAsyncThunk('materials/fetchMaterials', async () => {
       return mockMaterials;
});

const initialState = {
       materials: [],
       loading: false,
       error: null,
}

const materialSlice = createSlice({
       name: 'materials',
       initialState,
       reducers: {
              fetchMaterialsStart: (state) => {
                     state.loading = true;
              },
              fetchMaterialsSuccess: (state, action) => {
                     state.loading = false;
                     state.materials = action.payload;
              },
              fetchMaterialsFailure: (state, action) => {
                     state.loading = false;
                     state.error = action.payload;
              },
       },
       extraReducers: (builder) => {
              builder
                     .addCase(fetchMaterials.pending, (state) => {
                            state.loading = true;
                     })
                     .addCase(fetchMaterials.fulfilled, (state, action) => {
                            state.loading = false;
                            state.materials = action.payload;
                     })
                     .addCase(fetchMaterials.rejected, (state, action) => {
                            state.loading = false;
                            state.error = action.error.message;
                     });
       },
});

export const { fetchMaterialsFailure, fetchMaterialsStart, fetchMaterialsSuccess } = materialSlice.actions;
export default materialSlice.reducer;