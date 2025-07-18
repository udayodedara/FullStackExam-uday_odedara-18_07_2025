import { TopSpenderResponse } from '@/types/revenue';

export const metadata = {
  title: 'Top Spenders',
  description: 'Top Spenders',
};

export default async function TopSpendersPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${baseUrl}/revenue/top-spenders-list`);
  const data: TopSpenderResponse[] = await res.json();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Top Spenders</h2>
      <div className="grid grid-cols-1 gap-6">
        {data.map((item, index) => (
          <div key={item.user_id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <span>{index + 1}</span>
              <span className="ms-2 text-lg font-bold">{item.name}</span>
              <span className="ms-auto text-gray-600">${item.total_spent}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
