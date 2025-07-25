import { RevenueResponse } from '@/types/revenue';

export const metadata = {
  title: 'Revenue History',
  description: 'Revenue History',
};

export default async function RevenueHistoryPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/revenue/last-7-days-revenue`);
  const data: RevenueResponse[] = await res.json();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Last 7 Days Revenue</h2>
      <div className="grid grid-cols-1 gap-6">
        {data.map((item, index) => (
          <div key={item.order_date} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <span>{index + 1}</span>
              <span className="ms-2 text-lg font-bold">{new Date(item.order_date).toLocaleDateString()}</span>
              <span className="ms-auto text-gray-600">${item.daily_revenue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
