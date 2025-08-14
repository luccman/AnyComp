"use client";
import { useState } from 'react';
import ServiceList from './ServiceList';
import SortDropdown from './SortDropdown';
import PaginationControls from './PaginationControls';
import { usePagedServices } from '../hooks/usePagedServices';

const priceOptions = ['None', 'Lowest', 'Highest'];
const sortOptions = ['None', 'Rating', 'Newest', 'Popular'];

export default function ServiceBrowser() {
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
  if (selectedSort === 'Rating') {
    sortedServices.sort((a, b) => b.rating - a.rating);
  }

  return (
    <>
      <div className="flex gap-4 mb-6">
        <SortDropdown
          label="Price"
          value={selectedPrice}
          options={priceOptions}
          onChange={setSelectedPrice}
        />
        <SortDropdown
          label="Sort by"
          value={selectedSort}
          options={sortOptions}
          onChange={setSelectedSort}
        />
      </div>
      <ServiceList services={sortedServices} />
      <PaginationControls
        page={currentPage + 1}
        count={pageCount}
        onChange={(_, value) => goToPage(value - 1)}
      />
      {loading && services.length === 0 && (
        <div className="py-12 text-center text-sm text-neutral-500">Loading…</div>
      )}
      {loading && services.length > 0 && (
        <div className="mt-4 text-center text-xs text-neutral-400">Loading page…</div>
      )}
    </>
  );
}