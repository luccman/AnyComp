"use client";
import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { usePaginatedServices } from '../hooks/usePaginatedServices';
import ServiceCard from './ServiceCard';
import NavBar from './NavBar';
import Footer from './Footer';
import SearchBar from './SearchBar';

export default function ServicePage() {
  const { items, hasMore, loading } = useAppSelector(s => s.services);
  const { loadNext } = usePaginatedServices();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Memoize array reference (no transformation now, but pattern holds)
  const services = useMemo(() => items, [items]);

  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry.isIntersecting && hasMore && !loading) loadNext();
  }, [hasMore, loading, loadNext]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(onIntersect, { rootMargin: '600px 0px' });
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [onIntersect]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
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

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {services.map(s => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>

        <div ref={sentinelRef} className="py-8 flex justify-center">
          {loading && <span className="text-sm text-neutral-500">Loading…</span>}
          {!hasMore && !loading && <span className="text-sm text-neutral-400">End of results</span>}
        </div>
      </main>
      <Footer />
    </div>
  );
}