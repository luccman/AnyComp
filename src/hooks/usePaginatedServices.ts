"use client";
import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchStart, fetchFail, appendServices } from '../store/servicesSlice';
import { createClient } from '@supabase/supabase-js';
import type { Service } from '../types/service';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PAGE_SIZE = 24;

export function usePaginatedServices() {
  const dispatch = useAppDispatch();
  const { page, hasMore, loading } = useAppSelector(s => s.services);
  const inFlight = useRef(false);

  const loadPage = useCallback(async (nextPage: number) => {
    if (inFlight.current || loading || !hasMore) return;
    inFlight.current = true;
    dispatch(fetchStart());
    const from = nextPage * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from('services')
      .select('*', { count: 'exact' })
      .range(from, to);

    if (error) {
      dispatch(fetchFail(error.message));
      inFlight.current = false;
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
        item.offering_bank_account_opening && "Bank Account Opening",
        item.offering_priority_filing && "Priority Filing",
        item.offering_registered_office && "Registered Office",
        item.offering_compliance_calendar && "Compliance Calendar",
        item.offering_first_share_cert && "First Share Certificate",
        item.offering_ctc_delivery && "CTC Delivery",
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

    const total = count ?? mapped.length;
    const hasMoreNext = to + 1 < total;

    dispatch(appendServices({ page: nextPage, services: mapped, hasMore: hasMoreNext }));
    inFlight.current = false;
  }, [dispatch, hasMore, loading]);

  useEffect(() => {
    if (page === 0 && !loading) loadPage(0);
  }, [page, loadPage, loading]);

  return { loadNext: () => loadPage(page + 1) };
}