"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { careers } from "@/data/careers";
import { StruggleCategory } from "@/data/types";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export default function ResultsPage() {
  const [results, setResults] = useState<{ career: typeof careers[0], score: number, matches: string[], concerns: string[] }[] | null>(null);
  const [profile, setProfile] = useState<Partial<Record<StruggleCategory, number>> | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("tradeOffProfile");
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile) as Partial<Record<StruggleCategory, number>>;
      setProfile(parsedProfile);

      // Load static careers and combine with generated custom careers
      const localCareersStr = localStorage.getItem("custom_careers");
      let allCareers = [...careers];
      if (localCareersStr) {
        try {
          const parsedCareers = JSON.parse(localCareersStr) as Record<string, typeof careers[0]>;
          const existingIds = new Set(allCareers.map((c) => c.id));
          Object.values(parsedCareers).forEach((c) => {
            if (!existingIds.has(c.id)) {
              allCareers.push(c);
            }
          });
        } catch (e) {
          console.error("Failed to parse custom careers in results", e);
        }
      }

      const scoredCareers = allCareers.map(career => {
        let totalDifference = 0;
        const matches: string[] = [];
        const concerns: string[] = [];

        const struggleEntries = Object.entries(career.struggles);
        // We calculate max possible difference to normalize the score (assume max penalty weight is 2x)
        const maxPossibleDifference = struggleEntries.length * (4 * 2);

        for (const [struggle, rating] of struggleEntries) {
          const userTolerance = parsedProfile[struggle as StruggleCategory] || 3; 
          const diff = (rating as number) - userTolerance;
          
          if (diff > 0) {
            // TOO HARD: Career demands more pain than user can handle. Heavy Penalty.
            totalDifference += (diff * 2); 
            if (diff >= 2) concerns.push(struggle);
          } else if (diff < 0) {
            // MISALIGNED: User is highly tolerant, but career doesn't require it.
            // If a Hustler takes a slow, low-risk job, they get a "boredom" penalty. Light Penalty.
            totalDifference += (Math.abs(diff) * 0.6); 
          }

          // STRONG MATCH: If the career demands high pain (>=4) and user is highly tolerant (>=4)
          if ((rating as number) >= 4 && userTolerance >= 4) {
             matches.push(struggle);
          }
        }

        // Calculate final score based on how close the profile aligns
        let rawScore = 100 - ((totalDifference / maxPossibleDifference) * 100);
        
        // Ensure scores are realistic (between 10% and 98%)
        const score = Math.min(98, Math.max(10, Math.round(rawScore)));

        return { career, score, matches: matches.slice(0, 3), concerns: concerns.slice(0, 3) };
      });

      // Sort by highest score
      scoredCareers.sort((a, b) => b.score - a.score);
      setResults(scoredCareers);
    }
  }, []);

  if (!results || !profile) {
    return <div className="p-20 text-center text-neutral-500">Loading your profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4">Your Potential Matches</h1>
        <p className="text-xl text-neutral-600">Based on your trade-off tolerance, here are careers that might fit you.</p>
      </div>

      <div className="space-y-8">
        {results.slice(0, 5).map((result, idx) => (
          <div key={result.career.id} className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/4 flex flex-col items-center md:items-start text-center md:text-left gap-6">
              <div>
                <div className="text-5xl font-extrabold text-neutral-900 mb-2">{result.score}%</div>
                <div className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">Compatibility</div>
              </div>
              <div className="w-full max-w-[200px] md:max-w-none aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 bg-[#faf9f6] hidden sm:block">
                <img 
                  src={`/images/career_${result.career.id}.jpg`}
                  alt={result.career.name}
                  className="w-full h-full object-cover mix-blend-multiply opacity-90"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/explore.jpg";
                  }}
                />
              </div>
            </div>
            
            <div className="md:w-3/4 flex flex-col h-full">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">{result.career.name}</h2>
              <p className="text-neutral-600 mb-6">{result.career.description}</p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-6 flex-grow">
                {result.matches.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-green-900 mb-2 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Strong match for:
                    </h4>
                    <ul className="text-sm text-green-800 space-y-1">
                      {result.matches.map((m, i) => <li key={i}>&bull; {m}</li>)}
                    </ul>
                  </div>
                )}
                {result.concerns.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-red-900 mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" /> Potential friction:
                    </h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      {result.concerns.map((m, i) => <li key={i}>&bull; {m}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-auto">
                <Link 
                  href={`/career/${result.career.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors"
                >
                  Explore {result.career.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link 
          href="/profile"
          className="inline-block px-8 py-4 bg-neutral-100 text-neutral-900 font-semibold rounded-xl hover:bg-neutral-200 transition-colors"
        >
          View Your Full Trade-Off Profile
        </Link>
      </div>
    </div>
  );
}
