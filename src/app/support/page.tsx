import SupportSection from "@/components/SupportSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <SupportSection />
    </div>
  );
}
