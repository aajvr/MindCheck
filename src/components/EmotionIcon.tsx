import React from "react";
import { EmotionLabel } from "../types";

interface EmotionIconProps {
  emotion: EmotionLabel;
  className?: string;
}

export const EmotionIcon: React.FC<EmotionIconProps> = ({ emotion, className = "w-24 h-24" }) => {
  switch (emotion) {
    case "sadness":
      return (
        <svg
          className={`${className} filter drop-shadow-md`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rain Cloud above */}
          <path
            d="M32 20C32 17.5 34.5 15 38 15C40.5 15 42.5 16.5 43.5 18C44.5 16 47 14 50 14C54 14 57 17 57 20.5C57 21 57 21.5 56.8 22C59 22 61 23.5 61 26C61 28.5 59 30 56.5 30H35C32.5 30 31 28.5 31 26C31 24 32.5 22.5 34.5 22.2C33 21.8 32 21 32 20Z"
            fill="#93C5FD"
            opacity="0.8"
          />
          {/* Falling Raindrops */}
          <circle cx="38" cy="35" r="1.5" fill="#3B82F6" />
          <circle cx="56" cy="38" r="1.5" fill="#3B82F6" />
          <circle cx="44" cy="42" r="1.5" fill="#3B82F6" />

          {/* Cute Blue Droplet Blob */}
          <path
            d="M50 34C68 34 76 46 76 62C76 75 64 84 50 84C36 84 24 75 24 62C24 46 32 34 50 34Z"
            fill="url(#sadnessGrad)"
          />
          {/* Shimmer/Highlights */}
          <ellipse cx="44" cy="46" rx="8" ry="4" fill="white" opacity="0.3" transform="rotate(-15 44 46)" />

          {/* Sad Eyes */}
          <path d="M38 58C36 55 33 55 31 57" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M62 58C64 55 67 55 69 57" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="35" cy="62" r="3.5" fill="#1E3A8A" />
          <circle cx="65" cy="62" r="3.5" fill="#1E3A8A" />
          <circle cx="36" cy="61" r="1" fill="white" />
          <circle cx="66" cy="61" r="1" fill="white" />

          {/* Rosy Cheeks */}
          <circle cx="29" cy="66" r="3" fill="#60A5FA" opacity="0.6" />
          <circle cx="71" cy="66" r="3" fill="#60A5FA" opacity="0.6" />

          {/* Frowning Mouth */}
          <path d="M46 72C48 70 52 70 54 72" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />

          {/* Cute Droplet tear */}
          <path
            d="M31 66C31 68.2 29.5 70 28 70C26.5 70 25 68.2 25 66C25 64.5 28 62 28 62C28 62 31 64.5 31 66Z"
            fill="#3B82F6"
          />

          <defs>
            <linearGradient id="sadnessGrad" x1="50" y1="34" x2="50" y2="84" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "remorse":
      return (
        <svg
          className={`${className} filter drop-shadow-md`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Star Sparkles of self-reflection */}
          <path d="M22 26L24 30L22 34L20 30L22 26Z" fill="#C084FC" opacity="0.7" />
          <path d="M78 28L80 32L78 36L76 32L78 28Z" fill="#C084FC" opacity="0.7" />

          {/* Purple teardrop/drooping blob */}
          <path
            d="M50 34C66 34 74 46 74 61C74 74 63 83 50 83C37 83 26 74 26 61C26 46 34 34 50 34Z"
            fill="url(#remorseGrad)"
          />
          {/* Highlight */}
          <ellipse cx="44" cy="44" rx="7" ry="3.5" fill="white" opacity="0.25" transform="rotate(-15 44 44)" />

          {/* Regretful/remorseful eyebrows and eyes */}
          <path d="M34 52C37 54 40 53 42 50" stroke="#4C1D95" strokeWidth="2" strokeLinecap="round" />
          <path d="M66 52C63 54 60 53 58 50" stroke="#4C1D95" strokeWidth="2" strokeLinecap="round" />
          {/* Closed downcast eyes (gentle curves) */}
          <path d="M33 59C35 61 39 61 41 59" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M59 59C61 61 65 61 67 59" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" />

          {/* Shy Blushing Cheeks */}
          <circle cx="31" cy="65" r="4.5" fill="#C084FC" opacity="0.6" />
          <circle cx="69" cy="65" r="4.5" fill="#C084FC" opacity="0.6" />

          {/* Sad tiny mouth */}
          <path d="M47 67C49 66 51 66 53 67" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" />

          {/* Joined praying/apologetic hands in front */}
          <path
            d="M44 76C44 74 46 72 48 72H52C54 72 56 74 56 76V80C56 81.5 54 82 50 82C46 82 44 81.5 44 80V76Z"
            fill="#E9D5FF"
          />
          <path d="M50 72V81" stroke="#4C1D95" strokeWidth="1.5" />

          <defs>
            <linearGradient id="remorseGrad" x1="50" y1="34" x2="50" y2="83" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "disapproval":
      return (
        <svg
          className={`${className} filter drop-shadow-md`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sparks of annoyance */}
          <path d="M18 42C21 40 23 41 24 43" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
          <path d="M82 42C79 40 77 41 76 43" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />

          {/* Square-rounded body */}
          <rect x="25" y="34" width="50" height="48" rx="14" fill="url(#disapprovalGrad)" />

          {/* Dissatisfied knitted eyebrows */}
          <path d="M32 50L41 53" stroke="#2E1065" strokeWidth="3" strokeLinecap="round" />
          <path d="M68 50L59 53" stroke="#2E1065" strokeWidth="3" strokeLinecap="round" />

          {/* Stern grumpy eyes */}
          <path d="M31 58C34 56 38 56 41 58" stroke="#2E1065" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M59 58C62 56 66 56 69 58" stroke="#2E1065" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="36" cy="61" r="3.5" fill="#2E1065" />
          <circle cx="64" cy="61" r="3.5" fill="#2E1065" />

          {/* Grumpy scowl mouth */}
          <path d="M44 71H56" stroke="#2E1065" strokeWidth="3" strokeLinecap="round" />

          {/* Crossed/Joined grumpy arms */}
          <path
            d="M26 68C32 72 40 73 50 73C60 73 68 72 74 68"
            stroke="#2E1065"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path d="M36 67C34 71 34 74 38 75" stroke="#2E1065" strokeWidth="2" strokeLinecap="round" />
          <path d="M64 67C66 71 66 74 62 75" stroke="#2E1065" strokeWidth="2" strokeLinecap="round" />

          <defs>
            <linearGradient id="disapprovalGrad" x1="50" y1="34" x2="50" y2="82" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DDD6FE" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "fear":
      return (
        <svg
          className={`${className} filter drop-shadow-md`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shivering sweat sparkles */}
          <path d="M22 34M22 34C21 34 19 32 19 30C19 28 22 26 22 26C22 26 25 28 25 30C25 32 23 34 22 34Z" fill="#3B82F6" />
          <path d="M78 34M78 34C77 34 75 32 75 30C75 28 78 26 78 26C78 26 81 28 81 30C81 32 79 34 78 34Z" fill="#3B82F6" />

          {/* Amber Tear-shaped/Wobbly blob */}
          <path
            d="M50 34C66 34 73 45 73 60C73 73 62 82 50 82C38 82 27 73 27 60C27 45 34 34 50 34Z"
            fill="url(#fearGrad)"
          />

          {/* Nervous high eyebrows */}
          <path d="M33 50C36 48 40 49 42 52" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <path d="M67 50C64 48 60 49 58 52" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

          {/* Wide tense eyes with tiny pupils */}
          <circle cx="36" cy="58" r="5" fill="white" stroke="#78350F" strokeWidth="2" />
          <circle cx="64" cy="58" r="5" fill="white" stroke="#78350F" strokeWidth="2" />
          <circle cx="36" cy="58" r="1.5" fill="#78350F" />
          <circle cx="64" cy="58" r="1.5" fill="#78350F" />

          {/* Worried shivering mouth */}
          <path
            d="M42 68C44 66 46 69 48 67C50 65 52 68 54 66C56 64 58 67 60 66"
            stroke="#78350F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Shaking hands over cheeks */}
          <path
            d="M23 68C24 62 28 62 29 65V68"
            stroke="#78350F"
            strokeWidth="2"
            strokeLinecap="round"
            fill="#FEF3C7"
          />
          <path
            d="M77 68C76 62 72 62 71 65V68"
            stroke="#78350F"
            strokeWidth="2"
            strokeLinecap="round"
            fill="#FEF3C7"
          />

          <defs>
            <linearGradient id="fearGrad" x1="50" y1="34" x2="50" y2="82" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "anger":
      return (
        <svg
          className={`${className} filter drop-shadow-md`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Steam puffs */}
          <path
            d="M20 28C18 28 17 26 18 25C19 24 21 24 22 25"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M80 28C82 28 83 26 82 25C81 24 79 24 78 25"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Round Red Angry Blob */}
          <circle cx="50" cy="58" r="24" fill="url(#angerGrad)" />

          {/* Angry V-shaped eyebrows */}
          <path d="M35 44L47 49" stroke="#7F1D1D" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M65 44L53 49" stroke="#7F1D1D" strokeWidth="3.5" strokeLinecap="round" />

          {/* Furious eyes */}
          <circle cx="39" cy="54" r="3.5" fill="#7F1D1D" />
          <circle cx="61" cy="54" r="3.5" fill="#7F1D1D" />

          {/* Grumpy scowling angled mouth */}
          <path d="M43 68C43 65 57 65 57 68" stroke="#7F1D1D" strokeWidth="3" strokeLinecap="round" />

          {/* Red cheeks blushing in fury */}
          <circle cx="33" cy="61" r="3" fill="#EF4444" opacity="0.6" />
          <circle cx="67" cy="61" r="3" fill="#EF4444" opacity="0.6" />

          <defs>
            <linearGradient id="angerGrad" x1="50" y1="34" x2="50" y2="82" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "disgust":
      return (
        <svg
          className={`${className} filter drop-shadow-md`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Green puddle blob */}
          <path
            d="M50 36C65 36 72 45 72 59C72 71 63 80 50 80C34 80 28 71 28 59C28 45 35 36 50 36Z"
            fill="url(#disgustGrad)"
          />

          {/* Squinting judgmental eyes */}
          <path d="M34 52L42 54" stroke="#14532D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M66 52L58 54" stroke="#14532D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M33 58C36 57 39 57 41 59" stroke="#14532D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M67 58C64 57 61 57 59 59" stroke="#14532D" strokeWidth="2.5" strokeLinecap="round" />

          {/* Frowning asymmetrical mouth sticking out tongue */}
          <path d="M43 65C45 64 53 64 54 65" stroke="#14532D" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sticking out pink tongue */}
          <path d="M46 67C46 72 52 72 52 67Z" fill="#F43F5E" stroke="#14532D" strokeWidth="1.5" />

          {/* Sickly pale cheeks */}
          <circle cx="32" cy="63" r="3.5" fill="#84CC16" opacity="0.6" />
          <circle cx="68" cy="63" r="3.5" fill="#84CC16" opacity="0.6" />

          <defs>
            <linearGradient id="disgustGrad" x1="50" y1="36" x2="50" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A3E635" />
              <stop offset="100%" stopColor="#84CC16" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "joy":
      return (
        <svg
          className={`${className} filter drop-shadow-md`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gold sparkles */}
          <path d="M22 24L25 21L28 24L25 27L22 24Z" fill="#FBBF24" opacity="0.9" />
          <path d="M78 22L81 19L84 22L81 25L78 22Z" fill="#FBBF24" opacity="0.9" />

          {/* Happy Golden-Yellow teardrop blob */}
          <path
            d="M50 32C66 32 74 44 74 59C74 72 63 81 50 81C37 81 26 72 26 59C26 44 34 32 50 32Z"
            fill="url(#joyGrad)"
          />

          {/* Happy laughing squeezed shut eyes */}
          <path d="M33 53C35 49 39 49 41 53" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <path d="M59 53C61 49 65 49 67 53" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />

          {/* Radiant Rosy Cheeks */}
          <circle cx="31" cy="60" r="5" fill="#FB923C" opacity="0.6" />
          <circle cx="69" cy="60" r="5" fill="#FB923C" opacity="0.6" />

          {/* Big happy smiling mouth with open teeth / tongue */}
          <path
            d="M40 60C40 67 60 67 60 60Z"
            fill="#D97706"
            stroke="#78350F"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M43 61C46 63 54 63 57 61" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

          <defs>
            <linearGradient id="joyGrad" x1="50" y1="32" x2="50" y2="81" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "surprise":
      return (
        <svg
          className={`${className} filter drop-shadow-md`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sparkles of wonder */}
          <circle cx="21" cy="27" r="1.5" fill="#F472B6" />
          <path d="M78 24L80 20L82 24L80 28L78 24Z" fill="#F472B6" opacity="0.8" />

          {/* Rounded pink blob */}
          <path
            d="M50 35C65 35 72 44 72 58C72 70 63 79 50 79C37 79 28 70 28 58C28 44 35 35 50 35Z"
            fill="url(#surpriseGrad)"
          />

          {/* Wide shocked-raised eyebrows */}
          <path d="M32 47C35 44 39 44 41 47" stroke="#831843" strokeWidth="2" strokeLinecap="round" />
          <path d="M59 47C61 44 65 44 68 47" stroke="#831843" strokeWidth="2" strokeLinecap="round" />

          {/* Wide open eyes */}
          <circle cx="36" cy="54" r="5" fill="white" stroke="#831843" strokeWidth="2" />
          <circle cx="64" cy="54" r="5" fill="white" stroke="#831843" strokeWidth="2" />
          <circle cx="36" cy="54" r="2" fill="#831843" />
          <circle cx="64" cy="54" r="2" fill="#831843" />

          {/* Round shocked "O" mouth */}
          <circle cx="50" cy="65" r="4.5" fill="#9D174D" />

          {/* Soft surprised blush */}
          <circle cx="29" cy="60" r="3.5" fill="#FB7185" opacity="0.6" />
          <circle cx="71" cy="60" r="3.5" fill="#FB7185" opacity="0.6" />

          <defs>
            <linearGradient id="surpriseGrad" x1="50" y1="35" x2="50" y2="79" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F9A8D4" />
              <stop offset="100%" stopColor="#FB7185" />
            </linearGradient>
          </defs>
        </svg>
      );

    default:
      return null;
  }
};
