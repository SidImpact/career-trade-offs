"use client";

import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import Image from "next/image";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { careers } from "@/data/careers";
import CareerCard from "@/components/CareerCard";
import { Career } from "@/data/types";

const parseSalary = (salaryStr: string | undefined) => {
  if (!salaryStr) return 0;
  const matches = salaryStr.match(/[\d.]+(k|m)?/gi);
  if (!matches) return 0;
  const values = matches.map(m => {
    let val = parseFloat(m);
    if (m.toLowerCase().includes('k')) val *= 1000;
    if (m.toLowerCase().includes('m')) val *= 1000000;
    return val;
  });
  return Math.max(...values);
};

const parseGrowth = (growthStr: string | undefined) => {
  if (!growthStr) return -999;
  const match = growthStr.match(/([-+]?\d+(\.\d+)?)\s*%/);
  if (match) return parseFloat(match[1]);
  return 0; // Default if no percentage found but string exists
};

const getRiskScore = (riskStr: string | undefined) => {
  if (!riskStr) return 999; // Put missing ones at the end
  const s = riskStr.toLowerCase();
  if (s === 'low') return 1;
  if (s === 'moderate') return 2;
  if (s === 'high') return 3;
  if (s === 'extreme') return 4;
  return 999;
};

const parseRunway = (runwayStr: string | undefined) => {
  if (!runwayStr) return 9999;
  const match = runwayStr.match(/([\d.]+)(?:\s*-\s*([\d.]+))?\s*(month|year)/i);
  if (!match) return 9999;
  const min = parseFloat(match[1]);
  const max = match[2] ? parseFloat(match[2]) : min;
  const avg = (min + max) / 2;
  if (match[3].toLowerCase().startsWith('year')) {
    return avg * 12;
  }
  return avg;
};

export default function ExplorePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Default");
  const [isGenerating, setIsGenerating] = useState(false);

  const [allCareers, setAllCareers] = useState<Career[]>(careers);

  useEffect(() => {
    const local = localStorage.getItem("custom_careers");
    if (local) {
      try {
        const parsed = JSON.parse(local) as Record<string, Career>;
        const combined = [...careers];
        const existingIds = new Set(combined.map((c) => c.id));
        Object.values(parsed).forEach((c) => {
          if (!existingIds.has(c.id)) {
            combined.push(c);
          }
        });
        setAllCareers(combined);
      } catch (e) {
        console.error("Failed to parse custom careers", e);
      }
    }
  }, []);

  const categories = ["All", ...Array.from(new Set(allCareers.map(c => c.category)))];

  const fuse = useMemo(() => new Fuse(allCareers, {
    keys: ["name", "description"],
    threshold: 0.3,
  }), [allCareers]);

  const filteredCareers = useMemo(() => {
    let result = allCareers;
    
    if (query.trim() !== "") {
      result = fuse.search(query).map(res => res.item);
    }
    
    if (category !== "All") {
      result = result.filter(c => c.category === category);
    }
    
    return result;
  }, [allCareers, query, category, fuse]);

  const sortedCareers = useMemo(() => {
    const list = [...filteredCareers];
    if (sortBy === "A-Z") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Peak Salary") {
      list.sort((a, b) => parseSalary(b.financial_reward?.highest_salary) - parseSalary(a.financial_reward?.highest_salary));
    } else if (sortBy === "Starting Salary") {
      list.sort((a, b) => parseSalary(b.financial_reward?.starting_salary) - parseSalary(a.financial_reward?.starting_salary));
    } else if (sortBy === "Safest AI Risk") {
      list.sort((a, b) => getRiskScore(a.market_outlook?.ai_risk) - getRiskScore(b.market_outlook?.ai_risk));
    } else if (sortBy === "Highest Job Growth") {
      list.sort((a, b) => parseGrowth(b.market_outlook?.job_growth) - parseGrowth(a.market_outlook?.job_growth));
    } else if (sortBy === "Fastest Paycheck") {
      list.sort((a, b) => parseRunway(a.time_to_first_payment?.estimate) - parseRunway(b.time_to_first_payment?.estimate));
    }
    return list;
  }, [filteredCareers, sortBy]);

  useEffect(() => {
    if (!query.trim() || isGenerating) return;
    if (filteredCareers.length > 0) return;

    const timer = setTimeout(() => {
      handleGenerate();
    }, 1200);

    return () => clearTimeout(timer);
  }, [query, filteredCareers.length, isGenerating]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGenerate = async () => {
    if (!query) return;
    setIsGenerating(true);
    
    try {
      const res = await fetch("/api/generate-career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
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
      
      router.push(`/career/${newCareer.id}`);
    } catch (e: any) {
      alert(e.message || "Failed to generate AI profile. Please try again later.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
        <div className="md:w-3/5 pr-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-900 mb-4 tracking-tight">Explore Careers</h1>
          <p className="text-xl text-neutral-600">Discover the trade-offs of different paths before you commit.</p>
        </div>
        <div className="relative w-full md:w-2/5 max-w-lg aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm flex-shrink-0">
          <Image 
            src="/images/explore.jpg"
            alt="Various career paths and tools"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input 
            type="text"
            placeholder="Search any career in the world (e.g. Prompt Engineer, Surgeon, Filmmaker)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-300 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-neutral-900 transition-shadow"
          />
        </div>
        <div className="flex flex-row gap-4 w-full md:w-auto shrink-0">
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-1 md:flex-none w-full md:w-auto px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:border-transparent focus:ring-neutral-900"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 md:flex-none w-full md:w-auto px-4 py-3 rounded-xl border-2 border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:border-transparent focus:ring-neutral-900"
          >
            <option value="Default">Sort: Default</option>
            <option value="A-Z">Alphabetical</option>
            <option value="Peak Salary">Peak Salary</option>
            <option value="Starting Salary">Starting Salary</option>
            <option value="Fastest Paycheck">Fastest Paycheck</option>
            <option value="Safest AI Risk">Safest AI Risk</option>
            <option value="Highest Job Growth">Highest Growth</option>
          </select>
        </div>
      </div>

      {sortedCareers.length === 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border-2 border-neutral-200 rounded-2xl bg-white shadow-sm overflow-hidden flex flex-col relative">
            <div className={`w-full aspect-[16/9] border-b border-neutral-100 flex flex-col items-center justify-center gap-3 transition-colors ${isGenerating ? 'bg-neutral-100' : 'bg-neutral-50'}`}>
              {isGenerating ? (
                <>
                  <Loader2 className="w-10 h-10 text-neutral-500 animate-spin" />
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest animate-pulse">Building AI Profile...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-10 h-10 text-neutral-300 animate-pulse" />
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Searching...</span>
                </>
              )}
            </div>
            <div className="p-6 flex flex-col">
              <div className="h-3 w-1/3 bg-neutral-200 rounded-full mb-4 animate-pulse"></div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2 flex items-center gap-2">
                {isGenerating && <Loader2 className="w-5 h-5 text-neutral-900 animate-spin" />}
                Analyzing "{query}"...
              </h3>
              <div className="h-4 w-full bg-neutral-100 rounded-full mb-2 animate-pulse"></div>
              <div className="h-4 w-5/6 bg-neutral-100 rounded-full mb-6 animate-pulse"></div>
              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-neutral-100">
                <Loader2 className={`w-4 h-4 text-neutral-500 ${isGenerating ? 'animate-spin' : ''}`} />
                <span className={`text-sm font-medium ${isGenerating ? 'text-neutral-900 font-bold' : 'text-neutral-400'}`}>
                  {isGenerating ? "Building complete profile using AI..." : "Preparing to discover trade-offs..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCareers.map(career => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>
      )}
    </div>
  );
}
