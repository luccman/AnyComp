"use client";
import ServiceCard from './ServiceCard';
import Footer from './Footer';
import SearchBar from './SearchBar';
import PaginationControls from './PaginationControls';
import { usePagedServices } from '../hooks/usePagedServices';

export default function ServicePage() {
  const {
    services,
    currentPage,
    pageCount,
    loading,
    goToPage
  } = usePagedServices();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto flex-1 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Register a New Company</h1>
            <p className="text-neutral-600">Get Your Company Registered with a Trusted Company Secretary</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <SearchBar />
            <button className="px-4 py-2 bg-neutral-100 rounded border text-neutral-700">Price</button>
            <button className="px-4 py-2 bg-neutral-100 rounded border text-neutral-700">Sort by</button>
          </div>
        </div>

        {loading && services.length === 0 && (
          <div className="py-12 text-center text-sm text-neutral-500">Loading…</div>
        )}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {services.map(s => (
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