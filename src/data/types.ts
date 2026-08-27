export type StruggleCategory = 
  | "Mental Fatigue"
  | "Continuous Learning"
  | "Decision Pressure"
  | "Complexity"
  | "Concentration Demand"
  | "Long Hours"
  | "Irregular Schedule"
  | "Work-Life Disruption"
  | "Lack of Flexibility"
  | "Travel Requirements"
  | "Physical Strain"
  | "Screen Fatigue"
  | "Sitting/Standing"
  | "Sleep Disruption"
  | "Isolation"
  | "Public Interaction"
  | "Customer Interaction"
  | "Conflict"
  | "Competition"
  | "Networking Pressure"
  | "Income Instability"
  | "Job Security"
  | "Time Until Financial Reward"
  | "Career Entry Cost"
  | "Emotional Stress"
  | "Rejection"
  | "Failure"
  | "Responsibility"
  | "Uncertainty"
  | "Pressure"
  | "Continuous Upskilling"
  | "Slow Progression"
  | "Credential Requirements"
  | "High Entry Barrier"
  | "Deadline Pressure"
  | "Repetitive Work"
  | "Social Interaction"
  | "Long Training";

export interface TimeToFirstPayment {
  estimate: string;
  runway_demand: "Low" | "Moderate" | "High" | "Extreme" | "Unpredictable";
  gatekeeper: string;
  milestones: { phase: string; duration: string }[];
}

export interface FinancialReward {
  tier: "Low" | "Moderate" | "High" | "Exceptional";
  starting_salary: string;
  average_salary: string;
  highest_salary: string;
  trajectory: string;
}

export interface MarketOutlook {
  ai_risk: "Low" | "Moderate" | "High" | "Extreme";
  job_growth: string;
  market_reality: string;
}

export interface Career {
  id: string;
  name: string;
  category: string;
  description: string;
  upside_summary: string[];
  hidden_cost: {
    description: string;
    struggles: string[];
  };
  who_may_thrive: string[];
  who_may_struggle: string[];
  struggles: Partial<Record<StruggleCategory, number>>;
  time_to_first_payment?: TimeToFirstPayment;
  financial_reward?: FinancialReward;
  market_outlook?: MarketOutlook;
}
