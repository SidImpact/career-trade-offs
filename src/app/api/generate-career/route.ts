import { NextResponse } from 'next/server';

const rateLimitMap = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    
    // Allow 1 request per 30 seconds per IP
    if (rateLimitMap.has(ip)) {
      const lastRequest = rateLimitMap.get(ip)!;
      if (now - lastRequest < 30000) {
        return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
      }
    }
    rateLimitMap.set(ip, now);

    const { query } = await req.json();
    
    if (!query || query.length > 80) {
      return NextResponse.json({ error: 'Invalid career name (max 80 characters).' }, { status: 400 });
    }
    
    const apiKey = process.env.GEMINI_API_KEY;
    const id = query.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const formattedName = query.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    if (apiKey) {
      const prompt = `You are an expert career and labor market analyst. Analyze the career: "${query}".
Return a strictly valid JSON object representing its Trade-Off profile with realistic struggle ratings from 1 to 5 (1=Very Low, 2=Low, 3=Moderate, 4=High, 5=Very High).
Output ONLY the JSON object, without any markdown formatting, backticks, or intro/outro comments.

JSON schema:
{
  "id": "${id}",
  "name": "${formattedName}",
  "category": "Appropriate industry category (e.g., Technology, Healthcare, Finance, Creative & Media, Engineering, Law, Education, Aviation, etc.)",
  "description": "2-3 sentences realistic overview of the career, what it involves, and its general market context.",
  "upside_summary": [
    "Compelling upside 1",
    "Compelling upside 2",
    "Compelling upside 3"
  ],
  "hidden_cost": {
    "description": "1-2 sentences explaining the major unspoken sacrifice or price of this career.",
    "struggles": [
      "Realistic specific struggle 1",
      "Realistic specific struggle 2",
      "Realistic specific struggle 3",
      "Realistic specific struggle 4"
    ]
  },
  "who_may_thrive": [
    "Personality/skill trait 1",
    "Personality/skill trait 2",
    "Personality/skill trait 3"
  ],
  "who_may_struggle": [
    "Personality/preference trait 1",
    "Personality/preference trait 2",
    "Personality/preference trait 3"
  ],
  "struggles": {
    "Mental Fatigue": 1-5,
    "Continuous Learning": 1-5,
    "Decision Pressure": 1-5,
    "Complexity": 1-5,
    "Concentration Demand": 1-5,
    "Long Hours": 1-5,
    "Irregular Schedule": 1-5,
    "Work-Life Disruption": 1-5,
    "Physical Strain": 1-5,
    "Screen Fatigue": 1-5,
    "Isolation": 1-5,
    "Public Interaction": 1-5,
    "Income Instability": 1-5,
    "Emotional Stress": 1-5,
    "Uncertainty": 1-5
  },
  "time_to_first_payment": {
    "estimate": "e.g. 6-12 Months, 7-10 Years",
    "runway_demand": "Low | Moderate | High | Extreme | Unpredictable",
    "gatekeeper": "The hardest hurdle before earning money (1 sentence)",
    "milestones": [
      { "phase": "Phase name", "duration": "e.g. 3-6 months" },
      { "phase": "Phase name", "duration": "e.g. 2-4 months" }
    ]
  },
  "financial_reward": {
    "tier": "Low | Moderate | High | Exceptional",
    "starting_salary": "e.g. $50k - $70k (US Baseline)",
    "average_salary": "e.g. $90k - $120k (US Baseline)",
    "highest_salary": "e.g. $250k+ (US Baseline)",
    "trajectory": "1 sentence describing the earnings growth trajectory"
  },
  "market_outlook": {
    "ai_risk": "Low | Moderate | High | Extreme",
    "job_growth": "e.g. Much faster than average (+14%)",
    "market_reality": "1-2 sentence blunt summary of how hard it is to get hired right now and keep the job."
  }
}`;

      // List of candidate models to try
      const models = ['gemini-3.7-flash', 'gemini-3.5-flash', 'gemini-2.5-flash'];

      for (const model of models) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.4,
                responseMimeType: "application/json"
              }
            })
          });

          if (response.ok) {
            const data = await response.json();
            const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textResponse) {
              // Clean any potential markdown wrapping
              const cleaned = textResponse.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '').trim();
              const parsed = JSON.parse(cleaned);
              return NextResponse.json(parsed);
            }
          } else {
            const errData = await response.text();
            console.warn(`Model ${model} returned error status ${response.status}:`, errData);
          }
        } catch (err) {
          console.warn(`Attempt with ${model} failed:`, err);
        }
      }
    }
    // If we reach here, all models failed (likely due to rate limits)
    return NextResponse.json(
      { error: "AI Quota Exhausted. Please wait a few hours before generating new careers." },
      { status: 429 }
    );
  } catch (error) {
    console.error("API error in generate-career:", error);
    return NextResponse.json({ error: 'Failed to generate career' }, { status: 500 });
  }
}
