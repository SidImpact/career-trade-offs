"use client";

import { useState } from "react";
import Image from "next/image";

interface CareerImageProps {
  careerId: string;
  careerName: string;
  className?: string;
  fill?: boolean;
}

export default function CareerImage({ careerId, careerName, className = "", fill = false }: CareerImageProps) {
  const [imgError, setImgError] = useState(false);

  const getGradient = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color1 = `hsl(${Math.abs(hash) % 360}, 75%, 65%)`;
    const color2 = `hsl(${(Math.abs(hash) + 60) % 360}, 85%, 45%)`;
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(w => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  if (imgError) {
    return (
      <div 
        className={`w-full h-full flex flex-col items-center justify-center text-white ${className}`}
        style={{ background: getGradient(careerName) }}
      >
        <span className="text-4xl md:text-5xl font-black tracking-widest opacity-90 drop-shadow-sm">
          {getInitials(careerName)}
        </span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image 
        src={`/images/career_${careerId}.jpg`}
        alt={careerName}
        fill
        className={`max-md:object-contain md:object-cover mix-blend-multiply ${className}`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <img 
      src={`/images/career_${careerId}.jpg`}
      alt={careerName}
      className={`w-full h-full max-md:object-contain md:object-cover mix-blend-multiply ${className}`}
      onError={() => setImgError(true)}
    />
  );
}
