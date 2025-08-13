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
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
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
      price: Number(item.price),
      duration_days: Number(item.duration_days),
      rating: Number(item.rating),
      review_count: Number(item.review_count),
      location: item.location ?? '',

      secretary_name: item.secretary_name,
      secretary_avatar_url: item.secretary_avatar_url,
      secretary_verified: !!item.secretary_verified,

      firm_name: item.firm_name,
      firm_logo_url: item.firm_logo_url,
      firm_years_experience: item.firm_years_experience ? Number(item.firm_years_experience) : undefined,

      certifications: item.certifications ?? '',

      image_main_url: item.image_main_url,
      image_secondary_urls: item.image_secondary_urls ?? '',

      offering_company_secretary_subscription: !!item.offering_company_secretary_subscription,
      offering_bank_account_opening: !!item.offering_bank_account_opening,
      offering_priority_filing: !!item.offering_priority_filing,
      offering_registered_office: !!item.offering_registered_office,
      offering_compliance_calendar: !!item.offering_compliance_calendar,
      offering_first_share_cert: !!item.offering_first_share_cert,
      offering_ctc_delivery: !!item.offering_ctc_delivery,
      offering_chat_support: !!item.offering_chat_support,
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