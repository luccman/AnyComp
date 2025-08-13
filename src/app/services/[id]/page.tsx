import ServiceDetail from '../../../components/ServiceDetail';
import { createClient } from '@supabase/supabase-js';

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
  const { data } = await supabase.from("services").select("id");
  return (data ?? []).map((service: { id: string }) => ({
    id: service.id,
  }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (!service) return <div>Service not found.</div>;
  return (
    <div className="container mx-auto py-8">
      <ServiceDetail service={service} />
    </div>
  );
}