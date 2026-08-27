import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-6">
        <Compass className="w-8 h-8 text-neutral-500" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight mb-4">
        Lost your path?
      </h1>
      <p className="text-xl text-neutral-600 mb-10 max-w-lg mx-auto">
        Every career has a cost, but getting lost on this website doesn't have to be one of them. We couldn't find the page you're looking for.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link 
          href="/explore" 
          className="w-full sm:w-auto px-8 py-4 bg-neutral-900 text-white rounded-xl font-semibold text-base hover:bg-neutral-800 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          Explore Careers
        </Link>
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
