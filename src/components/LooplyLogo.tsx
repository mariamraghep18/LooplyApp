import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function LooplyLogo({ className = '', size = 'md' }: LogoProps) {
  const sizeMap = {
    sm: 'h-12',
    md: 'h-20',
    lg: 'h-28',
    xl: 'h-36',
  };

  return (
    <div className={`flex items-center justify-center pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeMap[size]} w-auto drop-shadow-md`}
      >
        <defs>
          {/* White shadow outline filter matching the reference image styling */}
          <filter id="white-outline" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="3" dy="5" stdDeviation="0" floodColor="#E2E8F0" floodOpacity="1" />
          </filter>
        </defs>

        {/* 1. LEFT CONFETTI ACCENTS */}
        {/* Cyan Spark Diamond Left */}
        <path d="M 22 82 Q 28 82 28 76 Q 28 82 34 82 Q 28 82 28 88 Q 28 82 22 82 Z" fill="#16BAB0" />
        {/* Yellow Dot Left */}
        <circle cx="24" cy="108" r="6" fill="#FFC107" />
        {/* Pink Tilted Pill Left */}
        <rect x="22" y="128" width="16" height="7" rx="3.5" transform="rotate(-25 22 128)" fill="#FF4B72" />

        {/* 2. RIGHT CONFETTI ACCENTS */}
        {/* Pink Spark Diamond Right */}
        <path d="M 506 102 Q 512 102 512 96 Q 512 102 518 102 Q 512 102 512 108 Q 512 102 506 102 Z" fill="#FF4B72" />
        {/* Cyan Dot Right */}
        <circle cx="510" cy="128" r="5" fill="#16BAB0" />
        {/* Purple Tilted Pill Right */}
        <rect x="498" y="148" width="16" height="7" rx="3.5" transform="rotate(30 498 148)" fill="#8B44B7" />

        {/* MAIN LOGO GROUP WITH SHADOW/OUTLINE */}
        <g filter="url(#white-outline)">
          
          {/* LETTER 1: 'l' (Vibrant Purple Pill) */}
          <rect x="52" y="32" width="38" height="138" rx="19" fill="#8B44B7" />

          {/* LETTER 2: 'o' (Coral-Pink Circle Eye) */}
          <g>
            {/* Outer Pink Ring */}
            <circle cx="140" cy="112" r="42" fill="#FF4B72" />
            {/* White Eye Center */}
            <circle cx="140" cy="112" r="23" fill="#FFFFFF" />
            {/* Dark Navy Pupil */}
            <circle cx="140" cy="114" r="14" fill="#2A1845" />
            {/* Specular White Highlights inside Pupil */}
            <circle cx="136" cy="110" r="5" fill="#FFFFFF" />
            <circle cx="144" cy="118" r="2.5" fill="#FFFFFF" />
            {/* Orange Eyebrow above 'o' */}
            <path
              d="M 120 62 C 128 48, 150 48, 158 62"
              stroke="#FF7425"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* LETTER 3: 'o' (Turquoise-Teal Circle Eye) */}
          <g>
            {/* Outer Teal Ring */}
            <circle cx="228" cy="112" r="42" fill="#16BAB0" />
            {/* White Eye Center */}
            <circle cx="228" cy="112" r="23" fill="#FFFFFF" />
            {/* Dark Navy Pupil */}
            <circle cx="228" cy="114" r="14" fill="#2A1845" />
            {/* Specular White Highlights inside Pupil */}
            <circle cx="224" cy="110" r="5" fill="#FFFFFF" />
            <circle cx="232" cy="118" r="2.5" fill="#FFFFFF" />
            {/* Purple Eyebrow above 'o' */}
            <path
              d="M 210 62 C 218 48, 240 48, 248 62"
              stroke="#8B44B7"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* LETTER 4: 'p' (Bright Orange with White Play Icon) */}
          <g>
            {/* Stem of 'p' */}
            <rect x="278" y="70" width="34" height="100" rx="17" fill="#FF7425" />
            {/* Circular Head of 'p' */}
            <path
              d="M 292 70 H 332 C 354 70 368 84 368 106 C 368 128 354 142 332 142 H 292 V 70 Z"
              fill="#FF7425"
            />
            {/* White Play Icon Triangle inside 'p' */}
            <path
              d="M 314 94 L 336 106 L 314 118 Z"
              fill="#FFFFFF"
            />
          </g>

          {/* LETTER 5: 'l' (Cyan-Teal Pill) */}
          <rect x="378" y="42" width="34" height="128" rx="17" fill="#16BAB0" />

          {/* LETTER 6: 'y' (Golden Yellow Rounded 'y') */}
          <g>
            {/* Left Branch */}
            <rect x="418" y="70" width="32" height="65" rx="16" fill="#FFC107" />
            {/* Right Branch extending down into bottom hook */}
            <path
              d="M 452 70 H 482 V 140 C 482 160 466 172 444 172 H 426 C 418 172 414 164 420 158 C 426 152 434 154 444 154 C 452 154 456 148 456 138 V 70 Z"
              fill="#FFC107"
            />
          </g>

          {/* 3. BIG GOLDEN YELLOW SMILE ARC BELOW LOGO WITH RIGHT CHEEK DIMPLE */}
          <path
            d="M 112 168 C 150 208, 210 216, 252 178"
            stroke="#FFC107"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          {/* Dimple stroke on right corner of smile */}
          <path
            d="M 244 166 C 252 172, 254 184, 250 190"
            stroke="#FFC107"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

        </g>
      </svg>
    </div>
  );
}
