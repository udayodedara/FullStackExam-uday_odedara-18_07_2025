import Link from 'next/link';

export default function RevenueLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-4 mb-8">
        <Link
          href="/revenue/top-spenders"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Top Spenders
        </Link>
        <Link
          href="/revenue/history"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Last 7 Days Revenue
        </Link>
      </div>
      {children}
    </div>
  );
}
