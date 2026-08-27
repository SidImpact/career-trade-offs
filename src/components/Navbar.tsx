"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <style>{`
        /* Guarantee responsive behavior even if Tailwind JIT misses the class */
        @media (max-width: 639px) {
          .desktop-only-link { display: none !important; }
        }
        @media (min-width: 640px) {
          .mobile-only-btn { display: none !important; }
        }
      `}</style>
      <nav className="border-b border-neutral-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <Image 
              src="/images/logo_option_1.svg" 
              alt="Career Trade-Offs Logo" 
              width={32} 
              height={32} 
              className="rounded-md"
            />
            <span className="font-bold text-lg tracking-tight text-neutral-900">Career Trade-Offs</span>
          </Link>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Desktop Links (Hidden on mobile via CSS) */}
            <Link href="/explore" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors desktop-only-link">Explore Careers</Link>
            <Link href="/compare" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors desktop-only-link">Compare</Link>
            <Link href="/profile" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors desktop-only-link">My Profile</Link>
            <Link href="/feedback" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors desktop-only-link">Feedback</Link>
            
            <Link href="/support" className="text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1 desktop-only-link">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Support</span>
            </Link>
            <Link href="/quiz" className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors desktop-only-link">
              Take the Quiz
            </Link>

            {/* Mobile Only Elements */}
            <Link href="/quiz" className="px-3 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-lg hover:bg-neutral-800 transition-colors mobile-only-btn">
              Quiz
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 bg-neutral-100 rounded-md mobile-only-btn"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="border-t border-neutral-200 bg-white px-4 py-4 space-y-4 absolute w-full shadow-lg mobile-only-btn" style={{ display: 'block' }}>
            <Link href="/explore" onClick={closeMenu} className="block text-sm font-medium text-neutral-600 hover:text-neutral-900">Explore Careers</Link>
            <Link href="/compare" onClick={closeMenu} className="block text-sm font-medium text-neutral-600 hover:text-neutral-900">Compare</Link>
            <Link href="/profile" onClick={closeMenu} className="block text-sm font-medium text-neutral-600 hover:text-neutral-900">My Profile</Link>
            <Link href="/feedback" onClick={closeMenu} className="block text-sm font-medium text-neutral-600 hover:text-neutral-900">Feedback</Link>
            <Link href="/support" onClick={closeMenu} className="flex items-center gap-1 text-sm font-medium text-rose-600 hover:text-rose-700">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Support</span>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
