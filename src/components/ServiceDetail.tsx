"use client"
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Service } from '../types/service';
import Button from '@mui/material/Button';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckIcon from '@mui/icons-material/Check';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CertificateIcon from '@mui/icons-material/WorkspacePremium';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import VerifiedIcon from '@mui/icons-material/Verified';
import Image from 'next/image';

interface Props {
  service: Service;
}



const offeringDetails = [
  {
    title: "Company Secretary Subscription",
    description: "Enjoy 1 month free Company Secretary Subscription",
    Icon: PersonAddAltIcon
  },
  {
    title: "Opening of a Bank Account",
    description: "Complimentary Corporate Bank Account Opening",
    Icon: AccountBalanceIcon
  },
  {
    title: "Priority Filling",
    description: "Documents are prioritized for submission and swift processing within 24 hours",
    Icon: ElectricBoltIcon
  },
  {
    title: "Registered Office Address Use",
    description: "Use of SSM-Compliant Registered Office Address with Optional Mail Forwarding",
    Icon: PlaceOutlinedIcon
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

  // Parse secondary images (CSV or JSON string)
  let secondaryImages: string[] = [];
  if (service.image_secondary_urls) {
    try {
      if (service.image_secondary_urls.startsWith('[')) {
        secondaryImages = JSON.parse(service.image_secondary_urls);
      } else {
        secondaryImages = service.image_secondary_urls.split(',').map(s => s.trim()).filter(Boolean);
      }
    } catch {
      secondaryImages = [];
    }
  }

  // Parse certifications (CSV or JSON string)
  let certifications: string[] = [];
  if (service.certifications) {
    try {
      if (service.certifications.startsWith('[')) {
        certifications = JSON.parse(service.certifications);
      } else {
        certifications = service.certifications.split(',').map(s => s.trim()).filter(Boolean);
      }
    } catch {
      certifications = [];
    }
  }

  // Build offerings array from boolean flags
  const offerings: string[] = [];
  if (service.offering_company_secretary_subscription) offerings.push("Company Secretary Subscription");
  if (service.offering_bank_account_opening) offerings.push("Opening of a Bank Account");
  if (service.offering_priority_filing) offerings.push("Priority Filling");
  if (service.offering_registered_office) offerings.push("Registered Office Address Use");
  if (service.offering_compliance_calendar) offerings.push("Compliance Calendar Setup");
  if (service.offering_first_share_cert) offerings.push("First Share Certificate Issued Free");
  if (service.offering_ctc_delivery) offerings.push("CTC Delivery & Courier Handling");
  if (service.offering_chat_support) offerings.push("Chat Support");

  // Example benefits (replace with actual if you have them in Service)
  const benefits: string[] = [
    "Fast SSM registration",
    "No paperwork hassle",
    "Expert compliance support",
    "Transparent pricing"
  ];

  // Add this effect to handle scroll restoration
  // useEffect(() => {
  //   const clickedServiceId = sessionStorage.getItem('clickedServiceId');

  //   // Only apply special handling if this is the service that was clicked
  //   if (clickedServiceId === service.id) {
  //     // Temporarily scroll to where user was when they clicked
  //     const savedPosition = sessionStorage.getItem('scrollPosition');
  //     if (savedPosition) {
  //       window.scrollTo(0, parseInt(savedPosition));
  //       // After transition completes, scroll to top (if desired)
  //       // This timeout should match your transition duration
  //       setTimeout(() => {
  //         window.scrollTo({ top: 0, behavior: 'smooth' });
  //       }, 500);
  //     }
  //     // Clear storage
  //     sessionStorage.removeItem('scrollPosition');
  //     sessionStorage.removeItem('clickedServiceId');
  //   }
  // }, [service.id]);

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
        <h2
          className="text-4xl font-medium text-[#222222] mb-5"
        >
          {service.title}
        </h2>
        <div className="flex gap-6 mb-8">
          {/* Main image: big square */}
          <motion.div
            className="w-100 h-100 rounded-lg bg-white flex-shrink-0"
            style={{ zIndex: isAnimating ? 100 : 'auto' }}
            onLayoutAnimationStart={() => setIsAnimating(true)}
            onLayoutAnimationComplete={() => setIsAnimating(false)}
          >
            <motion.img
              // layoutId={`service-img-tag-${service.id}`}
              src={service.image_main_url}
              alt={service.title}
              className="w-full h-full rounded-lg object-cover"
              style={{ zIndex: isAnimating ? 101 : 'auto' }}
              transition={{  duration: 0.7, ease: 'easeInOut' }}
              onError={handleMainImageError}
            />
          </motion.div>
          {/* Secondary images: stacked vertically, next to main image */}
          <div className="flex flex-col gap-4 justify-between h-[400px]">
            {secondaryImages.slice(0, 2).map((url: string, idx: number) => (
              !secondaryImageErrors[idx] && (
                <Image
                  width={100}
                  height={48}
                  key={idx}
                  src={url}
                  alt={`secondary-${idx}`}
                  className="w-100 h-48 rounded-lg  object-cover"
                  onError={() => handleSecondaryImageError(idx)}
                />
              )
            ))}
          </div>
        </div>
        {/* Description */}
        <p
          className="text-2xl mb-4 font-semibold text-[#222222]"
        >
          Description
        </p>
        <p className="text-gray-600 mb-6 text-sm">
          {"From idea to SSM-approved - we register your company with ease. No paperwork hassle, just fast, compliant peace of mind guaranteed. Your trusted Company Secretary in Malaysia, ready to serve, Start your business strong-with expert care you deserve."}
        </p>
        {/* Animated gray line above Additional Offerings */}
        <hr
          className="w-full border-t-2 border-gray-300 my-8 rounded"
        />
        {/* Additional Offerings */}
        <div
          className="mb-4"
        >
          <h3 className="font-semibold text-[#222222] mb-4 text-2xl pt-4">Additional Offerings</h3>
          <div className="grid  md:grid-cols-2 gap-5 text-gray-700 pb-5">
            {offerings.map((offering: string, idx: number) => {
              const details = offeringDetails.find(d => d.title === offering);
              if (!details) return null;
              const Icon = details.Icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <Icon sx={{ fontSize: 28, color: '#000000ff' }} />
                  <div>
                    <strong className="text-[#222222] text-md">{details.title}</strong>
                    <div className="text-gray-500 text-sm">{details.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Animated gray line above Company Secretary section */}
        <hr
          className="w-full border-t-2 border-gray-300 my-8 rounded"
        />
        {/* Company Secretary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Left: Secretary profile and info */}
          <div>
            <h3 className="font-semibold text-[#222222] mb-3 text-2xl">Company Secretary</h3>
            <div className="flex items-center gap-3 mb-2">
              <Image
                width={14}
                height={14} 
                src={service.secretary_avatar_url}
                alt={service.secretary_name}
                className="rounded-full"
              />
              <div>
                <div className="text-lg font-semibold text-[#222222] flex items-center gap-2">
                  {service.secretary_name}
                  {service.secretary_verified && (
                    <>
                      <VerifiedIcon sx={{ color: 'green', fontSize: 20 }} />
                      <span className="text-green-600 font-medium text-xs">Verified</span>
                    </>
                  )}
                </div>
                <div className="text-gray-700">{service.firm_name}</div>
                <div className="text-gray-500">{service.review_count} Clients &nbsp; <span>⭐{service.rating}</span></div>
              </div>
              <button className="ml-auto bg-blue-900 text-white px-4 py-2 rounded font-semibold text-sm">Message</button>
            </div>
            <p className="text-gray-600 mt-4 text-sm">
              {`A company secretarial service founded by ${service.secretary_name}, who believes that every company deserves clarity, confidence, and care in their compliance journey. Inspired by the spirit of entrepreneurship, ${service.secretary_name} treats every client's business as if it were her own—attentive to detail, committed to deadlines, and focused on growth. Step into a partnership built on trust, transparency, and professional excellence. Whether you're just starting out or managing a growing company, ${service.secretary_name} is here to make your corporate governance smooth, secure, and stress-free. Your company's peace of mind starts here.`}
            </p>
          </div>
          {/* Right: Secretary is part of a firm, firm info, certifications */}
          <div>
            <div className="mb-4">
              <div className="font-semibold text-lg text-[#222222]">{service.secretary_name} is part of a firm</div>
              <div className="text-gray-600 mt-1 text-sm">
                Company Secretary firms are professional service providers that manage corporate compliance, company registration, and statutory obligations on behalf of businesses
              </div>
            </div>
            <div className="mb-4">
              <strong className="text-[#222222] text-lg">Firm</strong>
              <div className="flex items-center gap-2 mt-2">
                <Image
                  width={8}
                  height={8}
                  src={service.firm_logo_url ?? "/pics/default-firm-logo.png"}
                  alt={service.firm_name}
                />
                <div>
                  <div className="text-gray-800 font-semibold">{service.firm_name}</div>
                  <div className="text-gray-500 text-sm">{service.firm_years_experience} Years providing Company Secretarial services</div>
                </div>
              </div>
            </div>
            <div>
              <strong className="text-[#222222] text-lg">Certifications</strong>
              <div className="flex gap-2 ">
                {certifications.map((cert: string, idx: number) => {
                  let logoSrc = '';
                  if (cert === 'Licensed Company Secretary') {
                    logoSrc = '/pics/ssm.png';
                  } else if (cert === 'Chartered Secretary') {
                    logoSrc = '/pics/maicsa.jpeg';
                  }
                  return (
                    <span key={idx} className="inline-block flex items-center gap-3">
                      {logoSrc && (
                        <Image
                          width={30}
                          height={17}
                          src={logoSrc}
                          alt={cert}
                          className="object-contain"
                        />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: 'easeInOut' }}
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
          {benefits.map((benefit: string, idx: number) => (
            <li key={idx} className="flex items-center gap-2 inline-flex">
              <CheckIcon sx={{ fontSize: 20, color: '#000000ff' }} />
              {benefit}
            </li>
          ))}
        </ul>
        <Button
          variant="contained"
          fullWidth
          sx={{
            fontFamily: "'Red Hat Display', sans-serif",
            fontWeight: 'bold',
            fontSize: '1rem',
            py: 1.5,
            borderRadius: 1,
            backgroundColor: '#0a1a4f',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#08153d',
            },
          }}
        >
          Appoint Company Secretary →
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            fontFamily: "'Red Hat Display', sans-serif",
            mt: 2,
            fontWeight: 'bold',
            fontSize: '1rem',
            py: 1.5,
            borderRadius: 1,
            borderColor: '#222',
            color: '#fff',
            backgroundColor: '#222',
          }}
        >
          How Anycomp Works
        </Button>
      </motion.div>
    </motion.div>
  );
}
