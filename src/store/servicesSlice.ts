// store/servicesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    items: [],
    visibleCount: 12, // Add this to persist visible count
    loading: false,
    error: null,
    // ... any other existing state
  },
  reducers: {
    setServices: (state, action) => {
      state.items = action.payload;
    },
    incrementVisibleCount: (state) => {
      state.visibleCount += 12;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // ... any other existing reducers
  },
});

export const { 
  setServices, 
  incrementVisibleCount, 
  setLoading, 
  setError 
} = servicesSlice.actions;

export default servicesSlice.reducer;