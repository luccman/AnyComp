// store/servicesSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Service } from '../types/service';
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '.';

interface ServicesState {
  items: Service[];          // Master list (stable object references)
  idMap: Record<string, true>; // Serializable dedupe map instead of Set
  page: number;
  hasMore: boolean;
  loading: boolean;
  error?: string;
}

const initialState: ServicesState = {
  items: [],
  idMap: {},
  page: 0,
  hasMore: true,
  loading: false
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    fetchStart(state) { state.loading = true; },
    fetchFail(state, action: PayloadAction<string>) {
      state.loading = false; state.error = action.payload;
    },
    appendServices(state, action: PayloadAction<{ page: number; services: Service[]; hasMore: boolean }>) {
      const { services, page, hasMore } = action.payload;
      // Only push NEW references to avoid reshaping existing indices
      for (const s of services) {
        if (!state.idMap[s.id]) {
          state.items.push(s);
          state.idMap[s.id] = true;
        }
      }
      state.page = page;
      state.hasMore = hasMore;
      state.loading = false;
    }
  }
});

export const { fetchStart, fetchFail, appendServices } = servicesSlice.actions;

export default servicesSlice.reducer;

export const selectServices = (state: RootState) => state.services.items;

// Example filtered (if needed) – stable output unless items actually change
export const selectServicesStable = createSelector(
  [selectServices],
  items => items
);