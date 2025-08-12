"use client";
import ServiceDetail from '../../../components/ServiceDetail';
import { useServiceDetail } from '../../../hooks/useServiceDetail';
import { useParams, useRouter } from 'next/navigation';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const service = useServiceDetail(id as string);

  if (!service) return <div className="text-center py-20">Loading...</div>;

  return (
    <div
      className="container mx-auto py-8"
    >
      <button
        onClick={() => router.back()}
        className="mb-4 text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>
      <ServiceDetail service={service} />
    </div>
  );
}
