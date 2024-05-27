export interface CountryStats {
  country: string;
  profit: number;
  count: number;
}

export interface ClientStats {
  clientId: number;
  clientFIO: string;
  count: number;
  totalSum: number;
}

export interface PaidTour {
  clientId: number;
  tourId: number;
  date: Date;
  status: string;
  profit: number;
}
