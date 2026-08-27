"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { careers } from "@/data/careers";
import { Career } from "@/data/types";
import RatingBar from "@/components/RatingBar";
import CareerImage from "@/components/CareerImage";
import Link from "next/link";
import { AlertCircle, CheckCircle2, XCircle, TrendingUp, Bot } from "lucide-react";

const cleanSalary = (salaryStr: string) => {
  return salaryStr.replace(/\s*\(.*?\)\s*/g, '').trim();
};

const getMonthly = (salaryStr: string) => {
  return salaryStr.replace(/\$([\d.]+)(k|m)?/gi, (match, num, unit) => {
    let val = parseFloat(num);
    if (unit && unit.toLowerCase() === 'k') val *= 1000;
    if (unit && unit.toLowerCase() === 'm') val *= 1000000;
    
    const monthly = val / 12;
    
    if (monthly === 0) return '$0/mo';
    
    if (monthly >= 1000000) {
      return `$${(monthly / 1000000).toFixed(1).replace(/\.0$/, '')}m/mo`;
    } else if (monthly >= 1000) {
      return `$${(monthly / 1000).toFixed(1).replace(/\.0$/, '')}k/mo`;
    } else {
      return `$${Math.round(monthly)}/mo`;
    }
  });
};

export default function CareerClient({ initialId, staticCareer }: { initialId: string, staticCareer: Career | null }) {
  const router = useRouter();
  const [career, setCareer] = useState<Career | null>(staticCareer);
  const [loading, setLoading] = useState(!staticCareer);

  useEffect(() => {
    if (staticCareer) return; // Already loaded statically

    // Check dynamically generated careers in localStorage
    const saved = localStorage.getItem("custom_careers");
    if (saved) {
      const customCareers = JSON.parse(saved);
      if (customCareers[initialId]) {
        setCareer(customCareers[initialId]);
        setLoading(false);
        return;
      }
    }

    // Not found
    setLoading(false);
  }, [initialId, staticCareer]);

  if (loading) {
    return <div className="p-20 text-center">Loading career profile...</div>;
  }

  if (!career) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Career Not Found</h1>
        <button onClick={() => router.push('/explore')} className="text-blue-500 underline">Back to Explore</button>
      </div>
    );
  }

  const sortedStruggles = Object.entries(career.struggles || {}).sort(
    ([, a], [, b]) => (b as number) - (a as number)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/explore" className="text-sm text-neutral-500 hover:text-neutral-900 mb-8 inline-block font-medium">
        &larr; Back to all careers
      </Link>

      <header className="mb-12">
        {/* Title and Category (Top) */}
        <div className="flex flex-wrap items-baseline gap-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">{career.name}</h1>
          <span className="px-3.5 py-1.5 bg-neutral-100 text-neutral-700 text-sm font-semibold rounded-full border border-neutral-200">
            {career.category}
          </span>
        </div>

        {/* Description and Image (Side-by-side) */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <p className="text-xl text-neutral-600 leading-relaxed">{career.description}</p>
          </div>

          <div className="w-full md:w-1/3 lg:w-[40%] flex-shrink-0 relative aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden border border-neutral-200 bg-[#f9f9f8] shadow-sm">
            <CareerImage 
              careerId={career.id} 
              careerName={career.name} 
              fill
            />
          </div>
        </div>
      </header>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-12 flex items-start gap-4 text-yellow-900">
        <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
        <div className="text-sm leading-relaxed">
          <strong>Disclaimer:</strong> These ratings represent general patterns and are not guarantees. Your experience may differ depending on role, workplace, location, and career stage.
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Trade-Off Profile</h2>
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
            {sortedStruggles.map(([label, rating]) => (
              <RatingBar key={label} label={label} rating={rating as number} />
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">The Hidden Cost</h2>
            <div className="bg-neutral-900 text-white p-6 rounded-2xl">
              <p className="mb-6 text-neutral-300">{career.hidden_cost.description}</p>
              <h3 className="font-semibold text-white mb-3">You may need to tolerate:</h3>
              <ul className="space-y-2">
                {career.hidden_cost.struggles.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                    <span className="text-red-400 mt-0.5">&times;</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <section className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Who May Thrive Here?
          </h2>
          <ul className="space-y-3">
            {career.who_may_thrive.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-green-800 text-sm">
                <span className="font-bold">&middot;</span> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5" /> Who May Struggle Here?
          </h2>
          <ul className="space-y-3">
            {career.who_may_struggle.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-red-800 text-sm">
                <span className="font-bold">&middot;</span> {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {career.time_to_first_payment && (
        <section className="mb-16">
          <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Timeline to First Paycheck</h2>
                <p className="text-neutral-500 mt-1">Estimated runway from zero knowledge to first paid role.</p>
              </div>
              <div className="text-left md:text-right">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-50 text-green-700 text-lg font-bold border border-green-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {career.time_to_first_payment.estimate}
                </span>
                <p className="text-sm text-neutral-500 font-medium mt-2">
                  Financial Runway Demand: <span className="text-neutral-900 font-bold">{career.time_to_first_payment.runway_demand}</span>
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-neutral-200 md:hidden"></div>
              <div className="flex flex-col md:flex-row gap-6 relative">
                {career.time_to_first_payment.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex-1 relative flex md:block items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm z-10 shrink-0 md:mb-4">
                      {idx + 1}
                    </div>
                    {idx < (career.time_to_first_payment?.milestones?.length || 0) - 1 && (
                      <div className="hidden md:block absolute top-4 left-8 right-0 h-0.5 bg-neutral-200 -z-0"></div>
                    )}
                    <div>
                      <h4 className="font-bold text-neutral-900">{milestone.phase}</h4>
                      <p className="text-neutral-500 text-sm mt-1">{milestone.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100">
              <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" /> The Ultimate Gatekeeper
              </h4>
              <p className="text-neutral-600">{career.time_to_first_payment.gatekeeper}</p>
            </div>
          </div>
        </section>
      )}

      {career.financial_reward && (
        <section className="mb-16">
          <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">Financial Reward</h2>
                <p className="text-neutral-500 mt-1">Estimated earning trajectory based on the US market.</p>
              </div>
              <div className="text-left md:text-right">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-lg font-bold border border-blue-200">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tier: {career.financial_reward.tier}
                </span>
                <p className="text-sm text-neutral-500 font-medium mt-2 max-w-xs md:ml-auto">
                  {career.financial_reward.trajectory}
                </p>
              </div>
            </div>

            <div className="relative pt-8">
              <div className="flex flex-col md:flex-row gap-4 relative items-end">
                <div className="flex-1 w-full bg-neutral-50 rounded-xl p-5 border border-neutral-100 flex flex-col justify-end min-h-[110px] overflow-hidden">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Starting</span>
                  <div className="text-lg md:text-xl font-extrabold text-neutral-900 whitespace-nowrap tracking-tight">{cleanSalary(career.financial_reward.starting_salary)}</div>
                  <div className="text-sm font-medium text-neutral-500 mt-1">~ {getMonthly(career.financial_reward.starting_salary)}</div>
                </div>
                <div className="flex-1 w-full bg-neutral-100 rounded-xl p-5 border border-neutral-200 flex flex-col justify-end min-h-[140px] overflow-hidden">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Average</span>
                  <div className="text-xl md:text-2xl font-extrabold text-neutral-900 whitespace-nowrap tracking-tight">{cleanSalary(career.financial_reward.average_salary)}</div>
                  <div className="text-sm font-medium text-neutral-500 mt-1">~ {getMonthly(career.financial_reward.average_salary)}</div>
                </div>
                <div className="flex-1 w-full bg-neutral-900 rounded-xl p-5 border border-neutral-800 flex flex-col justify-end shadow-md min-h-[170px] overflow-hidden">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Peak</span>
                  <div className="text-2xl lg:text-3xl font-extrabold text-white whitespace-nowrap tracking-tight">{cleanSalary(career.financial_reward.highest_salary)}</div>
                  <div className="text-sm font-medium text-neutral-400 mt-1">~ {getMonthly(career.financial_reward.highest_salary)}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {career.market_outlook && (
        <section className="mb-16">
          <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-neutral-900" /> Future Outlook
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100 flex items-start gap-4">
                <div className="bg-white p-3 rounded-lg border border-neutral-200 shadow-sm shrink-0">
                  <Bot className={`w-6 h-6 ${career.market_outlook.ai_risk === 'High' || career.market_outlook.ai_risk === 'Extreme' ? 'text-red-500' : career.market_outlook.ai_risk === 'Moderate' ? 'text-yellow-500' : 'text-green-500'}`} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-1">AI Automation Risk</h4>
                  <div className={`text-xl font-extrabold ${career.market_outlook.ai_risk === 'High' || career.market_outlook.ai_risk === 'Extreme' ? 'text-red-600' : career.market_outlook.ai_risk === 'Moderate' ? 'text-yellow-600' : 'text-green-600'}`}>
                    {career.market_outlook.ai_risk}
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-100 flex items-start gap-4">
                <div className="bg-white p-3 rounded-lg border border-neutral-200 shadow-sm shrink-0">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-1">10-Year Growth</h4>
                  <div className="text-lg font-bold text-neutral-900">
                    {career.market_outlook.job_growth}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100">
              <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-neutral-500" /> The Market Reality
              </h4>
              <p className="text-neutral-600">{career.market_outlook.market_reality}</p>
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-neutral-200 pt-12 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Could You Live With These Trade-Offs?</h2>
        <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
          Not sure if this career fits your tolerance profile? Take the assessment to find out.
        </p>
        <Link 
          href="/quiz"
          className="inline-block px-8 py-4 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors"
        >
          Take the Compatibility Quiz
        </Link>
      </section>
    </div>
  );
}
