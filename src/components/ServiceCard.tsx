"use client";
import React, { memo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { Service } from '../types/service';

const seenMap = new Set<string>(); // module-scope persists across renders

interface Props { service: Service; }

const ServiceCard = memo(function ServiceCard({ service }: Props) {
  const hasBeenSeenRef = useRef<boolean>(seenMap.has(service.id));

  // Mount/unmount logs
  useEffect(() => {
    console.log(`[MOUNT] Product ${service.id} mounted`);
    return () => {
      console.log(`[UNMOUNT] Product ${service.id} unmounted`);
    };
  }, []);

  // Render/unrender logs
  useEffect(() => {
    console.log(`[RENDER] Product ${service.id} rendered`);
    return () => {
      console.log(`[UNRENDER] Product ${service.id} unrendered`);
    };
  });

  useEffect(() => {
    if (!hasBeenSeenRef.current) {
      hasBeenSeenRef.current = true;
      seenMap.add(service.id);
    }
  }, []);

  // Debug prop changes
  const prevServiceRef = useRef<Service | null>(null);
  useEffect(() => {
    if (prevServiceRef.current) {
      const prev = prevServiceRef.current;
      const next = service;
      const changes: Record<string, { prev: unknown; next: unknown }> = {};
      Object.keys(next).forEach(key => {
        if (prev[key as keyof Service] !== next[key as keyof Service]) {
          changes[key] = {
            prev: prev[key as keyof Service],
            next: next[key as keyof Service]
          };
        }
      });
      if (Object.keys(changes).length > 0) {
        console.log(`[ServiceCard] Prop changes for ${service.id}:`, changes);
      } else {
        console.log(`[ServiceCard] No prop changes for ${service.id}`);
      }
    }
    prevServiceRef.current = service;
  }, [service]);

  const href = `/services/${encodeURIComponent(service.id)}`;


  const clickedServiceId = typeof window !== "undefined" ? sessionStorage.getItem('clickedServiceId') : null;

  return (
    <Link
      href={href}
      prefetch={true}
      className="block focus:outline-none focus:ring-2 focus:ring-blue-900 rounded-xl"
    >
      <motion.article
        //  transition={{ duration: 0.4 }}
        className="rounded-xl bg-white cursor-pointer hover:scale-[1.03] hover:duration-300 ease-in-out" //transition-all duration-300 ease-in-out
      >
        <motion.div
          className="relative w-full h-64 bg-transparent"
        >
          <motion.div style={{ width: '100%', height: '100%' }}>
            <Image
              src={service.image_main_url}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-full object-cover rounded-xl"
              priority
            />
          </motion.div>
        </motion.div>
        <div className="py-4 px-0">
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={service.secretary_avatar_url}
              alt={service.secretary_name}
              width={25}
              height={25}
              className=" rounded-full object-cover bg-neutral-200"
            />
            <span className="text-xs font-semibold text-neutral-900 truncate">{service.secretary_name}</span> 
            <p className="text-xs text-neutral-500">• Company Secretary</p>
            <span className="ml-auto text-xs text-neutral-500">★{service.rating.toFixed(1)}</span>
            <p className="text-xs text-neutral-500">({service.review_count})</p>
          </div>
          <h2 className=" text-neutral-500 text-md line-clamp-2">{service.title}</h2>
          <div className="mt-2 font-semibold text-neutral-900 text-lg">RM {service.price}</div>
        </div>
      </motion.article>
    </Link>
  );
}, (prev, next) => prev.service === next.service);

export default React.memo(ServiceCard);
