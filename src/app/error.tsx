"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight mb-4">
        Something went wrong!
      </h1>
      <p className="text-xl text-neutral-600 mb-10 max-w-lg mx-auto">
        We encountered an unexpected error. Please try again or return to the homepage.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto px-8 py-4 bg-neutral-900 text-white rounded-xl font-semibold text-base hover:bg-neutral-800 transition-colors shadow-sm flex items-center justify-center"
        >
          Try Again
        </button>
        <Link 
          href="/" 
          className="w-full sm:w-auto px-8 py-4 bg-white border border-neutral-300 text-neutral-900 rounded-xl font-semibold text-base hover:bg-neutral-50 transition-colors flex items-center justify-center"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
