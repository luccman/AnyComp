"use client";
import SearchIcon from '@mui/icons-material/Search';


export default function SearchBar() {
 

  return (
    <div className="flex items-center">
      <input
        type="text"

        placeholder="Search for any services"
        className="border border-gray-300 rounded-l px-3 py-2 w-50 h-9 text-xs focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        className="bg-blue-900 hover:bg-blue-500 text-white rounded-r flex items-center justify-center px-2 h-9"
        style={{ minWidth: '32px' }}
        aria-label="Search"
      >
        <SearchIcon fontSize="small" />
      </button>
    </div>
  );
}
