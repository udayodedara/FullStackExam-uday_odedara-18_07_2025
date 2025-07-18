export interface RevenueResponse {
  order_date: string;
  daily_revenue: number;
}

export interface TopSpenderResponse {
  name: string;
  user_id: string;
  total_spent: number;
}
