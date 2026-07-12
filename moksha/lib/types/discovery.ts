export type VenueEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  level: string;
  availableSpots: number;
};

export type SportVenue = {
  id: string;
  name: string;
  sport: string;

  country: string;
  region: string;
  city: string;
  address: string;

  image: string;
  description: string;
  distance: string;

  level: string;
  priceLabel: string;
  rating: number;

  schedules: string[];
  equipment: string[];
  amenities: string[];

  events: VenueEvent[];
};