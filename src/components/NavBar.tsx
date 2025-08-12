import Link from 'next/link';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-4">
        <Link href="/">
          <span className="font-bold text-xl tracking-tight">ANYCOMP</span>
        </Link>
        <Link href="/register" className="ml-4 text-sm">Register a company</Link>
        <Link href="/services" className="ml-4 text-sm">Appoint a Company Secretary</Link>
        <Link href="/company-services" className="ml-4 text-sm">Company Secretarial Services</Link>
        <Link href="/how-anycomp-works" className="ml-4 text-sm">How Anycomp Works</Link>
      </div>
      <div className="flex items-center gap-4">
        <SearchBar />
        <button className="rounded-full bg-gray-100 p-2">
          <span className="material-icons">aaa</span>
        </button>
      </div>
    </nav>
  );
}
