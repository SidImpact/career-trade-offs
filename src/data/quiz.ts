import { StruggleCategory } from "./types";

export type QuestionType = "ab" | "scale";

export interface AnswerOption {
  text: string;
  impact: Partial<Record<StruggleCategory, number>>;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  options: AnswerOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    type: "ab",
    title: "Which would you rather deal with?",
    options: [
      {
        text: "A predictable job with slower growth",
        impact: {
          "Income Instability": 1,
          "Uncertainty": 1,
          "Repetitive Work": 4
        }
      },
      {
        text: "A high-growth career with more uncertainty",
        impact: {
          "Income Instability": 4,
          "Uncertainty": 5,
          "Repetitive Work": 1
        }
      }
    ]
  },
  {
    id: "q2",
    type: "ab",
    title: "Which sounds less painful?",
    options: [
      {
        text: "Working alone for long periods",
        impact: {
          "Isolation": 5,
          "Public Interaction": 1
        }
      },
      {
        text: "Constantly interacting with people",
        impact: {
          "Isolation": 1,
          "Public Interaction": 5,
          "Social Interaction": 5
        }
      }
    ]
  },
  {
    id: "q3",
    type: "ab",
    title: "Which would you tolerate better?",
    options: [
      {
        text: "Long years of education before reaching your goal",
        impact: {
          "Long Training": 5,
          "Continuous Learning": 4
        }
      },
      {
        text: "Entering the workforce sooner with fewer credentials",
        impact: {
          "Long Training": 1
        }
      }
    ]
  },
  {
    id: "q_runway",
    type: "scale",
    title: "How long can you afford to study or build your skills with ZERO income?",
    description: "Some careers require years of unpaid education or a long ramp-up before you see your first paycheck.",
    options: [
      { text: "I need money immediately (<1 month)", impact: { "Time Until Financial Reward": 1, "Career Entry Cost": 1, "Long Training": 1 } },
      { text: "I can survive for 1–3 months", impact: { "Time Until Financial Reward": 2, "Career Entry Cost": 2, "Long Training": 2 } },
      { text: "I have savings for 6–12 months", impact: { "Time Until Financial Reward": 3, "Career Entry Cost": 3, "Long Training": 3 } },
      { text: "I can afford 1–3 years of studying", impact: { "Time Until Financial Reward": 4, "Career Entry Cost": 4, "Long Training": 4 } },
      { text: "I can invest 5+ years (e.g. med school)", impact: { "Time Until Financial Reward": 5, "Career Entry Cost": 5, "Long Training": 5 } }
    ]
  },
  {
    id: "q4",
    type: "scale",
    title: "How do you feel about continuous learning?",
    options: [
      { text: "I strongly dislike it", impact: { "Continuous Learning": 1, "Continuous Upskilling": 1 } },
      { text: "I dislike it", impact: { "Continuous Learning": 2, "Continuous Upskilling": 2 } },
      { text: "Neutral", impact: { "Continuous Learning": 3, "Continuous Upskilling": 3 } },
      { text: "I enjoy it", impact: { "Continuous Learning": 4, "Continuous Upskilling": 4 } },
      { text: "I love it", impact: { "Continuous Learning": 5, "Continuous Upskilling": 5 } }
    ]
  },
  {
    id: "q5",
    type: "scale",
    title: "How much competition can you tolerate?",
    options: [
      { text: "Very Low", impact: { "Competition": 1 } },
      { text: "Low", impact: { "Competition": 2 } },
      { text: "Moderate", impact: { "Competition": 3 } },
      { text: "High", impact: { "Competition": 4 } },
      { text: "Very High", impact: { "Competition": 5 } }
    ]
  },
  {
    id: "q6",
    type: "scale",
    title: "How comfortable are you with financial instability?",
    options: [
      { text: "Very uncomfortable", impact: { "Income Instability": 1, "Job Security": 1 } },
      { text: "Slightly uncomfortable", impact: { "Income Instability": 2, "Job Security": 2 } },
      { text: "Neutral", impact: { "Income Instability": 3, "Job Security": 3 } },
      { text: "Comfortable", impact: { "Income Instability": 4, "Job Security": 4 } },
      { text: "Very comfortable", impact: { "Income Instability": 5, "Job Security": 5 } }
    ]
  },
  {
    id: "q7",
    type: "scale",
    title: "How much screen time can you tolerate?",
    options: [
      { text: "Very little", impact: { "Screen Fatigue": 1 } },
      { text: "A few hours", impact: { "Screen Fatigue": 2 } },
      { text: "Moderate amount", impact: { "Screen Fatigue": 3 } },
      { text: "Most of the day", impact: { "Screen Fatigue": 4 } },
      { text: "All day, every day", impact: { "Screen Fatigue": 5 } }
    ]
  },
  {
    id: "q8",
    type: "scale",
    title: "How comfortable are you with physical strain or physical work?",
    options: [
      { text: "Very uncomfortable", impact: { "Physical Strain": 1 } },
      { text: "Slightly uncomfortable", impact: { "Physical Strain": 2 } },
      { text: "Neutral", impact: { "Physical Strain": 3 } },
      { text: "Comfortable", impact: { "Physical Strain": 4 } },
      { text: "Very comfortable", impact: { "Physical Strain": 5 } }
    ]
  },
  {
    id: "q9",
    type: "scale",
    title: "How much emotional pressure and responsibility can you carry?",
    options: [
      { text: "Very little", impact: { "Emotional Stress": 1, "Responsibility": 1, "Decision Pressure": 1 } },
      { text: "A moderate amount", impact: { "Emotional Stress": 2, "Responsibility": 2, "Decision Pressure": 2 } },
      { text: "Average", impact: { "Emotional Stress": 3, "Responsibility": 3, "Decision Pressure": 3 } },
      { text: "A lot", impact: { "Emotional Stress": 4, "Responsibility": 4, "Decision Pressure": 4 } },
      { text: "I thrive under heavy responsibility", impact: { "Emotional Stress": 5, "Responsibility": 5, "Decision Pressure": 5 } }
    ]
  },
  {
    id: "q10",
    type: "scale",
    title: "How well do you tolerate irregular working hours?",
    options: [
      { text: "I need a strict 9-to-5", impact: { "Irregular Schedule": 1, "Long Hours": 1, "Work-Life Disruption": 1 } },
      { text: "Mostly regular, occasional overtime", impact: { "Irregular Schedule": 2, "Long Hours": 2, "Work-Life Disruption": 2 } },
      { text: "Flexible", impact: { "Irregular Schedule": 3, "Long Hours": 3, "Work-Life Disruption": 3 } },
      { text: "I don't mind strange hours", impact: { "Irregular Schedule": 4, "Long Hours": 4, "Work-Life Disruption": 4 } },
      { text: "I prefer working whenever, even nights/weekends", impact: { "Irregular Schedule": 5, "Long Hours": 5, "Work-Life Disruption": 5 } }
    ]
  }
];
