"use client";

import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { careers as staticCareers } from "@/data/careers";
import { Career, StruggleCategory } from "@/data/types";
import { X, Search, Loader2, Sparkles } from "lucide-react";
import RatingBar from "@/components/RatingBar";
import Link from "next/link";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const COLORS = [
  { bg: "rgba(37, 99, 235, 0.2)", border: "rgba(37, 99, 235, 1)" }, // Blue
  { bg: "rgba(220, 38, 38, 0.2)", border: "rgba(220, 38, 38, 1)" },   // Red
  { bg: "rgba(16, 185, 129, 0.2)", border: "rgba(16, 185, 129, 1)" }, // Green
];

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
    if (monthly >= 1000000) return `$${(monthly / 1000000).toFixed(1).replace(/\.0$/, '')}m/mo`;
    if (monthly >= 1000) return `$${(monthly / 1000).toFixed(1).replace(/\.0$/, '')}k/mo`;
    return `$${Math.round(monthly)}/mo`;
  });
};

export default function ComparePage() {
  const [allCareers, setAllCareers] = useState<Career[]>([]);
  const [selectedCareers, setSelectedCareers] = useState<Career[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Load static careers and any locally generated AI careers
    const local = localStorage.getItem("custom_careers");
    let combined = [...staticCareers];
    if (local) {
      try {
        const parsed = JSON.parse(local) as Record<string, Career>;
        // Filter out duplicates just in case
        const existingIds = new Set(combined.map((c) => c.id));
        Object.values(parsed).forEach((c) => {
          if (!existingIds.has(c.id)) {
            combined.push(c);
          }
        });
      } catch (e) {
        console.error("Failed to parse custom careers", e);
      }
    }
    setAllCareers(combined);
  }, []);

  const fuse = useMemo(() => new Fuse(allCareers, {
    keys: ["name"],
    threshold: 0.3,
  }), [allCareers]);

  const filteredCareers = useMemo(() => {
    if (!searchQuery.trim()) return allCareers;
    return fuse.search(searchQuery).map(res => res.item);
  }, [allCareers, searchQuery, fuse]);

  const handleAddCareer = (career: Career) => {
    if (selectedCareers.length < 3 && !selectedCareers.find(c => c.id === career.id)) {
      setSelectedCareers([...selectedCareers, career]);
      setSearchQuery("");
    }
  };

  const handleRemoveCareer = (id: string) => {
    setSelectedCareers(selectedCareers.filter((c) => c.id !== id));
  };

  useEffect(() => {
    if (!searchQuery.trim() || isGenerating) return;
    if (filteredCareers.length > 0) return;
    if (selectedCareers.length >= 3) return;

    const timer = setTimeout(() => {
      handleGenerate(searchQuery);
    }, 1200);

    return () => clearTimeout(timer);
  }, [searchQuery, filteredCareers.length, isGenerating, selectedCareers.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGenerate = async (queryToGenerate: string) => {
    if (!queryToGenerate) return;
    setIsGenerating(true);
    
    try {
      const res = await fetch("/api/generate-career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToGenerate })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate");
      }
      
      const newCareer: Career = await res.json();
      
      const existingStr = localStorage.getItem("custom_careers");
      const customCareers = existingStr ? JSON.parse(existingStr) : {};
      customCareers[newCareer.id] = newCareer;
      localStorage.setItem("custom_careers", JSON.stringify(customCareers));
      
      setAllCareers(prev => {
        if (!prev.find(c => c.id === newCareer.id)) {
          return [...prev, newCareer];
        }
        return prev;
      });
      
      setSelectedCareers(prev => {
        if (prev.length < 3 && !prev.find(c => c.id === newCareer.id)) {
          return [...prev, newCareer];
        }
        return prev;
      });
      setSearchQuery("");
    } catch (e: any) {
      alert(e.message || "Failed to generate AI profile. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Compile unique struggle labels across selected careers
  const chartLabels = useMemo(() => {
    const labels = new Set<string>();
    selectedCareers.forEach((career) => {
      Object.keys(career.struggles).forEach((key) => labels.add(key));
    });
    return Array.from(labels);
  }, [selectedCareers]);

  const chartData = {
    labels: chartLabels,
    datasets: selectedCareers.map((career, idx) => ({
      label: career.name,
      data: chartLabels.map((label) => career.struggles[label as StruggleCategory] || 0),
      backgroundColor: COLORS[idx % COLORS.length].bg,
      borderColor: COLORS[idx % COLORS.length].border,
      pointBackgroundColor: COLORS[idx % COLORS.length].border,
      borderWidth: 2,
    })),
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: { display: true, color: "#e5e5e5" },
        grid: { color: "#e5e5e5" },
        pointLabels: { font: { size: 12, family: "sans-serif" }, color: "#525252" },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: { stepSize: 1, backdropColor: "transparent" },
      },
    },
    plugins: {
      legend: { position: "top" as const, labels: { font: { size: 14, weight: "bold" } } },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4">Compare Careers</h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Add up to 3 careers to visually and analytically compare their distinct trade-offs.
        </p>
      </div>

      {/* Selection UI */}
      <div className="mb-12">
        <div className="max-w-xl mx-auto relative mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder={selectedCareers.length >= 3 ? "Maximum 3 careers reached" : "Search to add a career..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={selectedCareers.length >= 3}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-neutral-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:border-transparent focus:ring-neutral-900 text-lg disabled:bg-neutral-100"
            />
          </div>
          
          {!searchQuery && selectedCareers.length < 3 && allCareers.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-neutral-500 font-medium">Popular:</span>
              {["software-engineer", "doctor", "lawyer", "entrepreneur", "investment-banker"].map(id => {
                const career = allCareers.find(c => c.id === id);
                if (!career || selectedCareers.find(c => c.id === id)) return null;
                return (
                  <button 
                    key={id}
                    onClick={() => handleAddCareer(career)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm rounded-full transition-colors font-medium flex items-center gap-1"
                  >
                    <span>+</span> {career.name}
                  </button>
                );
              })}
            </div>
          )}

          {searchQuery && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {filteredCareers.length > 0 ? (
                filteredCareers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleAddCareer(c)}
                    className="w-full text-left px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0"
                  >
                    <span className="font-semibold text-neutral-900">{c.name}</span>
                    <span className="text-sm text-neutral-500 ml-2">{c.category}</span>
                  </button>
                ))
              ) : (
                <div className="px-5 py-4 flex items-center gap-4 text-neutral-500 bg-neutral-50/50">
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-neutral-900 shrink-0" />
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-neutral-900">AI is building profile...</span>
                        <span className="text-xs text-neutral-500">Adding "{searchQuery}" to comparison.</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-neutral-400 shrink-0 animate-pulse" />
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-semibold text-neutral-700">Not found...</span>
                        <span className="text-xs text-neutral-500">Wait a second to magically generate "{searchQuery}" using AI.</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Chips */}
        <div className="flex flex-wrap justify-center gap-4">
          {selectedCareers.map((c, idx) => (
            <div
              key={c.id}
              className="flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm bg-white"
              style={{ borderColor: COLORS[idx % COLORS.length].border }}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[idx % COLORS.length].border }} 
              />
              <span className="font-bold text-neutral-900">{c.name}</span>
              <button 
                onClick={() => handleRemoveCareer(c.id)}
                className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedCareers.length > 0 ? (
        <div className="space-y-16">
          {/* Radar Chart */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 md:p-12 shadow-sm max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">Visual Overlap</h3>
            <div className="aspect-square md:aspect-video w-full relative flex justify-center">
              <Radar data={chartData} options={chartOptions as any} />
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto overflow-y-auto max-h-[75vh]">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="sticky top-0 z-10 bg-neutral-50 shadow-sm">
                  <tr className="border-b border-neutral-200">
                    <th className="p-4 md:p-6 font-bold text-neutral-500 uppercase tracking-wide w-1/4 bg-neutral-50 align-top">Trade-Offs</th>
                    {selectedCareers.map((c) => (
                      <th key={c.id} className="p-4 md:p-6 text-xl font-extrabold text-neutral-900 bg-neutral-50 align-top">
                        <div className="flex flex-col gap-2 items-start">
                          <span>{c.name}</span>
                          <Link 
                            href={`/career/${c.id}`}
                            className="inline-flex items-center justify-center px-4 py-2 bg-neutral-900 text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors shadow-sm"
                          >
                            View Profile
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {chartLabels.map((label) => (
                    <tr key={label} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
                      <td className="p-4 md:p-6 font-semibold text-neutral-700">{label}</td>
                      {selectedCareers.map((c) => {
                        // Ensure val is a number
                        const val = Number(c.struggles[label as StruggleCategory]) || 0;
                        return (
                          <td key={c.id + label} className="p-4 md:p-6 align-middle min-w-[200px]">
                            <RatingBar label="" rating={val} hideLabel noMargin />
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Time to First Paycheck Row */}
                  <tr className="border-t-2 border-neutral-200">
                    <td className="p-4 md:p-6 font-bold text-neutral-900 bg-neutral-50 align-top">Time to First Paycheck</td>
                    {selectedCareers.map((c) => (
                      <td key={c.id + '-paycheck'} className="p-4 md:p-6 align-top">
                        {c.time_to_first_payment ? (
                          <div className="space-y-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-50 text-green-700 text-sm font-semibold border border-green-200">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {c.time_to_first_payment.estimate}
                            </span>
                            <p className="text-xs text-neutral-500 font-medium">Runway Demand: <span className="text-neutral-700">{c.time_to_first_payment.runway_demand}</span></p>
                          </div>
                        ) : (
                          <span className="text-neutral-400 text-sm">Not available</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Financial Reward Row */}
                  <tr className="border-t border-neutral-200">
                    <td className="p-4 md:p-6 font-bold text-neutral-900 bg-neutral-50 align-top">Financial Reward (US)</td>
                    {selectedCareers.map((c) => (
                      <td key={c.id + '-reward'} className="p-4 md:p-6 align-top">
                        {c.financial_reward ? (
                          <div className="space-y-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-200">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Tier: {c.financial_reward.tier}
                            </span>
                            <div className="text-sm text-neutral-600 space-y-2 mt-2">
                              <div className="flex flex-col border-b border-neutral-100 pb-2">
                                <div className="flex justify-between">
                                  <span className="text-neutral-500">Starting:</span> 
                                  <span className="font-semibold text-neutral-900">{cleanSalary(c.financial_reward.starting_salary)}</span>
                                </div>
                                <span className="text-xs text-neutral-400 text-right">~ {getMonthly(c.financial_reward.starting_salary)}</span>
                              </div>
                              <div className="flex flex-col border-b border-neutral-100 pb-2">
                                <div className="flex justify-between">
                                  <span className="text-neutral-500">Average:</span> 
                                  <span className="font-semibold text-neutral-900">{cleanSalary(c.financial_reward.average_salary)}</span>
                                </div>
                                <span className="text-xs text-neutral-400 text-right">~ {getMonthly(c.financial_reward.average_salary)}</span>
                              </div>
                              <div className="flex flex-col pb-1">
                                <div className="flex justify-between">
                                  <span className="text-neutral-500">Peak:</span> 
                                  <span className="font-semibold text-neutral-900">{cleanSalary(c.financial_reward.highest_salary)}</span>
                                </div>
                                <span className="text-xs text-neutral-400 text-right">~ {getMonthly(c.financial_reward.highest_salary)}</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-neutral-400 text-sm">Not available</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Future Outlook Row */}
                  <tr className="border-t border-neutral-200">
                    <td className="p-4 md:p-6 font-bold text-neutral-900 bg-neutral-50 align-top">Future Outlook</td>
                    {selectedCareers.map((c) => (
                      <td key={c.id + '-outlook'} className="p-4 md:p-6 align-top">
                        {c.market_outlook ? (
                          <div className="space-y-4">
                            <div>
                              <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-1">AI Risk</div>
                              <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-bold border ${c.market_outlook.ai_risk === 'High' || c.market_outlook.ai_risk === 'Extreme' ? 'bg-red-50 text-red-700 border-red-200' : c.market_outlook.ai_risk === 'Moderate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                                {c.market_outlook.ai_risk}
                              </span>
                            </div>
                            <div>
                              <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-1">10-Year Growth</div>
                              <span className="text-sm font-semibold text-neutral-900">{c.market_outlook.job_growth}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-neutral-400 text-sm">Not available</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Hidden Costs Row */}
                  <tr className="border-t border-neutral-200">
                    <td className="p-4 md:p-6 font-bold text-neutral-900 bg-neutral-50 align-top">Hidden Costs</td>
                    {selectedCareers.map((c) => (
                      <td key={c.id + '-hidden'} className="p-4 md:p-6 align-top">
                        <ul className="list-disc list-outside ml-4 space-y-2 text-neutral-600 text-sm">
                          {(c.hidden_cost?.struggles || []).map((cost, i) => (
                            <li key={i}>{cost}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Thriving Profile Row */}
                  <tr className="border-t border-neutral-200">
                    <td className="p-4 md:p-6 font-bold text-neutral-900 bg-neutral-50 align-top">Thriving Profile</td>
                    {selectedCareers.map((c) => (
                      <td key={c.id + '-thrive'} className="p-4 md:p-6 align-top">
                        <ul className="list-disc list-outside ml-4 space-y-2 text-neutral-600 text-sm">
                          {(c.who_may_thrive || []).map((profile, i) => (
                            <li key={i}>{profile}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  {/* Action Row */}
                  <tr className="border-t-2 border-neutral-200">
                    <td className="p-4 md:p-6 bg-neutral-50"></td>
                    {selectedCareers.map((c) => (
                      <td key={c.id + '-action'} className="p-4 md:p-6 text-center">
                        <Link 
                          href={`/career/${c.id}`}
                          className="inline-flex items-center justify-center w-full py-3 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-all shadow-sm"
                        >
                          View Full Profile
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-neutral-200 border-dashed max-w-xl mx-auto">
          <p className="text-neutral-500 font-medium">Search and select a career above to start comparing.</p>
        </div>
      )}
    </div>
  );
}
