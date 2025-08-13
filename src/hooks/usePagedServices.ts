"use client";
import { useCallback, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchStart,
  fetchFail,
  storePage,
  setCurrentPage,
  selectCurrentServices,
  selectPaginationMeta,
  selectServicesState
} from '../store/servicesSlice';
import type { Service } from '../types/service';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function usePagedServices() {
  const dispatch = useAppDispatch();
  const servicesState = useAppSelector(selectServicesState);
  const services = useAppSelector(selectCurrentServices);
  const { currentPage, pageSize, pageCount, total, loading } = useAppSelector(selectPaginationMeta);

  const fetchPage = useCallback(async (page: number) => {
    if (servicesState.pages[page]) return; // cached
    dispatch(fetchStart());
    const from = page * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from('services')
      .select('*', { count: 'exact' })
      .range(from, to);

    if (error) {
      dispatch(fetchFail(error.message));
      return;
    }

    const mapped: Service[] = (data ?? []).map(item => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      company: item.company ?? '',
      image: item.image_main_url,
      price: item.price,
      duration_days: Number(item.duration_days),
      rating: Number(item.rating),
      review_count: Number(item.review_count),
      location: item.location ?? '',
      offerings: [
        item.offering_company_secretary_subscription && "Company Secretary Subscription",
        item.offering_bank_account_opening && "Opening of a Bank Account",
        item.offering_priority_filing && "Priority Filling",
        item.offering_registered_office && "Registered Office Address Use",
        item.offering_compliance_calendar && "Compliance Calendar Setup",
        item.offering_first_share_cert && "First Share Certificate Issued Free",
        item.offering_ctc_delivery && "CTC Delivery & Courier Handling",
        item.offering_chat_support && "Chat Support",
      ].filter(Boolean) as string[],
      benefits: [
        "Manage your company from one central dashboard",
        "Securely store corporate Files & Documents",
        "Digitally sign files requested by your Company Secretary",
        "Get SSM Certified Digital and Printed copies"
      ],
      secretary: {
        name: item.secretary_name,
        certifications: item.certifications
          ? JSON.parse(item.certifications.replace(/'/g, '"'))
          : [],
        avatar: item.secretary_avatar_url,
        firm: item.firm_name,
        verified: !!item.secretary_verified
      },
      firm_logo_url: item.firm_logo_url,
      firm_years_experience: Number(item.firm_years_experience),
      image_secondary_urls: item.image_secondary_urls
        ? JSON.parse(item.image_secondary_urls.replace(/'/g, '"'))
        : []
    }));

    dispatch(storePage({ page, services: mapped, total: count ?? mapped.length }));
  }, [dispatch, pageSize, servicesState.pages]);

  // Load current page if not cached
  useEffect(() => {
    void fetchPage(currentPage);
  }, [currentPage, fetchPage]);

  const goToPage = useCallback((p: number) => {
    dispatch(setCurrentPage(p));
  }, [dispatch]);

  return {
    services,
    currentPage,
    pageSize,
    pageCount,
    total,
    loading,
    goToPage
  };
}