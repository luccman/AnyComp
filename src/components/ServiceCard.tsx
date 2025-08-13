"use client";
import React, { memo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Service } from '../types/service';

const seenMap = new Set<string>(); // module-scope persists across renders

interface Props { service: Service; }

const ServiceCard = memo(function ServiceCard({ service }: Props) {
  const hasBeenSeenRef = useRef<boolean>(seenMap.has(service.id));
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    if (!hasBeenSeenRef.current) {
      hasBeenSeenRef.current = true;
      seenMap.add(service.id);
    }
  }, []);

  const href = `/services/${encodeURIComponent(service.id)}`;


  const clickedServiceId = typeof window !== "undefined" ? sessionStorage.getItem('clickedServiceId') : null;
  const isActiveLayoutId = clickedServiceId === service.id;

  return (
    <Link
      href={href}
      prefetch={false}
      className="block focus:outline-none focus:ring-2 focus:ring-blue-900 rounded-xl"
    >
      <motion.article
        //  transition={{ duration: 0.4 }}
        className="rounded-xl bg-white cursor-pointer hover:scale-[1.03] transition-all duration-300 ease-in-out "
      >
        <motion.div
          className="relative w-full h-64 bg-transparent"
          //style={{ zIndex: 100 }}
        >
          <motion.img
            // layoutId={`service-img-tag-${service.id}`}
            src={service.image_main_url}
            alt={service.title}
            className="w-full h-full object-cover rounded-xl"
            //style={{ zIndex: 101 }}
            // initial={{ opacity: isActiveLayoutId ? 1 : 1 }}
            // animate={{ opacity: imgLoaded || isActiveLayoutId ? 1 : 0 }}
            transition={{ duration: isActiveLayoutId ? 0 : 0.7 }}
            onLoad={() => setImgLoaded(true)}
          />
        </motion.div>
        <div className="py-4 px-0">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={service.secretary_avatar_url}
              alt={service.secretary_name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover bg-neutral-200"
            />
            <span className="font-semibold text-neutral-900 truncate">{service.secretary_name}</span>
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

export default React.memo(ServiceCard);
