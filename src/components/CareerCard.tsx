"use client";

import Link from "next/link";
import { Career } from "@/data/types";
import CareerImage from "./CareerImage";

export default function CareerCard({ career }: { career: Career }) {

  // Sort struggles to show top 3
  const topStruggles = Object.entries(career.struggles)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([name]) => name);

  return (
    <div className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden">
      <div className="relative w-full aspect-[21/9] bg-neutral-50 border-b border-neutral-200 overflow-hidden">
        <CareerImage 
          careerId={career.id} 
          careerName={career.name} 
          fill
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            {career.category}
          </span>
          <h3 className="text-xl font-bold text-neutral-900 mt-1">{career.name}</h3>
        </div>
        
        <p className="text-neutral-600 text-sm mb-4 flex-grow line-clamp-3">
          {career.description}
        </p>

        {(career.time_to_first_payment || career.financial_reward) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {career.time_to_first_payment && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {career.time_to_first_payment.estimate} to pay
              </span>
            )}
            {career.financial_reward && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {career.financial_reward.tier} Pay
              </span>
            )}
          </div>
        )}

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-neutral-900 mb-2">Top Trade-Offs:</h4>
          <ul className="text-sm text-neutral-600 flex flex-col gap-1">
            {topStruggles.map((struggle, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                {struggle}
              </li>
            ))}
          </ul>
        </div>

        <Link 
          href={`/career/${career.id}`}
          className="w-full py-3 px-4 bg-neutral-900 text-white rounded-xl text-sm font-semibold text-center hover:bg-neutral-800 transition-colors"
        >
          Explore Career
        </Link>
      </div>
    </div>
  );
}
