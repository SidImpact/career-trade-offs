"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { quizQuestions } from "@/data/quiz";
import { StruggleCategory } from "@/data/types";

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  
  // We'll store the accumulated impacts
  const [profile, setProfile] = useState<Partial<Record<StruggleCategory, number[]>>>({});

  const handleAnswer = (impact: Partial<Record<StruggleCategory, number>>) => {
    const newProfile = { ...profile };
    for (const [key, value] of Object.entries(impact)) {
      const category = key as StruggleCategory;
      if (!newProfile[category]) {
        newProfile[category] = [];
      }
      newProfile[category]!.push(value as number);
    }
    setProfile(newProfile);

    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate averages and save
      const finalProfile: Partial<Record<StruggleCategory, number>> = {};
      for (const [key, values] of Object.entries(newProfile)) {
        if (values && values.length > 0) {
          finalProfile[key as StruggleCategory] = Math.round(
            values.reduce((a, b) => a + b, 0) / values.length
          );
        }
      }
      localStorage.setItem("tradeOffProfile", JSON.stringify(finalProfile));
      router.push("/results");
    }
  };

  const question = quizQuestions[currentQuestionIdx];
  const progress = ((currentQuestionIdx + 1) / quizQuestions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-12 flex justify-center">
        <div className="relative w-full max-w-lg aspect-[16/9] rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
          <Image 
            src="/images/quiz.jpg"
            alt="Person at a crossroads deciding their path"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-8">
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div 
            className="bg-neutral-900 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-neutral-500 mt-2 text-right">
          Question {currentQuestionIdx + 1} of {quizQuestions.length}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 p-8 md:p-12 shadow-sm text-center">
        <h2 className={`text-3xl font-bold text-neutral-900 ${question.description ? "mb-4" : "mb-8"}`}>
          {question.title}
        </h2>
        {question.description && (
          <p className="text-neutral-500 mb-8 max-w-xl mx-auto">{question.description}</p>
        )}
        
        {question.type === "ab" ? (
          <div className="flex flex-col md:flex-row gap-4">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.impact)}
                className="flex-1 p-6 border-2 border-neutral-200 rounded-xl hover:border-neutral-900 hover:bg-neutral-50 transition-all font-medium text-lg text-neutral-800"
              >
                {opt.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.impact)}
                className="w-full p-4 border border-neutral-200 rounded-xl hover:border-neutral-900 hover:bg-neutral-50 transition-all text-left font-medium text-neutral-800"
              >
                {opt.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
