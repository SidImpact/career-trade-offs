import Link from "next/link";
import { 
  ArrowRight, 
  Search, 
  Scale, 
  Compass, 
  Sparkles, 
  AlertCircle, 
  Clock, 
  Layers, 
  UserCheck,
  ChevronRight,
  TrendingUp,
  Bot,
  DollarSign
} from "lucide-react";
import SupportSection from "@/components/SupportSection";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      
      {/* 1. HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto mb-16 md:mb-28">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
          <span>Make Career Decisions Based on Real Trade-Offs</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] mb-6">
          Every career has a cost. <br className="hidden md:block" />
          <span className="text-neutral-400">Find the one you're willing to pay.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Every path demands a sacrifice. We uncover the hidden friction, mental toll, and financial runway of any career path &mdash; from traditional roles to emerging fields.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link 
            href="/explore" 
            className="w-full sm:w-auto px-8 py-4 bg-neutral-900 text-white rounded-xl font-semibold text-base hover:bg-neutral-800 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 group"
          >
            Search & Explore Any Career
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Link>
          <Link 
            href="/quiz" 
            className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-neutral-300 text-neutral-900 rounded-xl font-semibold text-base hover:border-neutral-900 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2"
          >
            Take Compatibility Quiz
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Hero Concept Art */}
        <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-md bg-[#faf9f6] p-4 md:p-8">
          <img 
            src="/images/hero.jpg" 
            alt="Career Trade-Offs concept illustration" 
            className="w-full h-auto max-h-[380px] object-contain mx-auto mix-blend-multiply"
          />
          <div className="mt-4 pt-4 border-t border-neutral-200/60 flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm font-medium text-neutral-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-900"></span> 50+ Pre-built & Instant Search for Any Role
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-900"></span> Timeline to First Paycheck
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-900"></span> Starting to Peak Salary Data
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-900"></span> AI Risk & Future Outlook
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-900"></span> Side-by-Side Comparison
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-900"></span> Personal Tolerance Quiz
            </span>
          </div>
        </div>
      </section>

      {/* 2. GLIMPSE: EXPLORE CAREERS */}
      <section className="space-y-8 mb-16 md:mb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
              <Compass className="w-4 h-4 text-neutral-900" />
              <span>Explore Careers Directory</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
              Browse Reality Behind The Titles
            </h2>
            <p className="text-neutral-600 text-base mt-2 max-w-xl">
              Search any role, compare timeline demands, and uncover the real daily friction before committing.
            </p>
          </div>
          <Link 
            href="/explore" 
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors group self-start md:self-auto"
          >
            Browse Directory & Search Anything
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Career Preview Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Software Engineer */}
          <div className="border border-neutral-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
            <div className="relative w-full aspect-[16/9] bg-neutral-50 border-b border-neutral-100 p-4">
              <img 
                src="/images/career_software-engineer.jpg" 
                alt="Software Engineer illustration"
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Technology</span>
              <h3 className="text-xl font-bold text-neutral-900 mt-1 mb-2">Software Engineer</h3>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
                  <Clock className="w-3.5 h-3.5" />
                  6-12 Months to first pay
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  High Pay
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-neutral-600 mb-6 flex-grow">
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Continuous Upskilling (5/5)</div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Screen Fatigue (5/5)</div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div> Complexity Demand (4/5)</div>
              </div>
              <Link 
                href="/career/software-engineer"
                className="w-full py-3.5 px-4 bg-neutral-900 text-white rounded-xl text-sm font-semibold text-center hover:bg-neutral-800 transition-colors"
              >
                View Trade-Off Profile
              </Link>
            </div>
          </div>

          {/* Card 2: Doctor */}
          <div className="border border-neutral-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
            <div className="relative w-full aspect-[16/9] bg-neutral-50 border-b border-neutral-100 p-4">
              <img 
                src="/images/career_doctor.jpg" 
                alt="Doctor illustration"
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Healthcare</span>
              <h3 className="text-xl font-bold text-neutral-900 mt-1 mb-2">Doctor</h3>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
                  <Clock className="w-3.5 h-3.5" />
                  8 Years to first pay
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Exceptional Pay
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-neutral-600 mb-6 flex-grow">
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Decision Pressure (5/5)</div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Work-Life Disruption (5/5)</div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Emotional Stress (5/5)</div>
              </div>
              <Link 
                href="/career/doctor"
                className="w-full py-3.5 px-4 bg-neutral-900 text-white rounded-xl text-sm font-semibold text-center hover:bg-neutral-800 transition-colors"
              >
                View Trade-Off Profile
              </Link>
            </div>
          </div>

          {/* Card 3: Stock Trader */}
          <div className="border border-neutral-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
            <div className="relative w-full aspect-[16/9] bg-neutral-50 border-b border-neutral-100 p-4">
              <img 
                src="/images/career_stock-trader.jpg" 
                alt="Stock Trader illustration"
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Finance & Investing</span>
              <h3 className="text-xl font-bold text-neutral-900 mt-1 mb-2">Stock Trader</h3>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-50 text-green-700 text-xs font-semibold border border-green-200">
                  <Clock className="w-3.5 h-3.5" />
                  6-24 Months to first pay
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Exceptional Pay
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-neutral-600 mb-6 flex-grow">
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Income Instability (5/5)</div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Emotional Stress (5/5)</div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Fear of Failure (5/5)</div>
              </div>
              <Link 
                href="/career/stock-trader"
                className="w-full py-3.5 px-4 bg-neutral-900 text-white rounded-xl text-sm font-semibold text-center hover:bg-neutral-800 transition-colors"
              >
                View Trade-Off Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GLIMPSE: CAREER DETAILED BREAKDOWN */}
      <section className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 md:p-12 space-y-10 mb-16 md:mb-28">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
            <Layers className="w-4 h-4 text-neutral-900" />
            <span>Career Detailed Profile</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
            Inside A Deep Dive Breakdown
          </h2>
          <p className="text-neutral-600 text-base mt-2 max-w-xl">
            Each career profile contains granular friction scores, hidden costs, and realistic timeline milestones.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Trade-off & Hidden Cost */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
              <h3 className="font-bold text-neutral-900 text-lg flex items-center justify-between">
                <span>Trade-Off Demands</span>
                <span className="text-xs font-semibold text-neutral-400">Sample: Blockchain Engineer</span>
              </h3>
              
              {/* Sample Rating Bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-neutral-700">Continuous Upskilling</span>
                    <span className="text-neutral-900 font-bold">5/5 (Very High)</span>
                  </div>
                  <div className="flex gap-1 h-2.5">
                    <div className="flex-1 rounded-sm bg-red-500"></div>
                    <div className="flex-1 rounded-sm bg-red-500"></div>
                    <div className="flex-1 rounded-sm bg-red-500"></div>
                    <div className="flex-1 rounded-sm bg-red-500"></div>
                    <div className="flex-1 rounded-sm bg-red-500"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-neutral-700">Decision Pressure</span>
                    <span className="text-neutral-900 font-bold">4/5 (High)</span>
                  </div>
                  <div className="flex gap-1 h-2.5">
                    <div className="flex-1 rounded-sm bg-orange-400"></div>
                    <div className="flex-1 rounded-sm bg-orange-400"></div>
                    <div className="flex-1 rounded-sm bg-orange-400"></div>
                    <div className="flex-1 rounded-sm bg-orange-400"></div>
                    <div className="flex-1 rounded-sm bg-neutral-200"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-neutral-700">Income Instability</span>
                    <span className="text-neutral-900 font-bold">2/5 (Low)</span>
                  </div>
                  <div className="flex gap-1 h-2.5">
                    <div className="flex-1 rounded-sm bg-green-400"></div>
                    <div className="flex-1 rounded-sm bg-green-400"></div>
                    <div className="flex-1 rounded-sm bg-neutral-200"></div>
                    <div className="flex-1 rounded-sm bg-neutral-200"></div>
                    <div className="flex-1 rounded-sm bg-neutral-200"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hidden Cost Sample */}
            <div className="bg-neutral-900 text-white p-6 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>The Hidden Cost</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                The psychological burden of code immutability &mdash; deploying a single smart contract vulnerability can permanently lose millions in user funds with zero rollback.
              </p>
            </div>
          </div>

          {/* Right: Timeline to First Paycheck */}
          <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-neutral-900 text-lg">Timeline to First Paycheck</h3>
                <p className="text-xs text-neutral-500 mt-0.5">Estimated time from beginner to first dollar earned.</p>
              </div>
              <span className="px-3 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-bold border border-green-200">
                6-18 Months
              </span>
            </div>

            {/* Milestones Steps */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Foundational CS & Cryptography</h4>
                  <p className="text-xs text-neutral-500">3-6 months self-study or intensive bootcamps</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Smart Contract Audits & Bug Bounties</h4>
                  <p className="text-xs text-neutral-500">2-4 months building on-chain public proof</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">First Protocol Role / Contract</h4>
                  <p className="text-xs text-neutral-500">1-3 months technical interviewing & placement</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <h4 className="text-xs font-bold text-neutral-900 mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                The Ultimate Gatekeeper
              </h4>
              <p className="text-xs text-neutral-600">
                Passing adversarial live-coding interviews and proving you do not write exploitable smart contract logic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GLIMPSE: FINANCIAL REWARD & EARNINGS */}
      <section className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 md:p-12 space-y-8 mb-16 md:mb-28 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
              <DollarSign className="w-4 h-4 text-neutral-900" />
              <span>Financial Reward & Compensation</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
              Realistic Earnings & Growth Trajectories
            </h2>
            <p className="text-neutral-600 text-base mt-2 max-w-xl">
              Know what you are working toward. We break down realistic starting salaries, average earnings, and true peak compensation &mdash; with estimated monthly calculations.
            </p>
          </div>
          <Link 
            href="/explore" 
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors group self-start md:self-auto"
          >
            Explore All Salaries
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Interactive Financial Cards with Tier Progression */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Software Engineer */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Technology</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  High Pay Tier
                </span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1">Software Engineer</h3>
              <p className="text-xs text-neutral-500 mb-4">Steady progression from junior developer to senior staff architect.</p>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-neutral-100">
              <div className="flex items-center justify-between bg-neutral-50 p-2.5 rounded-xl">
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Starting</span>
                  <span className="text-sm font-extrabold text-neutral-900">$80k - $120k</span>
                </div>
                <span className="text-xs font-medium text-neutral-500">~ $8.3k/mo</span>
              </div>

              <div className="flex items-center justify-between bg-neutral-100/80 p-2.5 rounded-xl">
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Average</span>
                  <span className="text-sm font-extrabold text-neutral-900">$130k - $180k</span>
                </div>
                <span className="text-xs font-medium text-neutral-600">~ $12.9k/mo</span>
              </div>

              <div className="flex items-center justify-between bg-neutral-900 p-2.5 rounded-xl text-white">
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Peak</span>
                  <span className="text-sm font-extrabold text-white">$300k+</span>
                </div>
                <span className="text-xs font-medium text-neutral-300">~ $25k/mo</span>
              </div>
            </div>
          </div>

          {/* Card 2: Investment Banker */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Finance & Banking</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  Exceptional Tier
                </span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1">Investment Banker</h3>
              <p className="text-xs text-neutral-500 mb-4">High-intensity bonuses scale rapidly into massive Managing Director carry.</p>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-neutral-100">
              <div className="flex items-center justify-between bg-neutral-50 p-2.5 rounded-xl">
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Starting</span>
                  <span className="text-sm font-extrabold text-neutral-900">$120k - $180k</span>
                </div>
                <span className="text-xs font-medium text-neutral-500">~ $12.5k/mo</span>
              </div>

              <div className="flex items-center justify-between bg-neutral-100/80 p-2.5 rounded-xl">
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Average</span>
                  <span className="text-sm font-extrabold text-neutral-900">$250k - $500k</span>
                </div>
                <span className="text-xs font-medium text-neutral-600">~ $31.2k/mo</span>
              </div>

              <div className="flex items-center justify-between bg-neutral-900 p-2.5 rounded-xl text-white">
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Peak</span>
                  <span className="text-sm font-extrabold text-white">$1M+</span>
                </div>
                <span className="text-xs font-medium text-neutral-300">~ $83.3k/mo</span>
              </div>
            </div>
          </div>

          {/* Card 3: Doctor */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Healthcare</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  Exceptional Tier
                </span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1">Doctor (Specialist)</h3>
              <p className="text-xs text-neutral-500 mb-4">Delayed gratification followed by guaranteed top-tier compensation.</p>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-neutral-100">
              <div className="flex items-center justify-between bg-neutral-50 p-2.5 rounded-xl">
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Starting</span>
                  <span className="text-sm font-extrabold text-neutral-900">$180k - $250k</span>
                </div>
                <span className="text-xs font-medium text-neutral-500">~ $17.9k/mo</span>
              </div>

              <div className="flex items-center justify-between bg-neutral-100/80 p-2.5 rounded-xl">
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Average</span>
                  <span className="text-sm font-extrabold text-neutral-900">$280k - $400k</span>
                </div>
                <span className="text-xs font-medium text-neutral-600">~ $28.3k/mo</span>
              </div>

              <div className="flex items-center justify-between bg-neutral-900 p-2.5 rounded-xl text-white">
                <div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Peak</span>
                  <span className="text-sm font-extrabold text-white">$600k+</span>
                </div>
                <span className="text-xs font-medium text-neutral-300">~ $50k/mo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GLIMPSE: FUTURE OUTLOOK & AI RISK */}
      <section className="bg-white border border-neutral-200 rounded-3xl p-8 md:p-12 space-y-8 mb-16 md:mb-28 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
              <TrendingUp className="w-4 h-4 text-neutral-900" />
              <span>Job Security & Market Demand</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
              Future Outlook & AI Risk Analysis
            </h2>
            <p className="text-neutral-600 text-base mt-2 max-w-xl">
              We track AI automation risk, 10-year job growth projections, and the unfiltered market reality for every career so you never step into a declining field blind.
            </p>
          </div>
          <Link 
            href="/explore" 
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors group self-start md:self-auto"
          >
            Check Any Career's Outlook
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Software Engineer Outlook */}
          <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Technology</span>
              <span className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-md text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-200">
                Moderate AI Risk
              </span>
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Software Engineer</h3>
            <div className="space-y-2 pt-2 border-t border-neutral-200/60 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500 font-semibold">10-Year Growth:</span>
                <span className="font-bold text-neutral-900">+25% (Much faster)</span>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold block mb-1">Market Reality:</span>
                <p className="text-neutral-600 leading-relaxed">
                  Entry-level hiring is intensely competitive due to AI coding assistants, but senior systems architects remain in extreme demand.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Graphic Designer Outlook */}
          <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Creative & Media</span>
              <span className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                High AI Risk
              </span>
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Graphic Designer</h3>
            <div className="space-y-2 pt-2 border-t border-neutral-200/60 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500 font-semibold">10-Year Growth:</span>
                <span className="font-bold text-neutral-900">+3% (Slower)</span>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold block mb-1">Market Reality:</span>
                <p className="text-neutral-600 leading-relaxed">
                  Generative image AI is commoditizing routine production work, forcing designers toward high-level brand strategy and art direction.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Doctor Outlook */}
          <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Healthcare</span>
              <span className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-md text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                Low AI Risk
              </span>
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Doctor (Physician)</h3>
            <div className="space-y-2 pt-2 border-t border-neutral-200/60 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500 font-semibold">10-Year Growth:</span>
                <span className="font-bold text-neutral-900">+7% (Faster)</span>
              </div>
              <div>
                <span className="text-neutral-500 font-semibold block mb-1">Market Reality:</span>
                <p className="text-neutral-600 leading-relaxed">
                  Aging demographics guarantee perpetual demand; legal liability and physical clinical procedures make replacement virtually impossible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GLIMPSE: COMPARE CAREERS */}
      <section className="space-y-8 mb-16 md:mb-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
              <Scale className="w-4 h-4 text-neutral-900" />
              <span>Compare Careers Tool</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
              Direct Side-by-Side Trade-Offs
            </h2>
            <p className="text-neutral-600 text-base mt-2 max-w-xl">
              Can't decide between 2 or 3 careers? Put them in the ring and contrast their demands side-by-side.
            </p>
          </div>
          <Link 
            href="/compare" 
            className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 hover:text-neutral-600 transition-colors group self-start md:self-auto"
          >
            Launch Comparison Matrix
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Interactive Comparison Preview Table */}
        <div className="border border-neutral-200 rounded-2xl bg-white shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/80">
                <th className="p-4 font-bold text-neutral-900 w-1/4">Key Dimension</th>
                <th className="p-4 font-bold text-neutral-900 w-1/4">Software Engineer</th>
                <th className="p-4 font-bold text-neutral-900 w-1/4">Doctor</th>
                <th className="p-4 font-bold text-neutral-900 w-1/4">Stock Trader</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="p-4 font-semibold text-neutral-700 bg-neutral-50/40">Time to First Pay</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-50 text-green-700 font-semibold text-xs border border-green-200">
                    <Clock className="w-3.5 h-3.5" />
                    6-12 Months
                  </span>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-50 text-green-700 font-semibold text-xs border border-green-200">
                    <Clock className="w-3.5 h-3.5" />
                    8 Years
                  </span>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-50 text-green-700 font-semibold text-xs border border-green-200">
                    <Clock className="w-3.5 h-3.5" />
                    6-24 Months
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-700 bg-neutral-50/40">Financial Reward (Peak)</td>
                <td className="p-4">
                  <div className="font-extrabold text-neutral-900">$300k+</div>
                  <div className="text-xs text-neutral-400">~ $25k/mo (High Tier)</div>
                </td>
                <td className="p-4">
                  <div className="font-extrabold text-neutral-900">$600k+</div>
                  <div className="text-xs text-neutral-400">~ $50k/mo (Exceptional)</div>
                </td>
                <td className="p-4">
                  <div className="font-extrabold text-neutral-900">Uncapped ($500k+)</div>
                  <div className="text-xs text-neutral-400">~ $41.7k/mo (Variable)</div>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-700 bg-neutral-50/40">AI Automation Risk</td>
                <td className="p-4">
                  <span className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-md text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-200">
                    Moderate
                  </span>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-md text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                    Low
                  </span>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-md text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-200">
                    Moderate
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-700 bg-neutral-50/40">Runway Demand</td>
                <td className="p-4 text-neutral-800 font-medium">Moderate</td>
                <td className="p-4 text-neutral-800 font-bold text-red-600">Extreme</td>
                <td className="p-4 text-neutral-800 font-bold text-red-600">Extreme (Risk Capital)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-700 bg-neutral-50/40">Heaviest Friction</td>
                <td className="p-4 text-neutral-600">Screen Fatigue & Relentless Upskilling</td>
                <td className="p-4 text-neutral-600">Sleep Loss & Decision Pressure</td>
                <td className="p-4 text-neutral-600">Financial Loss & Isolation</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-neutral-700 bg-neutral-50/40">Who Thrives</td>
                <td className="p-4 text-neutral-600">Deep thinkers who enjoy logical building</td>
                <td className="p-4 text-neutral-600">Resilient people who endure high stress</td>
                <td className="p-4 text-neutral-600">Emotionally detached risk-takers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. GLIMPSE: PROFILE & ASSESSMENT */}
      <section className="bg-neutral-900 text-white rounded-3xl p-8 md:p-14 relative overflow-hidden mb-16 md:mb-28">
        <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-semibold">
              <UserCheck className="w-3.5 h-3.5 text-green-400" />
              <span>Personal Compatibility Assessment</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Discover which struggles you're wired to handle.
            </h2>
            
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
              Take our 3-minute quiz. We evaluate your tolerance for isolation, financial runway, schedule instability, and cognitive pressure to calculate your exact career compatibility scores.
            </p>

            <div className="pt-2">
              <Link 
                href="/quiz"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-900 rounded-xl font-bold text-base hover:bg-neutral-100 transition-colors shadow-sm"
              >
                Start Assessment Quiz
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Card: Quiz Sample Prompt */}
          <div className="md:col-span-5 bg-neutral-800/90 border border-neutral-700 p-6 md:p-8 rounded-2xl space-y-4">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Sample Assessment Question</span>
            <h4 className="text-lg font-bold text-white leading-snug">
              "How long can you afford to build your skills with ZERO income?"
            </h4>
            <div className="space-y-2 pt-2">
              <div className="p-3 rounded-xl border border-neutral-700 bg-neutral-900/60 text-xs font-medium text-neutral-300 flex items-center justify-between">
                <span>&lt; 1 Month (Immediate Income Needed)</span>
                <span className="text-green-400">⚡ Fast Runway</span>
              </div>
              <div className="p-3 rounded-xl border border-neutral-700 bg-neutral-900/60 text-xs font-medium text-neutral-300 flex items-center justify-between">
                <span>6–12 Months (Self-Taught / Bootcamp)</span>
                <span className="text-blue-400">⚖️ Moderate</span>
              </div>
              <div className="p-3 rounded-xl border border-neutral-700 bg-neutral-900/60 text-xs font-medium text-neutral-300 flex items-center justify-between">
                <span>3–8+ Years (Academic / Degree)</span>
                <span className="text-purple-400">🎓 High Delay</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DEVELOPER SUPPORT & DONATIONS */}
      <SupportSection />

    </div>
  );
}

