export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  duration_days: number;
  rating: number;
  review_count: number;
  location: string;

  secretary_name: string;
  secretary_avatar_url: string;
  secretary_verified: boolean;

  firm_name: string;
  firm_logo_url?: string;
  firm_years_experience?: number;

  certifications: string; // If stored as text, this may be a CSV or JSON string

  image_main_url: string;
  image_secondary_urls?: string; // If stored as text, this may be a CSV or JSON string

  offering_company_secretary_subscription: boolean;
  offering_bank_account_opening: boolean;
  offering_priority_filing: boolean;
  offering_registered_office: boolean;
  offering_compliance_calendar: boolean;
  offering_first_share_cert: boolean;
  offering_ctc_delivery: boolean;
  offering_chat_support: boolean;
}