"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Service } from '../types/service';

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  return (
    <Link href={`/services/${service.id}`}>
      <motion.div
        whileHover={{ scale: 1.03, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
        className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all cursor-pointer"
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-48 object-cover"  
          loading="lazy"
        />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={service.secretary.avatar}
              alt={service.secretary.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold text-[#222222]">{service.secretary.name} • Company Secretary</span>
            <span className="ml-auto text-gray-500 text-sm">⭐{service.rating} ({service.review_count})</span>
          </div>
          <h2 className="font-bold text-lg text-[#222222]">{service.title}</h2>
          <p className="text-gray-500 text-sm">{service.subtitle}</p>
          <div className="mt-2 font-semibold text-[#222222]">RM {service.price}</div>
        </div>
      </motion.div>
    </Link>
  );
}
