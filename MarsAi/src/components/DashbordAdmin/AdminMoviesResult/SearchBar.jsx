import { Search } from 'lucide-react';

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="max-w-md mx-auto mb-6 relative">
      <Search
        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Rechercher un film…"
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
