const fs = require('fs');

const data = fs.readFileSync('src/data/careers.ts', 'utf8');

const updatedData = data.replace(
  /\{\s*"id": "air-traffic-controller"[\s\S]*?(?=\}\s*\])/g,
  `{
    "id": "air-traffic-controller",
    "name": "Air Traffic Controller",
    "category": "Aviation",
    "description": "Air Traffic Controllers coordinate the safe and efficient movement of aircraft, managing airspace to prevent collisions and minimize delays. The role is infamous for its relentless concentration demands and zero-margin-for-error environment.",
    "upside_summary": [
      "Excellent federal benefits and early retirement options",
      "Highly respected, life-saving critical infrastructure role",
      "Once you leave the tower, the work doesn't follow you home"
    ],
    "hidden_cost": {
      "description": "The mental toll of carrying thousands of lives in your hands with absolutely zero margin for error, compounded by harsh shift work.",
      "struggles": [
        "Extreme, unyielding concentration required for hours",
        "Graveyard shifts and erratic schedules disrupting sleep",
        "Inability to 'make a mistake and fix it later'",
        "High baseline stress leading to early burnout"
      ]
    },
    "who_may_thrive": [
      "Hyper-focused individuals who excel under immediate pressure",
      "People who can compartmentalize extreme stress",
      "Those who prefer leaving their work entirely at the office"
    ],
    "who_may_struggle": [
      "Anyone prone to anxiety or panic under pressure",
      "People who struggle with spatial reasoning or multi-tasking",
      "Those who need a standard circadian rhythm and predictable schedules"
    ],
    "struggles": {
      "Mental Fatigue": 5,
      "Continuous Learning": 3,
      "Decision Pressure": 5,
      "Complexity": 4,
      "Concentration Demand": 5,
      "Long Hours": 3,
      "Irregular Schedule": 5,
      "Work-Life Disruption": 5,
      "Physical Strain": 2,
      "Screen Fatigue": 4,
      "Isolation": 3,
      "Public Interaction": 1,
      "Income Instability": 1,
      "Emotional Stress": 5,
      "Uncertainty": 3
    }
  },
  {
    "id": "cybersecurity-specialist",
    "name": "Cybersecurity Specialist",
    "category": "Technology",
    "description": "Cybersecurity Specialists protect organizations from digital threats, designing secure networks and responding to ongoing cyber attacks. It is a constantly shifting cat-and-mouse game against malicious actors, demanding perpetual learning and high-stakes incident response.",
    "upside_summary": [
      "Massive industry demand and excellent compensation",
      "Intellectually stimulating 'cat-and-mouse' puzzle solving",
      "Mission-driven work protecting critical data"
    ],
    "hidden_cost": {
      "description": "You are expected to be right 100% of the time, while the attackers only need to be right once, creating a state of chronic paranoia and on-call stress.",
      "struggles": [
        "Chronic stress of an inevitable breach",
        "On-call emergencies disrupting weekends and nights",
        "The exhausting pace of keeping up with new attack vectors",
        "Being blamed when things go wrong, but invisible when they go right"
      ]
    },
    "who_may_thrive": [
      "Analytical thinkers with an 'adversarial' mindset",
      "People who love continuous learning and complex puzzles",
      "Calm problem solvers during high-stakes crises"
    ],
    "who_may_struggle": [
      "Those who want a relaxing, predictable workday",
      "People who struggle to disconnect from work paranoia",
      "Individuals who dislike constant technical reading"
    ],
    "struggles": {
      "Mental Fatigue": 5,
      "Continuous Learning": 5,
      "Decision Pressure": 4,
      "Complexity": 5,
      "Concentration Demand": 4,
      "Long Hours": 4,
      "Irregular Schedule": 4,
      "Work-Life Disruption": 4,
      "Physical Strain": 2,
      "Screen Fatigue": 5,
      "Isolation": 3,
      "Public Interaction": 2,
      "Income Instability": 1,
      "Emotional Stress": 5,
      "Uncertainty": 4
    }
  },
  {
    "id": "ai-engineer",
    "name": "AI Engineer",
    "category": "Technology",
    "description": "AI Engineers design, build, and deploy artificial intelligence models and machine learning algorithms. Operating at the bleeding edge of technology, this role requires deep mathematical intuition and the ability to navigate extreme industry hype.",
    "upside_summary": [
      "Top-tier compensation and prestige in the tech industry",
      "Working on the frontier of human technological advancement",
      "High autonomy and intellectual freedom"
    ],
    "hidden_cost": {
      "description": "The field moves so fast that your expertise can become obsolete in months, leading to an exhausting treadmill of continuous study just to stay relevant.",
      "struggles": [
        "The relentless pace of AI research and new frameworks",
        "Managing wildly unrealistic expectations from business leaders",
        "Debugging 'black box' models that fail inexplicably",
        "High mental fatigue from complex mathematical modeling"
      ]
    },
    "who_may_thrive": [
      "Deep mathematical thinkers and logic enthusiasts",
      "People who are obsessed with keeping up with cutting-edge research",
      "Those who can translate abstract math into business value"
    ],
    "who_may_struggle": [
      "Individuals who prefer stable, mature technologies that don't change",
      "Those who struggle with abstract statistics and calculus",
      "People who dislike being caught in industry hype cycles"
    ],
    "struggles": {
      "Mental Fatigue": 5,
      "Continuous Learning": 5,
      "Decision Pressure": 3,
      "Complexity": 5,
      "Concentration Demand": 5,
      "Long Hours": 4,
      "Irregular Schedule": 2,
      "Work-Life Disruption": 3,
      "Physical Strain": 2,
      "Screen Fatigue": 5,
      "Isolation": 4,
      "Public Interaction": 2,
      "Income Instability": 2,
      "Emotional Stress": 3,
      "Uncertainty": 5
    }
  },
  {
    "id": "cloud-engineer",
    "name": "Cloud Engineer",
    "category": "Technology",
    "description": "Cloud Engineers architect, build, and maintain scalable cloud infrastructure across platforms like AWS, Azure, and GCP. They are the backbone of modern software, responsible for keeping complex, distributed systems highly available and secure.",
    "upside_summary": [
      "High demand across literally every modern industry",
      "Ability to work entirely remotely with great pay",
      "Building massive, globally distributed systems"
    ],
    "hidden_cost": {
      "description": "When the cloud goes down, the entire company stops. The pressure of maintaining five-nines (99.999%) uptime leads to severe on-call anxiety.",
      "struggles": [
        "Being paged at 3 AM because a server cluster crashed",
        "The sheer complexity of modern distributed computing architectures",
        "Navigating convoluted billing and resource management limits",
        "Continuous certification treadmills"
      ]
    },
    "who_may_thrive": [
      "Systems thinkers who love designing complex architectures",
      "People who remain calm when systems fail",
      "Detail-oriented developers who care about security and performance"
    ],
    "who_may_struggle": [
      "Those who panic under the pressure of live production outages",
      "People who prefer front-end visual design over backend logic",
      "Individuals who hate being on-call outside of work hours"
    ],
    "struggles": {
      "Mental Fatigue": 4,
      "Continuous Learning": 5,
      "Decision Pressure": 4,
      "Complexity": 5,
      "Concentration Demand": 4,
      "Long Hours": 3,
      "Irregular Schedule": 4,
      "Work-Life Disruption": 4,
      "Physical Strain": 2,
      "Screen Fatigue": 4,
      "Isolation": 3,
      "Public Interaction": 1,
      "Income Instability": 1,
      "Emotional Stress": 4,
      "Uncertainty": 3
    }
  },
  {
    "id": "web-developer",
    "name": "Web Developer",
    "category": "Technology",
    "description": "Web Developers build the user interfaces and logic for websites and web applications. While offering incredible creative freedom and remote flexibility, the frontend ecosystem is notoriously fragmented and evolves at a breakneck pace.",
    "upside_summary": [
      "High creative satisfaction seeing your code visually come to life",
      "Extremely flexible remote work opportunities",
      "Low barrier to entry with a massive global community"
    ],
    "hidden_cost": {
      "description": "The 'JavaScript fatigue' is real—frameworks change constantly, and the expectation to be a 'full-stack unicorn' can stretch your cognitive limits.",
      "struggles": [
        "Constantly rewriting code for the new 'framework of the month'",
        "Cross-browser compatibility and responsive design headaches",
        "Scope creep and pixel-pushing demands from clients",
        "Sedentary lifestyle and screen fatigue"
      ]
    },
    "who_may_thrive": [
      "Creative problem solvers who love immediate visual feedback",
      "People who enjoy staying trendy with the latest tech libraries",
      "Self-taught individuals with strong portfolio building skills"
    ],
    "who_may_struggle": [
      "Those who prefer deep backend algorithmic work",
      "People who get frustrated by CSS quirks and browser inconsistencies",
      "Individuals who want to learn one tool and stick with it for a decade"
    ],
    "struggles": {
      "Mental Fatigue": 3,
      "Continuous Learning": 5,
      "Decision Pressure": 2,
      "Complexity": 4,
      "Concentration Demand": 4,
      "Long Hours": 3,
      "Irregular Schedule": 3,
      "Work-Life Disruption": 2,
      "Physical Strain": 2,
      "Screen Fatigue": 5,
      "Isolation": 4,
      "Public Interaction": 2,
      "Income Instability": 3,
      "Emotional Stress": 2,
      "Uncertainty": 3
    }
  },
  {
    "id": "game-developer",
    "name": "Game Developer",
    "category": "Technology & Gaming",
    "description": "Game Developers combine art, math, and code to create interactive entertainment. It is a highly passion-driven industry that unfortunately leverages that passion into extreme working hours, instability, and intense technical complexity.",
    "upside_summary": [
      "Creating immersive worlds and bringing joy to millions",
      "Working alongside highly passionate, creative teams",
      "Solving unique, cutting-edge rendering and physics problems"
    ],
    "hidden_cost": {
      "description": "The industry is notorious for 'crunch culture'—mandated 80+ hour weeks leading up to launch—coupled with frequent layoffs the moment a game ships.",
      "struggles": [
        "Severe 'crunch time' destroying work-life balance",
        "High job instability and studio closures after release",
        "Lower pay compared to traditional enterprise software roles",
        "Toxic gamer culture and harsh public reviews"
      ]
    },
    "who_may_thrive": [
      "Deeply passionate gamers who view code as an art form",
      "People who thrive in highly collaborative, chaotic environments",
      "Those willing to sacrifice stability for creative fulfillment"
    ],
    "who_may_struggle": [
      "Developers seeking standard 9-to-5 hours and high stability",
      "Those who want enterprise-level software salaries",
      "People prone to burnout under prolonged intense deadlines"
    ],
    "struggles": {
      "Mental Fatigue": 5,
      "Continuous Learning": 4,
      "Decision Pressure": 3,
      "Complexity": 5,
      "Concentration Demand": 5,
      "Long Hours": 5,
      "Irregular Schedule": 5,
      "Work-Life Disruption": 5,
      "Physical Strain": 3,
      "Screen Fatigue": 5,
      "Isolation": 3,
      "Public Interaction": 3,
      "Income Instability": 4,
      "Emotional Stress": 4,
      "Uncertainty": 5
    }
  }`
);

fs.writeFileSync('src/data/careers.ts', updatedData, 'utf8');
console.log("Updated careers successfully!");
