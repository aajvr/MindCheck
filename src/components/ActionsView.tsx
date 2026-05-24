import React, { useState } from "react";
import { EmotionLabel } from "../types";
import { EMOTIONS_META, GENTLE_STEPS } from "../utils/emotionMeta";
import { EmotionIcon } from "./EmotionIcon";
import { MessageSquare, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type FloatPos = { top: string; left?: string; right?: string; size: string; delay: number; dur: number };

const PAGE_BG: Record<EmotionLabel, string> = {
  sadness:     "rgba(59,130,246,0.14)",
  remorse:     "rgba(139,92,246,0.14)",
  disapproval: "rgba(99,102,241,0.14)",
  fear:        "rgba(245,158,11,0.14)",
  anger:       "rgba(239,68,68,0.14)",
  disgust:     "rgba(34,197,94,0.14)",
  joy:         "rgba(234,179,8,0.14)",
  surprise:    "rgba(236,72,153,0.14)",
};

const BG_FLOATS: FloatPos[] = [
  { top: "4%",  left:  "0",   size: "w-44 h-44", delay: 0,   dur: 7   },
  { top: "12%", right: "0",   size: "w-36 h-36", delay: 0.6, dur: 8   },
  { top: "42%", left:  "0",   size: "w-40 h-40", delay: 1,   dur: 9   },
  { top: "55%", right: "0",   size: "w-48 h-48", delay: 0.3, dur: 7.5 },
  { top: "78%", left:  "0",   size: "w-36 h-36", delay: 1.4, dur: 8.5 },
  { top: "82%", right: "0",   size: "w-40 h-40", delay: 0.8, dur: 9.5 },
];

const PANEL_FLOATS: FloatPos[] = [
  { top: "4%",  right: "4%",  size: "w-40 h-40", delay: 0,   dur: 7   },
  { top: "38%", left:  "1%",  size: "w-32 h-32", delay: 0.7, dur: 8.5 },
  { top: "60%", right: "6%",  size: "w-36 h-36", delay: 0.3, dur: 9   },
  { top: "82%", left:  "2%",  size: "w-28 h-28", delay: 1.1, dur: 7.5 },
];

const PANEL: Record<EmotionLabel, {
  panelBg: string;
  textMain: string;
  textSub: string;
  innerBg: string;
  innerBorder: string;
  numberBg: string;
  chipActive: string;
}> = {
  sadness:     { panelBg: "bg-blue-600",   textMain: "text-white",      textSub: "text-blue-100",    innerBg: "bg-white/15",   innerBorder: "border-white/25",  numberBg: "bg-white text-blue-600",    chipActive: "bg-blue-600 text-white border-blue-600"    },
  remorse:     { panelBg: "bg-violet-600", textMain: "text-white",      textSub: "text-violet-100",  innerBg: "bg-white/15",   innerBorder: "border-white/25",  numberBg: "bg-white text-violet-600",  chipActive: "bg-violet-600 text-white border-violet-600" },
  disapproval: { panelBg: "bg-indigo-600", textMain: "text-white",      textSub: "text-indigo-100",  innerBg: "bg-white/15",   innerBorder: "border-white/25",  numberBg: "bg-white text-indigo-600",  chipActive: "bg-indigo-600 text-white border-indigo-600" },
  fear:        { panelBg: "bg-amber-400",  textMain: "text-amber-950",  textSub: "text-amber-800",   innerBg: "bg-black/10",   innerBorder: "border-black/15",  numberBg: "bg-amber-900 text-white",   chipActive: "bg-amber-400 text-amber-950 border-amber-500" },
  anger:       { panelBg: "bg-red-600",    textMain: "text-white",      textSub: "text-red-100",     innerBg: "bg-white/15",   innerBorder: "border-white/25",  numberBg: "bg-white text-red-600",     chipActive: "bg-red-600 text-white border-red-600"      },
  disgust:     { panelBg: "bg-green-600",  textMain: "text-white",      textSub: "text-green-100",   innerBg: "bg-white/15",   innerBorder: "border-white/25",  numberBg: "bg-white text-green-600",   chipActive: "bg-green-600 text-white border-green-600"  },
  joy:         { panelBg: "bg-yellow-400", textMain: "text-yellow-950", textSub: "text-yellow-800",  innerBg: "bg-black/10",   innerBorder: "border-black/15",  numberBg: "bg-yellow-900 text-white",  chipActive: "bg-yellow-400 text-yellow-950 border-yellow-500" },
  surprise:    { panelBg: "bg-pink-500",   textMain: "text-white",      textSub: "text-pink-100",    innerBg: "bg-white/15",   innerBorder: "border-white/25",  numberBg: "bg-white text-pink-500",    chipActive: "bg-pink-500 text-white border-pink-500"    },
};

export const ActionsView: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionLabel>("sadness");
  const emotionKeys = Object.keys(EMOTIONS_META) as EmotionLabel[];

  const step   = GENTLE_STEPS[selectedEmotion];
  const meta   = EMOTIONS_META[selectedEmotion];
  const panel  = PANEL[selectedEmotion];

  return (
    <div className="py-8 md:py-12 relative" id="steps-view-container">

      {/* Full-bleed page background tint + floating icons */}
      <div
        className="pointer-events-none absolute z-0 overflow-hidden"
        style={{ top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100vw" }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundColor: PAGE_BG[selectedEmotion] }}
          transition={{ duration: 0.45 }}
        />

        <AnimatePresence>
          <motion.div
            key={selectedEmotion}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {BG_FLOATS.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute opacity-[0.18]"
                style={{
                  top: pos.top,
                  ...(pos.left  ? { left:  pos.left  } : {}),
                  ...(pos.right ? { right: pos.right } : {}),
                } as React.CSSProperties}
                animate={{ y: [-16, 16, -16], rotate: [-6, 6, -6] }}
                transition={{ duration: pos.dur, delay: pos.delay, repeat: Infinity, ease: "easeInOut" }}
              >
                <EmotionIcon emotion={selectedEmotion} className={pos.size} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-sans text-5xl font-extrabold tracking-tight text-gray-900">
            Gentle Support Steps
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-sans text-base text-gray-500">
            Select your emotional state, then explore these supportive, non-clinical exercises.
          </p>
        </div>

        {/* Emotion Selector Chips */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-8">
          {emotionKeys.map((key) => {
            const m = EMOTIONS_META[key];
            const p = PANEL[key];
            const isActive = selectedEmotion === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedEmotion(key)}
                id={`action-select-${key}`}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
                  isActive
                    ? `${p.chipActive} shadow-lg scale-105`
                    : "border-gray-100 bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
                }`}
              >
                <EmotionIcon emotion={key} className="w-10 h-10" />
                <span className={`text-[10px] font-bold leading-tight ${isActive ? "" : "text-gray-700"}`}>
                  {m.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Colored Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEmotion}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className={`relative overflow-hidden rounded-[2.5rem] ${panel.panelBg} shadow-2xl`}
          >
            {/* Floating icons inside panel */}
            {PANEL_FLOATS.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute opacity-[0.16] pointer-events-none"
                style={{
                  top: pos.top,
                  ...(pos.left  ? { left:  pos.left  } : {}),
                  ...(pos.right ? { right: pos.right } : {}),
                } as React.CSSProperties}
                animate={{ y: [-14, 14, -14], rotate: [-6, 6, -6] }}
                transition={{ duration: pos.dur, delay: pos.delay, repeat: Infinity, ease: "easeInOut" }}
              >
                <EmotionIcon emotion={selectedEmotion} className={pos.size} />
              </motion.div>
            ))}

            {/* Main content */}
            <div className="relative z-10 p-8 md:p-12">

              {/* Hero row */}
              <div className={`flex flex-col sm:flex-row sm:items-center gap-6 mb-8 pb-8 border-b ${panel.innerBorder}`}>
                <EmotionIcon
                  emotion={selectedEmotion}
                  className="w-32 h-32 md:w-44 md:h-44 shrink-0 drop-shadow-xl"
                />
                <div>
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold border ${panel.innerBg} ${panel.innerBorder} ${panel.textSub}`}>
                    {meta.signalType}
                  </span>
                  <h3 className={`font-sans text-3xl md:text-4xl font-black tracking-tight mt-2 ${panel.textMain}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm mt-1.5 font-medium ${panel.textSub}`}>
                    {meta.description}
                  </p>
                </div>
              </div>

              {/* Prompt box */}
              <div className={`rounded-2xl p-5 mb-8 flex items-start gap-3 border ${panel.innerBg} ${panel.innerBorder}`}>
                <MessageSquare className={`h-5 w-5 shrink-0 mt-0.5 ${panel.textMain} opacity-70`} />
                <p className={`font-sans text-sm font-medium leading-relaxed ${panel.textMain}`}>
                  {step.prompt}
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-5">
                <span className={`font-sans text-[10px] font-bold block uppercase tracking-widest ${panel.textSub}`}>
                  Recommended Steps
                </span>
                {step.actions.map((act, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black font-mono shadow-sm ${panel.numberBg}`}>
                      {index + 1}
                    </div>
                    <p className={`font-sans text-sm leading-relaxed pt-1 ${panel.textMain}`}>
                      {act}
                    </p>
                  </div>
                ))}
              </div>

              {/* Safety note */}
              <div className={`mt-10 pt-6 border-t ${panel.innerBorder} flex items-start gap-3 text-xs font-sans ${panel.textSub}`}>
                <Shield className="h-4 w-4 shrink-0 mt-0.5 opacity-70" />
                <p>
                  These steps are designed strictly for emotional checking, grounding, and vocabulary building. If you are experiencing symptoms of clinical severity or safety crises, please reference the helpline links on our{" "}
                  <span className={`underline font-bold ${panel.textMain}`}>About</span> page immediately.
                </p>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};
