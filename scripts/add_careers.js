const fs = require('fs');
const path = require('path');

const newCareers = [
  {
    "id": "stock-trader",
    "name": "Stock Trader",
    "category": "FINANCE & INVESTING",
    "description": "Stock Traders buy and sell shares in companies to profit from market fluctuations. This career requires a deep understanding of financial markets, technical analysis, and extreme emotional discipline.",
    "upside_summary": [
      "Uncapped earning potential.",
      "Complete autonomy and independence.",
      "No boss or clients to answer to.",
      "Location independence (trade from anywhere)."
    ],
    "hidden_cost": {
      "description": "The psychological toll of losing money and the stress of constant market volatility.",
      "struggles": [
        "Enduring severe income instability and potential capital loss.",
        "Managing extreme emotional stress during market downturns.",
        "Working in isolation without a traditional team.",
        "Dealing with the constant pressure of making split-second decisions."
      ]
    },
    "who_may_thrive": [
      "Highly analytical individuals who can detach emotions from money.",
      "People with extreme risk tolerance and discipline.",
      "Those who prefer working completely independently."
    ],
    "who_may_struggle": [
      "Individuals who need a steady, predictable paycheck.",
      "People prone to emotional decision-making or gambling tendencies.",
      "Those who thrive in collaborative, social work environments."
    ],
    "struggles": {
      "Income Instability": 5,
      "Emotional Stress": 5,
      "Uncertainty": 5,
      "Isolation": 4,
      "Decision Pressure": 5,
      "Failure": 5,
      "Screen Fatigue": 4
    },
    "time_to_first_payment": {
      "estimate": "6-24 Months",
      "runway_demand": "Extreme",
      "gatekeeper": "Achieving consistent profitability and building a large enough capital base to live off the returns.",
      "milestones": [
        { "phase": "Learning Market Fundamentals & Paper Trading", "duration": "3-6 months" },
        { "phase": "Developing and Backtesting a Strategy", "duration": "3-6 months" },
        { "phase": "Trading Live Capital to Profitability", "duration": "6-12+ months" }
      ]
    }
  },
  {
    "id": "gamer",
    "name": "Gamer (Streamer/Content Creator)",
    "category": "ENTERTAINMENT & MEDIA",
    "description": "Professional Gamers and Streamers entertain audiences by broadcasting their gameplay, providing commentary, and building online communities. It blends high-level gaming skills with intense audience engagement.",
    "upside_summary": [
      "Getting paid to play video games.",
      "Building and leading a passionate community.",
      "Creative control over your content and brand.",
      "Flexible schedule and location independence."
    ],
    "hidden_cost": {
      "description": "The grueling grind of feeding the algorithm and the high risk of burnout from constantly being 'on'.",
      "struggles": [
        "Enduring severe income instability in the early years.",
        "Dealing with intense screen fatigue and sedentary health issues.",
        "Constantly fighting platform algorithms for visibility.",
        "Facing intense public scrutiny, trolls, and parasocial relationships."
      ]
    },
    "who_may_thrive": [
      "Highly charismatic entertainers who can talk for hours.",
      "People who are extremely consistent and disciplined.",
      "Individuals with a thick skin for internet culture."
    ],
    "who_may_struggle": [
      "Introverts who find prolonged social performance exhausting.",
      "People who need a guaranteed steady income.",
      "Those who struggle to separate their self-worth from their viewership metrics."
    ],
    "struggles": {
      "Income Instability": 5,
      "Screen Fatigue": 5,
      "Long Hours": 5,
      "Sitting/Standing": 5,
      "Competition": 5,
      "Public Interaction": 4,
      "Uncertainty": 4
    },
    "time_to_first_payment": {
      "estimate": "6-24 Months",
      "runway_demand": "High",
      "gatekeeper": "Building a large enough concurrent viewership to attract sponsorships and subscriptions.",
      "milestones": [
        { "phase": "Consistent Streaming & Content Creation", "duration": "6-12 months" },
        { "phase": "Reaching Affiliate/Monetization Thresholds", "duration": "3-6 months" },
        { "phase": "Securing First Sponsor or Meaningful Ad Revenue", "duration": "Variable" }
      ]
    }
  },
  {
    "id": "prompt-engineer",
    "name": "Prompt Engineer",
    "category": "TECHNOLOGY & ENGINEERING",
    "description": "Prompt Engineers specialize in designing, refining, and optimizing text prompts to coax the best possible outputs from large language models (LLMs) and AI systems.",
    "upside_summary": [
      "Working at the absolute cutting edge of technology.",
      "High demand in a rapidly growing, lucrative field.",
      "Creative and linguistic problem-solving.",
      "High likelihood of remote work and flexible hours."
    ],
    "hidden_cost": {
      "description": "The exhausting pace of AI development where your specific skills can become obsolete overnight.",
      "struggles": [
        "Constantly relearning tools as AI models update rapidly.",
        "Dealing with the ambiguity and 'black box' nature of AI.",
        "Enduring heavy screen time and mental fatigue.",
        "Having to constantly prove the value of your novel role to traditional management."
      ]
    },
    "who_may_thrive": [
      "Highly adaptable learners who love experimenting.",
      "People with a strong mix of linguistic precision and technical logic.",
      "Those who thrive in undefined, fast-moving environments."
    ],
    "who_may_struggle": [
      "People who prefer established protocols and stable toolsets.",
      "Individuals who get frustrated by inconsistent or unpredictable software behavior.",
      "Those looking for a career path with decades of proven stability."
    ],
    "struggles": {
      "Continuous Learning": 5,
      "Continuous Upskilling": 5,
      "Uncertainty": 4,
      "Screen Fatigue": 4,
      "Mental Fatigue": 4,
      "Complexity": 4
    },
    "time_to_first_payment": {
      "estimate": "3-6 Months",
      "runway_demand": "Low",
      "gatekeeper": "Proving your ability to consistently coax high-quality, complex outputs from AI models in a professional portfolio.",
      "milestones": [
        { "phase": "Learning AI Models & Prompting Techniques", "duration": "1-3 months" },
        { "phase": "Building a Portfolio of Prompts/Workflows", "duration": "1-2 months" },
        { "phase": "Landing First Freelance Gig or Junior Role", "duration": "1-2 months" }
      ]
    }
  }
];

const targetPath = path.join(process.cwd(), 'src/data/careers.ts');
let tsData = fs.readFileSync(targetPath, 'utf8');

// Parse the current array
const match = tsData.match(/export const careers:\s*Career\[\]\s*=\s*(\[[\s\S]*\]);/);
if (match) {
  let currentCareers = eval(match[1]);
  // Append new
  for (const c of newCareers) {
    if (!currentCareers.find(existing => existing.id === c.id)) {
      currentCareers.push(c);
    }
  }
  
  const fileContent = 'import { Career } from "./types";\n\nexport const careers: Career[] = ' + JSON.stringify(currentCareers, null, 2) + ';\n';
  fs.writeFileSync(targetPath, fileContent, 'utf-8');
  console.log("Successfully appended new careers to src/data/careers.ts");
} else {
  console.error("Failed to parse careers array from careers.ts");
}
