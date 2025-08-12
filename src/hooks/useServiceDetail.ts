import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useMemo, useRef } from 'react';
import { Service } from '../types/service';

export function useServiceDetail(id: string) {
  const pages = useSelector((state: RootState) => state.services.pages);
  const lastRef = useRef<Service | undefined>(undefined);
  return useMemo(() => {
    const all: Service[] = Object.values(pages).flat();
    const found = all.find(s => s.id === id);
    if (found) lastRef.current = found;
    return found ?? lastRef.current;
  }, [pages, id]);
}
