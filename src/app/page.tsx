import ServiceBrowser from '../components/ServiceBrowser';
import RouteTransition from '../components/RouteTransition';
import { Home } from '@mui/icons-material';

export default function Page() {
  return (
    <RouteTransition>
      <div className="min-h-screen flex flex-col">
        <main className="container mx-auto flex-1 py-8 px-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <div className="flex items-center text-sm text-neutral-500 mb-2 gap-2">
                <Home fontSize="small" className="text-blue-900" />
                <span>/</span>
                <span>Company Secretary services</span>
                <span>/</span>
                <span className="text-neutral-900 font-semibold">Register a New Company</span>
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Register a New Company</h1>
              <p className="text-neutral-600 mb-4">Get Your Company Registered with a Trusted Company Secretary</p>
            </div>
          </div>
          <ServiceBrowser />
        </main>
      </div>
    </RouteTransition>
  );
}