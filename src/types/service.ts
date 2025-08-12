export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  company: string;
  image: string;
  price: number;
  duration_days: number;
  rating: number;
  review_count: number;
  location: string;
  offerings: string[];
  benefits: string[];
  secretary: {
    name: string;
    certifications: string[];
    avatar: string;
    firm: string;
    verified: boolean;
  };
  firm_logo_url?: string;
  firm_years_experience?: number;
  image_secondary_urls?: string[];
}
