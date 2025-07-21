import Link from "next/link";
import { Mail, Shield } from "lucide-react";

export default function AdminFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-600">
              © 2025 Ultimate Tours. All rights reserved.
            </div>
          </div>

          {/* Contact Help */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Need help?</span>
            <Link
              href="/contact"
              className="inline-flex items-center text-primary-600 hover:text-primary-700"
            >
              <Mail className="h-4 w-4 mr-1" />
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
