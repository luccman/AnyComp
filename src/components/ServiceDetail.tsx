"use client"
import React from "react";
import { motion } from 'framer-motion';
import { Service } from '../types/service';
import Button from '@mui/material/Button';

interface Props {
  service: Service;
}

export default function ServiceDetail({ service }: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <h2 className="text-2xl font-bold text-[#222222] mb-2">{service.title}</h2>
        <div className="flex gap-3 mb-4">
          <img
            src={service.image}
            alt={service.title}
            className="rounded-lg w-[350px] h-[200px] object-cover"
          />
          {service.image_secondary_urls?.map((url, idx) => (
            <img key={idx} src={url} alt={`secondary-${idx}`} className="rounded-lg w-[100px] h-[100px] object-cover" />
          ))}
        </div>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="mb-4">
          <h3 className="font-semibold text-[#222222] mb-2">Additional Offerings</h3>
          <ul className="list-disc pl-5 text-gray-700">
            {service.offerings.map((offering, idx) => (
              <li key={idx}>{offering}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-[#222222] mb-2">Company Secretary</h3>
          <div className="flex items-center gap-3">
            <img
              src={service.secretary.avatar}
              alt={service.secretary.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="text-gray-800">
                {service.secretary.name} {service.secretary.verified && <span>✅verified</span>}
              </div>
              <div className="text-gray-600">{service.secretary.firm}</div>
              <div className="text-gray-500">{service.review_count} Clients ⭐{service.rating}</div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <strong className="text-[#222222]">Firm</strong>
          <div className="flex items-center gap-2">
            <img
              src={service.firm_logo_url}
              alt={service.secretary.firm}
              className="w-8 h-8"
            />
            <div className="text-gray-800">
              {service.secretary.firm}{' '}
              <span className="text-gray-500">{service.firm_years_experience} Years providing Company Services</span>
            </div>
          </div>
        </div>
        <div>
          <strong className="text-[#222222]">Certifications</strong>
          <div className="flex gap-2 text-gray-700">
            {service.secretary.certifications.map((cert, idx) => (
              <span key={idx}>{cert}</span>
            ))}
          </div>
        </div>
      </motion.div>
      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full lg:w-96 bg-white rounded-lg shadow p-6 h-fit"
      >
        <div className="text-3xl font-bold text-[#222222] mb-2">RM {service.price}</div>
        <div className="text-gray-600 mb-4">Completes within {service.duration_days} business days</div>
        <ul className="mb-6 text-gray-700 list-disc pl-5">
          {service.benefits.map((benefit, idx) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: 'bold', fontSize: '1rem', py: 1.5, borderRadius: 2 }}
        >
          Appoint Company Secretary
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 2, fontWeight: 'bold', fontSize: '1rem', py: 1.5, borderRadius: 2 }}
        >
          How Anycomp Works
        </Button>
      </motion.div>
    </div>
  );
}
