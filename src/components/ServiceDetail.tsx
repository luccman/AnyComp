"use client"
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Service } from '../types/service';
import Button from '@mui/material/Button';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckIcon from '@mui/icons-material/Check';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CertificateIcon from '@mui/icons-material/WorkspacePremium';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

interface Props {
  service: Service;
}

const FADE_DURATION = 1.3;
const TITLE_DELAY = 0.1;
const SECONDARY_IMG_BASE_DELAY = 0.6;
const OFFERINGS_DELAY = 0.3;
const DESCRIPTION_DELAY = 0.3;
const SECRETARY_DELAY = 0.4;
const FIRM_DELAY = 0.5;
const CERTIFICATIONS_DELAY = 0.6;
const RIGHT_PANEL_DELAY = 0.2;

const offeringDetails = [
  {
    title: "Company Secretary Subscription",
    description: "Enjoy 1 month free Company Secretary Subscription",
    Icon: BusinessCenterIcon
  },
  {
    title: "Opening of a Bank Account",
    description: "Complimentary Corporate Bank Account Opening",
    Icon: AccountBalanceIcon
  },
  {
    title: "Priority Filling",
    description: "Documents are prioritized for submission and swift processing within 24 hours",
    Icon: FlashOnIcon
  },
  {
    title: "Registered Office Address Use",
    description: "Use of SSM-Compliant Registered Office Address with Optional Mail Forwarding",
    Icon: LocationOnIcon
  },
  {
    title: "Compliance Calendar Setup",
    description: "Get automated reminders for all statutory deadlines",
    Icon: CalendarTodayIcon
  },
  {
    title: "First Share Certificate Issued Free",
    description: "Receive your company's first official share certificate at no cost",
    Icon: CertificateIcon
  },
  {
    title: "CTC Delivery & Courier Handling",
    description: "Have your company documents and certified copies delivered securely to you",
    Icon: LocalShippingIcon
  },
  {
    title: "Chat Support",
    description: "Always-On Chat Support for Compliance, Filing, and General Queries",
    Icon: HeadsetMicIcon
  }
];

export default function ServiceDetail({ service }: Props) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [mainImageError, setMainImageError] = useState(false);
  const [secondaryImageErrors, setSecondaryImageErrors] = useState<boolean[]>([]);
  
  // Add this effect to handle scroll restoration
  useEffect(() => {
    const clickedServiceId = sessionStorage.getItem('clickedServiceId');
    
    // Only apply special handling if this is the service that was clicked
    if (clickedServiceId === service.id) {
      // Temporarily scroll to where user was when they clicked
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        
        // After transition completes, scroll to top (if desired)
        // This timeout should match your transition duration
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 700);
      }
      
      // Clear storage
      sessionStorage.removeItem('scrollPosition');
      sessionStorage.removeItem('clickedServiceId');
    }
  }, [service.id]);

  const handleMainImageError = () => setMainImageError(true);
  const handleSecondaryImageError = (index: number) => {
    setSecondaryImageErrors(prev => {
      const updatedErrors = [...prev];
      updatedErrors[index] = true;
      return updatedErrors;
    });
  };

  return (
    <motion.div className="flex flex-col lg:flex-row gap-8">
      {/* Left Side */}
      <motion.div className="flex-1">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_DURATION, delay: TITLE_DELAY }}
          className="text-4xl font-medium text-[#222222] mb-5"
        >
          {service.title}
        </motion.h2>
        <div className="flex gap-6 mb-8">
          {/* Main image: big square */}
          <motion.div
            className="w-100 h-100 rounded-lg bg-white flex-shrink-0"
            style={{ zIndex: isAnimating ? 100 : 'auto' }}
            onLayoutAnimationStart={() => setIsAnimating(true)}
            onLayoutAnimationComplete={() => setIsAnimating(false)}
          >
            <motion.img
              layoutId={`service-img-tag-${service.id}`}
              src={service.image}
              alt={service.title}
              className="w-full h-full rounded-lg object-cover"
              style={{ zIndex: isAnimating ? 101 : 'auto' }}
              transition={{ type: 'tween', duration: 0.7, ease: 'easeInOut' }}
            />
          </motion.div>
          {/* Secondary images: stacked vertically, next to main image */}
          <div className="flex flex-col gap-4 justify-between h-[400px]">
            {service.image_secondary_urls?.slice(0, 2).map((url, idx) => (
              !secondaryImageErrors[idx] && (
                <motion.img
                  key={idx}
                  src={url}
                  alt={`secondary-${idx}`}
                  className="rounded-lg w-100 h-48 object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: FADE_DURATION, delay: SECONDARY_IMG_BASE_DELAY + idx * 0.1 }}
                  onError={() => handleSecondaryImageError(idx)} // Handle image load failure
                />
              )
            ))}
          </div>
        </div>
        {/* Description */}
        <motion.p
          className="text-3xl mb-4 font-semibold text-[#222222]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_DURATION, delay: DESCRIPTION_DELAY }}
        >
          Description
        </motion.p>
        <motion.p
          className="text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_DURATION, delay: DESCRIPTION_DELAY }}
        >
          {service.description}
        </motion.p>
        {/* Additional Offerings */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_DURATION, delay: OFFERINGS_DELAY }}
        >
          <h3 className="font-semibold text-[#222222] mb-4 text-3xl pt-4">Additional Offerings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-9 text-gray-700">
            {service.offerings.map((offering, idx) => {
              const details = offeringDetails.find(d => d.title === offering);
              if (!details) return null;
              const Icon = details.Icon;
              return (
                <div key={idx} className="flex items-start gap-3">
                  <Icon sx={{ fontSize: 24, color: '#000000ff' }} />
                  <div>
                    <strong className="text-[#222222]">{details.title}</strong>
                    <div className="text-gray-500 text-sm">{details.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
        {/* Company Secretary */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: SECRETARY_DELAY }}
        >
          <h3 className="font-semibold text-[#222222] mb-2 text-3xl">Company Secretary</h3>
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
        </motion.div>
        {/* Firm */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_DURATION, delay: FIRM_DELAY }}
        >
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
        </motion.div>
        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: FADE_DURATION, delay: CERTIFICATIONS_DELAY }}
        >
          <strong className="text-[#222222]">Certifications</strong>
          <div className="flex gap-2 text-gray-700">
            {service.secretary.certifications.map((cert, idx) => (
              <span key={idx}>{cert}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: RIGHT_PANEL_DELAY, duration: FADE_DURATION }}
        className="w-full lg:w-140 bg-white rounded-lg shadow-2xl p-10 h-fit"
      >
        
        <div className="text-3xl font-small text-[#222222] mb-2 pt-1">RM {service.price}</div>
        {/* Duration with MUI Clock Icon */}
        <div className="text-gray-600 mb-4 flex items-center gap-2">
          <AccessTimeOutlinedIcon sx={{ fontSize: 20, color: '#000000ff' }} />
          Completes within {service.duration_days} business days
        </div>
        <div className="mb-3 text-black">Register your company on Anycomp to enjoy several benefits</div>
        <ul className="mb-6 text-gray-700 list-disc">
          {service.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-2 inline-flex">
          <CheckIcon sx={{ fontSize: 20, color: '#000000ff' }} />
              {benefit}
            </li>
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
  </motion.div>
  );
}
