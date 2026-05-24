import React, { useState } from "react";
import { EMOTIONS_META } from "../utils/emotionMeta";
import { EmotionIcon } from "./EmotionIcon";
import { EmotionLabel } from "../types";
import { Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Faint background tint per emotion on hover
const HOVER_BG: Record<EmotionLabel, string> = {
  sadness:     "rgba(59,130,246,0.08)",
  remorse:     "rgba(139,92,246,0.08)",
  disapproval: "rgba(99,102,241,0.08)",
  fear:        "rgba(245,158,11,0.08)",
  anger:       "rgba(239,68,68,0.08)",
  disgust:     "rgba(34,197,94,0.08)",
  joy:         "rgba(234,179,8,0.08)",
  surprise:    "rgba(236,72,153,0.08)",
};

type FloatPos = { top: string; left?: string; right?: string; size: string; delay: number; dur: number };

const FLOAT_POSITIONS: FloatPos[] = [
  { top: "4%",  left:  "2%",  size: "w-32 h-32", delay: 0,   dur: 7   },
  { top: "8%",  right: "3%",  size: "w-24 h-24", delay: 0.5, dur: 8   },
  { top: "38%", left:  "1%",  size: "w-28 h-28", delay: 1,   dur: 9   },
  { top: "48%", right: "2%",  size: "w-36 h-36", delay: 0.3, dur: 7.5 },
  { top: "73%", left:  "3%",  size: "w-24 h-24", delay: 1.5, dur: 8   },
  { top: "79%", right: "4%",  size: "w-28 h-28", delay: 0.8, dur: 9.5 },
];

export const GuideView: React.FC = () => {
  const [hoveredEmotion, setHoveredEmotion] = useState<EmotionLabel | null>(null);
  const emotionKeys = Object.keys(EMOTIONS_META) as EmotionLabel[];

  return (
    <div className="py-8 md:py-12 relative" id="guide-view-container">

      {/* Full-bleed background layer */}
      <div
        className="pointer-events-none absolute z-0 overflow-hidden"
        style={{ top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100vw" }}
      >
        {/* Animated background tint on hover */}
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundColor: hoveredEmotion ? HOVER_BG[hoveredEmotion] : "rgba(0,0,0,0)" }}
          transition={{ duration: 0.45 }}
        />

        {/* Floating emotion icons tied to hovered card */}
        <AnimatePresence>
          {hoveredEmotion && (
            <motion.div
              key={hoveredEmotion}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {FLOAT_POSITIONS.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute opacity-[0.18]"
                  style={{
                    top: pos.top,
                    ...(pos.left  ? { left:  pos.left  } : {}),
                    ...(pos.right ? { right: pos.right } : {}),
                  } as React.CSSProperties}
                  animate={{ y: [-14, 14, -14], rotate: [-5, 5, -5] }}
                  transition={{ duration: pos.dur, delay: pos.delay, repeat: Infinity, ease: "easeInOut" }}
                >
                  <EmotionIcon emotion={hoveredEmotion} className={pos.size} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main content */}
      <div className="relative z-10">

        {/* Introduction Banner */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <h2 className="font-sans text-5xl font-extrabold tracking-tight text-gray-900">
            Meet Your Emotions
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-sans text-base text-gray-500">
            We identify eight distinct emotional signals using custom language patterns. Negative and self-reflective labels help spot sub-clinical distress trends, while positive contrast tags differentiate balanced mind states.
          </p>
        </div>

        {/* Grid of Sticker Cards */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {emotionKeys.map((key) => {
              const meta = EMOTIONS_META[key];
              return (
                <div
                  key={key}
                  id={`guide-card-${key}`}
                  className={`relative flex flex-col justify-between overflow-hidden rounded-[2.2rem] border ${meta.borderColor} ${meta.bgColor} p-6 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md cursor-default`}
                  onMouseEnter={() => setHoveredEmotion(key)}
                  onMouseLeave={() => setHoveredEmotion(null)}
                >
                  {/* Visual Category Stripe */}
                  <div className={`absolute top-0 left-0 right-0 h-2 ${meta.bannerColor}`} />

                  <div>
                    {/* Big cute character header */}
                    <div className="flex justify-center py-4">
                      <EmotionIcon emotion={key} className="w-24 h-24 hover:scale-110 duration-200 transition-transform" />
                    </div>

                    {/* Text labels */}
                    <div className="text-center">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.badgeColor} border`}>
                        {meta.name}
                      </span>
                      <h3 className="mt-2 font-sans text-lg font-bold text-gray-900">
                        {meta.name}
                      </h3>
                      <p className="mt-1 font-sans text-xs font-medium text-gray-500">
                        {meta.description}
                      </p>
                    </div>

                    {/* Meanings */}
                    <div className="mt-4 border-t border-gray-100 pt-3">
                      <p className="font-sans text-xs text-gray-600 leading-relaxed">
                        <span className="font-bold text-gray-800">Interpretation:</span> {meta.meaning}
                      </p>
                    </div>
                  </div>

                  {/* Example box resembling note card */}
                  <div className="mt-4 rounded-2xl bg-white/70 p-3 shadow-inner border border-white/40">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Example Thought:
                    </span>
                    <p className="font-sans text-xs italic text-gray-600 mt-1">
                      &ldquo;{meta.example}&rdquo;
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 rounded-xl bg-gray-50 p-4 border border-gray-100 flex items-start space-x-3">
            <Info className="h-5 w-5 text-violet-500 shrink-0 mt-0.5" />
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              <span className="font-bold text-gray-700">Research Framing Note:</span> These emotional divisions originate from the GoEmotions taxonomy. Our prototype maps negative signals like <span className="text-blue-600 font-semibold">Sadness</span>, <span className="text-violet-600 font-semibold">Remorse</span>, and <span className="text-indigo-600 font-semibold">Disapproval</span> because clinical papers suggest self-referential writing containing high levels of sadness combined with intense self-blame or disapproval are highly correlated with low mood syndromes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
