"use client";

import ServiceCard from '../components/ServiceCard';
import PaginationControls from '../components/PaginationControls';
import SearchBar from '../components/SearchBar';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { incrementVisibleCount } from '../store/servicesSlice';
import { useFetchServices } from '../hooks/useFetchServices';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Service } from '../types/service';

export default function ServicesPage() {
  useFetchServices();
  const dispatch = useAppDispatch();
  
  // Get data and visibleCount from Redux
  const allServices = useAppSelector(state => state.services.items as Service[]);
  const visibleCount = useAppSelector(state => state.services.visibleCount);

  const fetchMoreData = () => {
    // Only increase if we actually have more to show
    if (visibleCount < allServices.length) {
      dispatch(incrementVisibleCount());
    }
  };

  const servicesToRender = allServices.slice(0, visibleCount);

  return (
    <div className="container mx-auto py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <span>Home</span> / <span>Company Secretary services</span> / <span>Register a New Company</span>
      </nav>

      {/* Title and Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#222222] mb-2">Register a New Company</h1>
          <p className="text-gray-600">Get Your Company Registered with a Trusted Company Secretary</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <SearchBar />
          <button className="px-4 py-2 bg-gray-100 rounded text-gray-700 border">Price</button>
          <button className="px-4 py-2 bg-gray-100 rounded text-gray-700 border">Sort by</button>
        </div>
      </div>

      {/* Service List with Infinite Scroll */}
      <InfiniteScroll
        dataLength={servicesToRender.length}
        next={fetchMoreData}
        hasMore={visibleCount < allServices.length}
        loader={<h4 className="text-center py-4">Loading...</h4>}
        scrollThreshold={0.95}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {servicesToRender.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </InfiniteScroll>

      <PaginationControls />
    </div>
  );
}