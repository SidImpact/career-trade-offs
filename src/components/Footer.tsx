import Link from "next/link";
import Image from "next/image";
import { Scale, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Developer Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Image 
                src="/images/logo_option_1.svg" 
                alt="Career Trade-Offs Logo" 
                width={32} 
                height={32} 
                className="rounded-md"
              />
              <span className="font-bold text-lg tracking-tight text-neutral-900">Career Trade-Offs</span>
            </div>
            <p className="text-neutral-600 text-sm max-w-md leading-relaxed">
              Every career comes with a price. Career Trade-Offs was built by <strong className="text-neutral-900 font-semibold">SID IMPACT</strong> to uncover the realistic costs, mental stresses, and trade-offs of modern professions.
            </p>
            <div className="flex items-center gap-2 text-sm text-neutral-700">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Developed & Maintained by <strong className="text-neutral-900">SID IMPACT</strong></span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-bold text-sm text-neutral-900 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/explore" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Explore Careers
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Compare Careers
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Compatibility Quiz
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Share Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Support Links */}
          <div>
            <h4 className="font-bold text-sm text-neutral-900 uppercase tracking-wider mb-4">Support Developer</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="https://ko-fi.com/sidimpact" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5"
                >
                  <span>Ko-fi</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://paypal.me/siddharthSingh374" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5"
                >
                  <span>PayPal</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://patreon.com/SIDDHARTHSINGH152?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5"
                >
                  <span>Patreon</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://razorpay.me/@siddharthsingh7719" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5"
                >
                  <span>Razorpay</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.chai4.me/sidbhimgajs14gmailcom" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5"
                >
                  <span>Chai4.me</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li className="pt-1">
                <Link href="/support" className="text-rose-600 hover:text-rose-700 font-semibold transition-colors">
                  View All Support Options &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-8 mb-8 text-center text-xs leading-relaxed text-neutral-400 max-w-3xl mx-auto border-t border-neutral-100">
          <strong>Disclaimer:</strong> Career Trade-Offs is an informational and educational tool. Salary benchmarks, job growth percentages, AI risk estimates, and career trade-off ratings are general estimates based on market trends and should not be considered certified financial or career advice. Your actual experience may differ depending on your location, role, and industry conditions.
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Career Trade-Offs. All rights reserved.</p>
          <p>
            Designed & Developed by <strong className="text-neutral-700 font-medium">SID IMPACT</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
