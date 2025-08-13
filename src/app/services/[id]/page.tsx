"use client";
import ServiceDetail from '../../../components/ServiceDetail';
import { usePagedServices } from '../../../hooks/usePagedServices';
import { useParams } from 'next/navigation';

export default function ServiceDetailPage() {
  const { id } = useParams(); // Get the service ID from the URL
  const { services, loading } = usePagedServices(); // Fetch services using the hook

  // Find the service by ID
  const service = services.find(s => s.id === id);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!service) {
    return <div className="text-center py-20">Service not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <ServiceDetail service={service} />
    </div>
  );
}
