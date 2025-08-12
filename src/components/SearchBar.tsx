"use client";
import { useState } from 'react';

export default function SearchBar({ onSearch }: { onSearch?: (query: string) => void }) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search services..."
      className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring focus:border-blue-300"
    />
  );
}
