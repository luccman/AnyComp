import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useMemo } from 'react';
import { Service } from '../types/service'; // Import Service type

export function useServiceDetail(id: string) {
  const services = useSelector((state: RootState) => state.services.items as Service[]); // Explicitly type

  return useMemo(() => services.find(service => service.id === id), [services, id]);
}
