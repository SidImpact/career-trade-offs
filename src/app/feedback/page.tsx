"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Star, 
  ArrowLeft, 
  Lightbulb, 
  Target, 
  Palette, 
  Bug, 
  PlusCircle, 
  MessageCircle,
  ShieldCheck,
  Compass,
  RotateCcw
} from "lucide-react";

const CATEGORIES = [
  { 
    id: "Feature Request", 
    label: "Feature Request", 
    desc: "Ideas to improve the platform",
    icon: Lightbulb, 
    color: "text-amber-500" 
  },
  { 
    id: "Career Data Accuracy", 
    label: "Data Accuracy", 
    desc: "Correct salaries or timelines",
    icon: Target, 
    color: "text-blue-500" 
  },
  { 
    id: "Career Addition", 
    label: "Add a Career", 
    desc: "Request a new profession",
    icon: PlusCircle, 
    color: "text-emerald-500" 
  },
  { 
    id: "UI / Design Suggestion", 
    label: "Design & UI", 
    desc: "Visual or layout feedback",
    icon: Palette, 
    color: "text-purple-500" 
  },
  { 
    id: "Bug Report", 
    label: "Bug Report", 
    desc: "Something isn't working",
    icon: Bug, 
    color: "text-rose-500" 
  },
  { 
    id: "General Feedback", 
    label: "General Feedback", 
    desc: "Thoughts, praise, or questions",
    icon: MessageCircle, 
    color: "text-indigo-500" 
  },
];

const RATINGS = [
  { stars: 1, label: "Needs Improvement", emoji: "😕" },
  { stars: 2, label: "Fair", emoji: "😐" },
  { stars: 3, label: "Good", emoji: "🙂" },
  { stars: 4, label: "Great Platform!", emoji: "😊" },
  { stars: 5, label: "Exceptional / Mind-Blowing!", emoji: "🚀" },
];

export default function FeedbackPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "General Feedback",
    rating: 0,
    message: "",
    _honeypot: "",
  });
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setForm(prev => ({ ...prev, category: categoryId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim() || !form.category) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", category: "General Feedback", rating: 0, message: "", _honeypot: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your internet connection and try again.");
      setStatus("error");
    }
  };

  const activeRating = hoverRating !== null ? hoverRating : form.rating;
  const currentRatingMeta = RATINGS.find(r => r.stars === activeRating);

  // SUCCESS SCREEN
  if (status === "success") {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 text-center shadow-xl shadow-neutral-900/5">
          
          {/* Animated/Clean Check Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto mb-6 shrink-0 shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            Sent Successfully
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-3 tracking-tight">
            Thank You! 🎉
          </h1>
          
          <p className="text-neutral-600 text-base sm:text-lg mb-6 leading-relaxed">
            Your feedback has been sent directly to <strong className="text-neutral-900">SID IMPACT</strong>. Every idea and correction helps make Career Trade-Offs more accurate and valuable.
          </p>

          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-500 mb-8 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Delivered to <strong>sidimpact6196@gmail.com</strong></span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/explore"
              className="w-full py-3.5 px-6 bg-neutral-900 text-white rounded-xl font-bold text-sm hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Compass className="w-4 h-4" />
              <span>Explore All Careers</span>
            </Link>

            <button
              onClick={() => setStatus("idle")}
              className="w-full py-3 px-6 bg-white border border-neutral-200 text-neutral-700 rounded-xl font-semibold text-sm hover:bg-neutral-50 hover:border-neutral-300 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-neutral-400" />
              <span>Send Another Note</span>
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-100">
            <Link 
              href="/" 
              className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // FORM SCREEN
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      
      {/* Back Link */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      {/* Header Section */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-700 mb-4">
          <MessageSquare className="w-4 h-4 text-neutral-800" />
          <span>Direct Line to the Builder</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight mb-4">
          Share Your Feedback
        </h1>
        <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl">
          Spotted inaccurate salary benchmarks? Have a career request or a UI idea? Every message is read personally by <strong className="text-neutral-900">SID IMPACT</strong>.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Honeypot field (hidden from users, filled by bots) */}
          <input
            type="text"
            name="_honeypot"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            value={form._honeypot}
            onChange={handleChange}
          />
          
          {/* Step 1: Category Grid */}
          <div>
            <label className="block text-base font-bold text-neutral-900 mb-3">
              1. What type of feedback is this? <span className="text-red-500">*</span>
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isSelected = form.category === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3.5 transition-all ${
                      isSelected
                        ? "bg-neutral-900 border-neutral-900 text-white shadow-md scale-[1.02]"
                        : "bg-white border-neutral-200 text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50/80"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      isSelected ? "bg-white/10 text-white" : "bg-neutral-100 " + cat.color
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${isSelected ? "text-white" : "text-neutral-900"}`}>
                        {cat.label}
                      </div>
                      <div className={`text-xs mt-0.5 ${isSelected ? "text-neutral-300" : "text-neutral-500"}`}>
                        {cat.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Experience / Star Rating */}
          <div className="pt-6 border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <label className="block text-base font-bold text-neutral-900">
                2. How is your experience with the platform? <span className="text-neutral-400 font-normal text-sm">(optional)</span>
              </label>
              
              {currentRatingMeta && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 w-fit">
                  <span>{currentRatingMeta.emoji}</span>
                  <span>{currentRatingMeta.label}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-200 w-fit">
              {RATINGS.map(r => (
                <button
                  key={r.stars}
                  type="button"
                  onMouseEnter={() => setHoverRating(r.stars)}
                  onMouseLeave={() => setHoverRating(null)}
                  onClick={() => setForm(prev => ({ ...prev, rating: r.stars }))}
                  className="p-1 focus:outline-none transition-transform hover:scale-125"
                  title={`${r.stars} Star - ${r.label}`}
                >
                  <Star
                    className={`w-8 h-8 sm:w-9 sm:h-9 transition-colors ${
                      r.stars <= activeRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-neutral-300 hover:text-amber-300"
                    }`}
                  />
                </button>
              ))}

              {form.rating > 0 && (
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, rating: 0 }))}
                  className="text-xs font-medium text-neutral-500 hover:text-neutral-800 underline ml-2 px-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Step 3: Name & Email */}
          <div className="pt-6 border-t border-neutral-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-neutral-900 mb-2">
                  Your Name <span className="text-neutral-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-neutral-200 focus:border-neutral-900 focus:outline-none text-sm sm:text-base font-medium transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-900 mb-2">
                  Your Email <span className="text-neutral-400 font-normal">(optional, for replies)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-neutral-200 focus:border-neutral-900 focus:outline-none text-sm sm:text-base font-medium transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Step 4: Message */}
          <div className="pt-6 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-base font-bold text-neutral-900">
                3. Your Feedback or Suggestion <span className="text-red-500">*</span>
              </label>
              <span className="text-xs font-medium text-neutral-400">
                {form.message.length} characters
              </span>
            </div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Tell us what you think — data accuracy, missing careers, feature ideas, design suggestions, or bugs..."
              className="w-full p-4 rounded-xl border-2 border-neutral-200 focus:border-neutral-900 focus:outline-none text-sm sm:text-base leading-relaxed font-medium transition-colors resize-none"
            />
          </div>

          {/* Error Message */}
          {status === "error" && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-sm font-medium text-red-800">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading" || !form.message.trim() || !form.category}
            className="w-full py-4 px-8 bg-neutral-900 text-white rounded-2xl font-bold text-base sm:text-lg hover:bg-neutral-800 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-neutral-900/10"
          >
            {status === "loading" ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending Feedback...</span>
              </>
            ) : (
              <>
                <span>Send Feedback</span>
                <Send className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Assurance note */}
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-500 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Goes straight to <strong className="text-neutral-800">sidimpact6196@gmail.com</strong>. No spam, ever.</span>
          </div>

        </form>
      </div>

      {/* Creator Info Footer */}
      <div className="mt-8 text-center text-xs text-neutral-500">
        Career Trade-Offs is created and maintained by <strong className="text-neutral-800">SID IMPACT</strong>.
      </div>

    </div>
  );
}
