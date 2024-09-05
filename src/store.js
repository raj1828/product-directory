import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'
import materialReducer from './materialSlice';
import gradeReducer from './gradeSlice';

const store = configureStore({
       reducer: {
              // Add Reducer
              products: productReducer,

              materials: materialReducer,

              grades: gradeReducer,
       },
});

export default store;