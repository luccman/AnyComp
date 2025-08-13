"use client";
import React, { memo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Service } from '../types/service';

const seenMap = new Set<string>(); // module-scope persists across renders

interface Props { service: Service; }

const ServiceCard = memo(function ServiceCard({ service }: Props) {
  const hasBeenSeenRef = useRef<boolean>(seenMap.has(service.id));
  const [ready, setReady] = useState(hasBeenSeenRef.current);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (!hasBeenSeenRef.current) {
      hasBeenSeenRef.current = true;
      seenMap.add(service.id);
      requestAnimationFrame(() => setReady(true));
    }
  }, []);

  const href = `/services/${encodeURIComponent(service.id)}`;

  // Add this function to handle click
  const handleCardClick = (e: React.MouseEvent) => {
    // Store current scroll position in sessionStorage
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    sessionStorage.setItem('clickedServiceId', service.id);
  };

  const clickedServiceId = typeof window !== "undefined" ? sessionStorage.getItem('clickedServiceId') : null;
  const isActiveLayoutId = clickedServiceId === service.id;

  return (
    <Link
      href={href}
      prefetch={false}
      className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
      onClick={handleCardClick}
    >
      <motion.article
        transition={{ duration: 0.4 }}
        className="rounded-xl bg-white cursor-pointer transition-transform duration-300 ease-out will-change-transform hover:scale-[1.03]"
      >
        <motion.div
          className="relative w-full h-64 bg-transparent"
          style={{ zIndex: 100 }}
        >
          <motion.img
            layoutId={`service-img-tag-${service.id}`}
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover rounded-xl"
            style={{ zIndex: 101 }}
            initial={{ opacity: isActiveLayoutId ? 0 : 1 }}
            animate={{ opacity: imgLoaded || isActiveLayoutId ? 1 : 0 }}
            transition={{ duration: isActiveLayoutId ? 0 : 0.7 }}
            onLoad={() => setImgLoaded(true)}
          />
        </motion.div>
        <div className="py-4 px-0">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={service.secretary.avatar}
              alt={service.secretary.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover bg-neutral-200"
            />
            <span className="font-semibold text-neutral-900 truncate">{service.secretary.name}</span>
            <span className="ml-auto text-xs text-neutral-500">{service.rating.toFixed(1)}★</span>
          </div>
          <h2 className="font-bold text-neutral-900 text-sm line-clamp-2">{service.title}</h2>
          <p className="text-neutral-500 text-xs line-clamp-2">{service.subtitle}</p>
          <div className="mt-2 font-semibold text-neutral-900">RM {service.price}</div>
        </div>
      </motion.article>
    </Link>
  );
}, (prev, next) => prev.service === next.service);

export default ServiceCard;
