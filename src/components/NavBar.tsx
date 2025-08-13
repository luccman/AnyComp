import Link from 'next/link';
import SearchBar from './SearchBar';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 flex items-center justify-between px-70 py-7 shadow-sm">
      <div className="flex items-center gap-7">
        <Link href="/">
          <span className="mr-3 font-bold text-xl tracking-tight">ANYCOMP</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-[#222222]">Register a company</Link>
        <Link href="/services" className="text-sm font-medium text-[#222222]">Appoint a Company Secretary</Link>
        <Link href="/company-services" className="text-sm font-medium text-[#222222]">Company Secretarial Services</Link>
        <Link href="/how-anycomp-works" className="text-sm font-medium text-[#222222]">How Anycomp Works</Link>
        <SearchBar />
      </div>
      <div className="flex items-center gap-6">
        
        <MailOutlineIcon className="text-gray-500" fontSize="small" />
        <div className="relative">
          <NotificationsNoneIcon className="text-gray-500" fontSize="small" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </div>
        <img
          src="/pics/man.jpg"
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover"
        />
      </div>
    </nav>
  );
}
