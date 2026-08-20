import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function LooplyLogo({ className = '', size = 'md' }: LogoProps) {
  const sizeMap = {
    sm: 'h-10',
    md: 'h-16',
    lg: 'h-24',
    xl: 'h-32',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 420 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeMap[size]} w-auto drop-shadow-sm`}
      >
        {/* Confetti Sparks Left */}
        <path d="M 25 75 L 42 68" stroke="#06B6D4" strokeWidth="7" strokeLinecap="round" />
        <path d="M 20 95 L 38 95" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" />
        <path d="M 26 115 L 40 125" stroke="#EC4899" strokeWidth="7" strokeLinecap="round" />

        {/* Confetti Sparks Right */}
        <path d="M 380 90 L 398 82" stroke="#8B5CF6" strokeWidth="7" strokeLinecap="round" />
        <path d="M 375 110 L 392 118" stroke="#06B6D4" strokeWidth="7" strokeLinecap="round" />

        {/* 'l' - Purple */}
        <path
          d="M 60 55 C 60 42, 78 42, 78 55 L 78 112 C 78 128, 98 132, 110 124 C 118 118, 115 106, 105 106 L 82 106 L 82 55 Z"
          fill="#7C3AED"
        />

        {/* 'o' (first - Pink with eyes) */}
        <circle cx="145" cy="98" r="32" fill="#FF4D8D" />
        <circle cx="145" cy="98" r="14" fill="#FFFFFF" />
        {/* Eye 1 left */}
        <circle cx="137" cy="98" r="6" fill="#1E1B4B" />
        <circle cx="135" cy="96" r="2" fill="#FFFFFF" />
        {/* Eye 2 right */}
        <circle cx="153" cy="98" r="6" fill="#1E1B4B" />
        <circle cx="151" cy="96" r="2" fill="#FFFFFF" />
        {/* Eyebrow */}
        <path d="M 130 64 C 138 56, 152 56, 160 64" stroke="#F97316" strokeWidth="6" strokeLinecap="round" fill="none" />

        {/* 'o' (second - Teal with eyes) */}
        <circle cx="210" cy="98" r="32" fill="#00C4CC" />
        <circle cx="210" cy="98" r="14" fill="#FFFFFF" />
        {/* Eye 1 left */}
        <circle cx="202" cy="98" r="6" fill="#1E1B4B" />
        <circle cx="200" cy="96" r="2" fill="#FFFFFF" />
        {/* Eye 2 right */}
        <circle cx="218" cy="98" r="6" fill="#1E1B4B" />
        <circle cx="216" cy="96" r="2" fill="#FFFFFF" />
        {/* Eyebrow */}
        <path d="M 195 64 C 203 56, 217 56, 225 64" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" fill="none" />

        {/* 'p' - Orange */}
        <path
          d="M 252 62 C 240 62, 240 76, 240 85 L 240 140 C 240 152, 256 152, 256 140 L 256 122 C 262 128, 272 130, 282 124 C 298 114, 298 82, 282 72 C 272 64, 262 64, 252 62 Z"
          fill="#FF7A00"
        />
        {/* Play Icon inside 'p' loop */}
        <path d="M 264 90 L 276 98 L 264 106 Z" fill="#FFFFFF" />

        {/* 'l' - Cyan */}
        <path
          d="M 305 52 C 295 52, 295 64, 295 72 L 295 130 C 295 142, 310 142, 310 130 L 310 72 C 310 64, 305 52, 305 52 Z"
          fill="#00C4CC"
        />

        {/* 'y' - Yellow */}
        <path
          d="M 326 68 C 320 68, 318 78, 326 84 L 340 102 L 340 135 C 340 155, 325 158, 312 152 C 304 148, 300 158, 308 165 C 328 174, 355 165, 355 135 L 355 84 C 360 78, 356 68, 348 68 C 342 68, 338 72, 335 78 L 326 68 Z"
          fill="#FFB800"
        />

        {/* Big Yellow Smile Arc under logo */}
        <path
          d="M 120 108 C 140 150, 310 165, 360 110"
          stroke="#FFB800"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
