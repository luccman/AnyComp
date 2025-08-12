export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="mb-2 md:mb-0">© {new Date().getFullYear()} ANYCOMP. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
