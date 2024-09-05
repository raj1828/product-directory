import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockGrades } from "./mockData";

export const fetchGrades = createAsyncThunk('grades/fetchGrades', async () => {
       return mockGrades;
});

const initialState = {
       grades: [],
       loading: false,
       error: null
}

const gradeSlice = createSlice({
       name: 'grades',
       initialState,
       reducers: {
              fetchGradeStart: (state) => {
                     state.loading = true;
              },
              fetchGradeSuccess: (state, action) => {
                     state.loading = false;
                     state.grades = action.payload;
              },
              fetchGradeFailure: (state, action) => {
                     state.loading = false;
                     state.error = action.payload;
              }
       },
       extraReducers: (builder) => {
              builder
                     .addCase(fetchGrades.pending, (state) => {
                            state.loading = true;
                     })
                     .addCase(fetchGrades.fulfilled, (state, action) => {
                            state.loading = false;
                            state.grades = action.payload;
                     })
                     .addCase(fetchGrades.rejected, (state, action) => {
                            state.loading = false;
                            state.error = action.error.message;
                     });
       },

});

export const { fetchGradeStart, fetchGradeSuccess, fetchGradeFailure } = gradeSlice.actions;
export default gradeSlice.reducer;