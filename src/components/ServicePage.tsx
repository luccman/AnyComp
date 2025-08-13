"use client";
import ServiceCard from './ServiceCard';
import Footer from './Footer';
import PaginationControls from './PaginationControls';
import { usePagedServices } from '../hooks/usePagedServices';
import { Home } from '@mui/icons-material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

const priceOptions = ['None', 'Lowest', 'Highest'];
const sortOptions = ['None', 'Rating', 'Newest', 'Popular'];

export default function ServicePage() {
  const {
    services,
    currentPage,
    pageCount,
    loading,
    goToPage
  } = usePagedServices();

  const [selectedPrice, setSelectedPrice] = useState(priceOptions[0]);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  const sortedServices = [...services];
  if (selectedPrice === 'Highest') {
    sortedServices.sort((a, b) => b.price - a.price);
  } else if (selectedPrice === 'Lowest') {
    sortedServices.sort((a, b) => a.price - b.price);
  }
  // If 'None', do not sort by price

  if (selectedSort === 'Rating') {
    sortedServices.sort((a, b) => b.rating - a.rating);
  }
  // If 'None', do not sort by sort option

  const displayedServices = sortedServices;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto flex-1 py-8 px-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <div className="flex items-center text-sm text-neutral-500 mb-2 gap-2">
              <Home fontSize="small" className="text-blue-900" />
              <span>/</span>
              <span>Company Secretary services</span>
              <span>/</span>
              <span className="text-neutral-900 font-semibold">Register a New Company</span>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Register a New Company</h1>
            <p className="text-neutral-600 mb-4">Get Your Company Registered with a Trusted Company Secretary</p>
            <div className="flex gap-4 mb-6">
              <FormControl variant="outlined" size="small">
                <InputLabel>Price</InputLabel>
                <Select
                  label="Price"
                  value={selectedPrice}
                  onChange={e => setSelectedPrice(e.target.value)}
                >
                  {priceOptions.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" size="small">
                <InputLabel>Sort by</InputLabel>
                <Select
                  label="Sort by"
                  value={selectedSort}
                  onChange={e => setSelectedSort(e.target.value)}
                >
                  {sortOptions.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        {loading && services.length === 0 && (
          <div className="py-12 text-center text-sm text-neutral-500">Loading…</div>
        )}

        <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayedServices.map(s => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>

        <PaginationControls
          page={currentPage + 1}
          count={pageCount}
          onChange={(_, value) => goToPage(value - 1)}
        />

        {loading && services.length > 0 && (
          <div className="mt-4 text-center text-xs text-neutral-400">Loading page…</div>
        )}
      </main>
      <Footer />
    </div>
  );
}