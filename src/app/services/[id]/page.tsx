"use client";
import ServiceDetail from '../../../components/ServiceDetail';
import { useServiceDetail } from '../../../hooks/useServiceDetail';
import { useParams } from 'next/navigation';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const service = useServiceDetail(id as string);

  if (!service) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <ServiceDetail service={service} />
    </div>
  );
}
