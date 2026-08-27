"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StruggleCategory } from "@/data/types";
import RatingBar from "@/components/RatingBar";
import { ArrowRight } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Partial<Record<StruggleCategory, number>> | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("tradeOffProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile({});
    }
  }, []);

  if (profile === null) {
    return <div className="p-20 text-center text-neutral-500">Loading...</div>;
  }

  if (Object.keys(profile).length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-6">No Profile Yet</h1>
        <p className="text-xl text-neutral-600 mb-8">Take the quiz to discover your trade-off tolerance profile.</p>
        <Link 
          href="/quiz"
          className="inline-block px-8 py-4 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors"
        >
          Take the Quiz
        </Link>
      </div>
    );
  }

  const sortedTolerances = Object.entries(profile).sort(([, a], [, b]) => (b as number) - (a as number));

  const highTolerance = sortedTolerances.filter(([, v]) => (v as number) >= 4);
  const medTolerance = sortedTolerances.filter(([, v]) => (v as number) === 3);
  const lowTolerance = sortedTolerances.filter(([, v]) => (v as number) <= 2);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-neutral-900 mb-4">Your Trade-Off Profile</h1>
        <p className="text-xl text-neutral-600">This profile represents the struggles you are most and least equipped to handle.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <h2 className="text-lg font-bold text-green-900 mb-4">Highly Tolerant Of</h2>
          <ul className="space-y-2">
            {highTolerance.map(([label]) => (
              <li key={label} className="text-green-800 text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> {label}
              </li>
            ))}
            {highTolerance.length === 0 && <li className="text-green-800/50 text-sm">None identified yet</li>}
          </ul>
        </div>

        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
          <h2 className="text-lg font-bold text-yellow-900 mb-4">Moderately Tolerant Of</h2>
          <ul className="space-y-2">
            {medTolerance.map(([label]) => (
              <li key={label} className="text-yellow-800 text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div> {label}
              </li>
            ))}
            {medTolerance.length === 0 && <li className="text-yellow-800/50 text-sm">None identified yet</li>}
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
          <h2 className="text-lg font-bold text-red-900 mb-4">Less Comfortable With</h2>
          <ul className="space-y-2">
            {lowTolerance.map(([label]) => (
              <li key={label} className="text-red-800 text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div> {label}
              </li>
            ))}
            {lowTolerance.length === 0 && <li className="text-red-800/50 text-sm">None identified yet</li>}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8">Detailed Ratings</h2>
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
          {sortedTolerances.map(([label, rating]) => (
            <RatingBar key={label} label={label} rating={rating as number} />
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link 
          href="/results"
          className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors"
        >
          View Recommended Careers <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
