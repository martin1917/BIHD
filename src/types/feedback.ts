export interface FeedbackEntity {
  id: number;
  hotel_id: number;
  mark: number;
  comment: string;
}

export type AddFeedback = Omit<FeedbackEntity, "id">;
