import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Our Store</h1>
        <p className="text-lg text-gray-600 mb-8">Your one-stop shop for all your needs</p>

        <div className="space-y-4">
          <Link
            href="/login"
            className="block  px-8 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="block  px-8 py-3 text-indigo-600 bg-white border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-150"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
