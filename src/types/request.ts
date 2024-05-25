export interface RequestEntity {
  id: number;
  tour_id: number;
  client_id: number;
  touragent_id: number;
  request_status_id: number;
  date: Date;
}

export interface RequestFull {
  id: number;
  tourId: number;
  clientFIO: string;
  touragentFIO: string;
  requestStatus: string;
  date: Date;
}
