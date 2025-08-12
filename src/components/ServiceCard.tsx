"use client";
import React, { memo, useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import type { Service } from '../types/service';

const seenMap = new Set<string>(); // module-scope persists across renders

interface Props { service: Service; }

const ServiceCard = memo(function ServiceCard({ service }: Props) {
  const hasBeenSeenRef = useRef<boolean>(seenMap.has(service.id));
  const [ready, setReady] = useState(hasBeenSeenRef.current);

  useEffect(() => {
    if (!hasBeenSeenRef.current) {
      hasBeenSeenRef.current = true;
      seenMap.add(service.id);
      // minimal stagger can be added here if desired
      requestAnimationFrame(() => setReady(true));
    }
  }, []);

  const href = `/services/${encodeURIComponent(service.id)}`;

  return (
    <Link href={href} prefetch={false} className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
      <article
        className={
          "rounded-lg bg-white overflow-hidden shadow-sm transition-colors cursor-pointer " +
          (ready ? "opacity-100" : "opacity-0")
        }
        style={{ willChange: 'auto' }}
      >
        <div className="relative w-full h-48 bg-neutral-100">
          <img
            src={service.image}
            alt={service.title}
              // Reserve space; object-cover avoids layout jump
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={service.secretary.avatar}
              alt={service.secretary.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover bg-neutral-200"
              loading="lazy"
              decoding="async"
            />
            <span className="font-semibold text-neutral-900 truncate">{service.secretary.name}</span>
            <span className="ml-auto text-xs text-neutral-500">{service.rating.toFixed(1)}★</span>
          </div>
          <h2 className="font-bold text-neutral-900 text-sm line-clamp-2">{service.title}</h2>
          <p className="text-neutral-500 text-xs line-clamp-2">{service.subtitle}</p>
          <div className="mt-2 font-semibold text-neutral-900">RM {service.price}</div>
        </div>
      </article>
    </Link>
  );
}, (prev, next) => prev.service === next.service); // reference equality check (stable due to slice logic)

export default ServiceCard;
