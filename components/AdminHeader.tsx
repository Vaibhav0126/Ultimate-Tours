import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/icons/logoT.svg"
              alt="Ultimate Tours"
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Ultimate Tours
              </h1>
              <p className="text-xs text-gray-500">Catch Your Smile</p>
            </div>
          </div>

          {/* Back to Website */}
          <Link
            href="/"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Website
          </Link>
        </div>
      </div>
    </header>
  );
}
