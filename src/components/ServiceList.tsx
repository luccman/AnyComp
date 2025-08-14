"use client";
import ServiceCard from './ServiceCard';
import type { Service } from '../types/service'; // Adjust path as needed

interface Props {
  services: Service[];
}

export default function ServiceList({ services }: Props) {
  return (
    <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {services.map(s => (
        <ServiceCard key={s.id} service={s} />
      ))}
    </div>
  );
}