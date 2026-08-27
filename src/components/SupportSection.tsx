"use client";

import { useState } from "react";
import { Heart, Copy, Check, ExternalLink, QrCode, X, Sparkles, Smartphone } from "lucide-react";

export default function SupportSection() {
  const [copied, setCopied] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const upiId = "sidbhimgaj.s14@okaxis";
  const upiUri = `upi://pay?pa=${upiId}&pn=SID%20IMPACT&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUri)}`;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const platforms = [
    {
      name: "Ko-fi",
      icon: "☕",
      desc: "Support with a coffee",
      url: "https://ko-fi.com/sidimpact",
      tag: "Popular",
      color: "hover:border-[#FF5E5B] hover:shadow-[#FF5E5B]/10",
      btnBg: "bg-[#FF5E5B] hover:bg-[#ff4340] text-white",
    },
    {
      name: "PayPal",
      icon: "💖",
      desc: "PayPal.Me/siddharthSingh374",
      url: "https://paypal.me/siddharthSingh374",
      tag: "International",
      color: "hover:border-[#0079C1] hover:shadow-[#0079C1]/10",
      btnBg: "bg-[#0079C1] hover:bg-[#006097] text-white",
    },
    {
      name: "Patreon",
      icon: "🎨",
      desc: "Monthly membership",
      url: "https://patreon.com/SIDDHARTHSINGH152?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink",
      tag: "Membership",
      color: "hover:border-[#FF424D] hover:shadow-[#FF424D]/10",
      btnBg: "bg-[#FF424D] hover:bg-[#e62a35] text-white",
    },
    {
      name: "Razorpay",
      icon: "💳",
      desc: "Cards, UPI & Netbanking",
      url: "https://razorpay.me/@siddharthsingh7719",
      tag: "Instant Pay",
      color: "hover:border-[#0C2340] hover:shadow-[#0C2340]/10",
      btnBg: "bg-[#0C2340] hover:bg-[#061220] text-white",
    },
    {
      name: "Chai4.me",
      icon: "🍵",
      desc: "Buy me a hot chai",
      url: "https://www.chai4.me/sidbhimgajs14gmailcom",
      tag: "Chai Support",
      color: "hover:border-[#D97706] hover:shadow-[#D97706]/10",
      btnBg: "bg-[#D97706] hover:bg-[#b45309] text-white",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm my-16 max-w-5xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-4">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> Support the Developer
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
          Developed by <span className="underline decoration-rose-400 decoration-wavy underline-offset-4">SID IMPACT</span>
        </h2>
        <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
          Career Trade-Offs is an independent project built to help people make honest, well-informed career decisions. If this tool helped you gain clarity, consider supporting the work!
        </p>
      </div>

      {/* Google Pay / UPI Spotlight Box */}
      <div className="mb-8 bg-white border-2 border-neutral-900 rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Authentic Google Pay Logo Container */}
            <div className="w-14 h-14 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center p-2.5 flex-shrink-0">
              <svg className="w-full h-full" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-1.5">
                  <span>Google Pay</span>
                  <span className="text-neutral-400 font-normal">/</span>
                  <span className="text-emerald-700">UPI</span>
                </h3>
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                  Zero Fee
                </span>
              </div>
              <p className="text-sm font-mono text-neutral-600 select-all mt-0.5 font-medium">
                {upiId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Copy Button */}
            <button
              onClick={handleCopyUPI}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold text-sm transition-all active:scale-95 border border-neutral-300 shadow-sm"
              title="Copy UPI ID"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">UPI Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-600" />
                  <span>Copy UPI ID</span>
                </>
              )}
            </button>

            {/* Pay / Scan QR Code Button */}
            <button
              onClick={() => setShowQRModal(true)}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm transition-all shadow-sm active:scale-95"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>Scan QR / Pay with UPI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Other Support Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col justify-between p-5 rounded-2xl bg-white border border-neutral-200 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${p.color}`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{p.icon}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                  {p.tag}
                </span>
              </div>
              <h4 className="text-base font-bold text-neutral-900 mb-1 flex items-center justify-between">
                <span>{p.name}</span>
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
              </h4>
              <p className="text-xs text-neutral-500 line-clamp-1">{p.desc}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100">
              <span className={`w-full inline-flex items-center justify-center py-2 px-3 rounded-lg text-xs font-bold transition-colors ${p.btnBg}`}>
                Support on {p.name} &rarr;
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-8 pt-6 border-t border-neutral-200 text-center text-xs text-neutral-500 flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Every contribution directly supports server costs and continued feature development. Thank you!</span>
      </div>

      {/* UPI QR Code & Payment Modal */}
      {showQRModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowQRModal(false)}
        >
          <div 
            className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-100">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-neutral-900 mb-1">
              Pay via Google Pay / UPI
            </h3>
            <p className="text-xs text-neutral-500 mb-6">
              Scan with any UPI App (Google Pay, PhonePe, Paytm, BHIM)
            </p>

            {/* QR Code Frame */}
            <div className="bg-neutral-50 p-4 rounded-2xl border-2 border-neutral-200 border-dashed inline-block mb-6 shadow-inner">
              <img 
                src={qrUrl}
                alt="Google Pay / UPI QR Code"
                className="w-48 h-48 mx-auto rounded-lg object-contain"
              />
            </div>

            {/* UPI ID Copy bar */}
            <div className="bg-neutral-100 p-3 rounded-xl flex items-center justify-between gap-2 mb-4 border border-neutral-200">
              <span className="text-xs font-mono font-bold text-neutral-800 select-all truncate">
                {upiId}
              </span>
              <button
                onClick={handleCopyUPI}
                className="p-1.5 rounded-lg bg-white hover:bg-neutral-200 text-neutral-700 font-medium text-xs flex items-center gap-1 shadow-sm transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Direct UPI App link for mobile */}
            <a
              href={upiUri}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm transition-colors shadow-sm"
            >
              <Smartphone className="w-4 h-4" />
              <span>Open in UPI App (Mobile)</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
