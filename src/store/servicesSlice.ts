import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '.';
import type { Service } from '../types/service';

interface ServicesState {
  pages: Record<number, Service[]>;   // cached pages
  currentPage: number;                // 0-based
  pageSize: number;
  total: number | null;               // total rows
  loading: boolean;
  error?: string;
}

const initialState: ServicesState = {
  pages: {},
  currentPage: 0,
  pageSize: 24,
  total: null,
  loading: false,
  error: undefined
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = undefined;
    },
    fetchFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    storePage(
      state,
      action: PayloadAction<{ page: number; services: Service[]; total: number }>
    ) {
      const { page, services, total } = action.payload;
      state.pages[page] = services;      // cache page
      state.total = total;
      state.loading = false;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    resetServices(state) {
      state.pages = {};
      state.currentPage = 0;
      state.total = null;
      state.loading = false;
      state.error = undefined;
    },
    setServicesPage(
      state,
      action: PayloadAction<{ page: number; services: Service[] }>
    ) {
      state.pages[action.payload.page] = action.payload.services;
    },
  }
});

export const { fetchStart, fetchFail, storePage, setCurrentPage, resetServices, setServicesPage } = servicesSlice.actions;
export default servicesSlice.reducer;

// Selectors
export const selectServicesState = (s: RootState) => s.services;
export const selectCurrentServices = createSelector(
  [(s: RootState) => s.services.pages, (s: RootState) => s.services.currentPage],
  (pages, currentPage) => pages[currentPage] ?? []
);
export const selectPaginationMeta = createSelector(
  [(s: RootState) => s.services],
  ({ currentPage, pageSize, total, loading, error, pages }) => ({
    currentPage,
    pageSize,
    total,
    pageCount:
      total != null ? Math.max(1, Math.ceil(total / pageSize)) : Object.keys(pages).length || 1,
    loading,
    error,
  })
);