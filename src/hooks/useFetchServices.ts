"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setServices } from "../store/servicesSlice";
import { Service } from "../types/service";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useFetchServices() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from("services").select("*");
      if (error) {
        console.error("Error fetching services:", error);
        return;
      }

      const formattedData: Service[] = data.map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        company: item.company ?? "",
        image: item.image_main_url,
        price: item.price,
        duration_days: Number(item.duration_days),
        rating: Number(item.rating),
        review_count: Number(item.review_count),
        location: item.location ?? "",
        offerings: [
          item.offering_company_secretary_subscription && "Company Secretary Subscription",
          item.offering_bank_account_opening && "Bank Account Opening",
          item.offering_priority_filing && "Priority Filing",
          item.offering_registered_office && "Registered Office",
          item.offering_compliance_calendar && "Compliance Calendar",
          item.offering_first_share_cert && "First Share Certificate",
          item.offering_ctc_delivery && "CTC Delivery",
          item.offering_chat_support && "Chat Support",
        ].filter(Boolean),
        benefits: [
          "Manage your company from one central dashboard",
          "Securely store corporate Files & Documents",
          "Digitally sign files requested by your Company Secretary",
          "Get SSM Certified Digital and Printed copies",
        ],
        secretary: {
          name: item.secretary_name,
          certifications: Array.isArray(item.certifications)
            ? item.certifications
            : JSON.parse(item.certifications.replace(/'/g, '"')),
          avatar: item.secretary_avatar_url,
          firm: item.firm_name,
          verified: !!item.secretary_verified,
        },
        firm_logo_url: item.firm_logo_url,
        firm_years_experience: Number(item.firm_years_experience),
        image_secondary_urls: Array.isArray(item.image_secondary_urls)
          ? item.image_secondary_urls
          : item.image_secondary_urls
            ? JSON.parse(item.image_secondary_urls.replace(/'/g, '"'))
            : [],
      }));

      dispatch(setServices(formattedData)); // Ensure this only runs when data changes
    };

    fetchServices();
  }, [dispatch]);
}
