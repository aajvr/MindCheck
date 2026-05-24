import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, BookOpen, Activity, Footprints, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { EmotionIcon } from "./EmotionIcon";

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
}

// Positioned at the very edges of the screen
const BG_EMOTIONS = [
  { emotion: "sadness" as const,     cls: "w-52 h-52", pos: { top: "2%",  left:  "0"  }, delay: 0,   dur: 7   },
  { emotion: "remorse" as const,     cls: "w-44 h-44", pos: { top: "10%", right: "0"  }, delay: 1,   dur: 8   },
  { emotion: "fear" as const,        cls: "w-40 h-40", pos: { top: "40%", left:  "0"  }, delay: 2,   dur: 9   },
  { emotion: "anger" as const,       cls: "w-56 h-56", pos: { top: "56%", right: "0"  }, delay: 0.5, dur: 10  },
  { emotion: "disgust" as const,     cls: "w-40 h-40", pos: { top: "76%", left:  "0"  }, delay: 1.5, dur: 7.5 },
  { emotion: "disapproval" as const, cls: "w-48 h-48", pos: { top: "82%", right: "0"  }, delay: 2.5, dur: 8   },
  { emotion: "joy" as const,         cls: "w-52 h-52", pos: { top: "27%", right: "0"  }, delay: 0.8, dur: 9.5 },
  { emotion: "surprise" as const,    cls: "w-44 h-44", pos: { top: "62%", left:  "0"  }, delay: 1.2, dur: 7   },
];

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });
  const bgRef = useRef<HTMLDivElement>(null);

  // Track mouse relative to the full-bleed background layer
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (bgRef.current) {
      const rect = bgRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const floatingCards = [
    { emotion: "sadness" as const,     label: "Sadness",     subtitle: "Low mood indicator",    bgColor: "bg-blue-50/75 border-blue-100"    },
    { emotion: "remorse" as const,     label: "Remorse",     subtitle: "Self-blame filter",     bgColor: "bg-violet-50/75 border-violet-100" },
    { emotion: "disapproval" as const, label: "Disapproval", subtitle: "Self-critique model",   bgColor: "bg-indigo-50/75 border-indigo-100" },
    { emotion: "joy" as const,         label: "Joy",         subtitle: "Balanced mind contrast", bgColor: "bg-amber-50/75 border-amber-100"  },
  ];

  return (
    <div className="py-8 md:py-12 relative" id="home-view-container">

      {/* Full-bleed background layer — breaks out of max-w-7xl parent */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute z-0 overflow-hidden"
        style={{ top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100vw" }}
      >
        {/* Faint grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.055) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(139,92,246,0.055) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Cursor-following radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(139,92,246,0.13),
              rgba(99,102,241,0.07) 40%,
              transparent 70%)`,
          }}
        />

        {/* Floating emotion icons — edge to edge */}
        {BG_EMOTIONS.map((item, i) => (
          <motion.div
            key={i}
            className="absolute opacity-[0.18]"
            style={item.pos as React.CSSProperties}
            animate={{ y: [-16, 16, -16], rotate: [-6, 6, -6] }}
            transition={{ duration: item.dur, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <EmotionIcon emotion={item.emotion} className={item.cls} />
          </motion.div>
        ))}
      </div>

      {/* Main content — sits above background */}
      <div className="relative z-10">

        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center space-x-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">
            <Activity className="w-3.5 h-3.5 animate-pulse text-violet-600" />
            <span>Non-Clinical AI Research Pilot</span>
          </span>
          <h1 className="mt-3 font-sans text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-500">
            CloudNine MindCheck
          </h1>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            A modern, offline-first Bento Dashboard to measure emotional expressions in short texts.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">

          {/* Box 1: CTA Banner */}
          <div className="md:col-span-8 bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-sm flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
                Understand your <span className="text-violet-600">mind</span>.<br />
                Heal your <span className="text-indigo-600">heart</span>.
              </h2>
              <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed max-w-xl">
                CloudNine MindCheck securely interprets brief written text to find active GoEmotions markers tied to low-mood syndromes. Spot patterns such as sadness, regrets, or self-criticism, and learn how to reframe negative self-view.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={() => setActiveTab("analyze")}
                id="cta-start-analysis"
                className="group flex items-center justify-center space-x-2 rounded-2xl bg-gray-950 px-6 py-4 font-sans text-base font-semibold text-white shadow-xl hover:bg-violet-600 hover:shadow-violet-200 transition-all cursor-pointer"
              >
                <span>Analyze Text Entry</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => setActiveTab("guide")}
                id="cta-view-guide"
                className="flex items-center justify-center space-x-2 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-4 font-sans text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
              >
                <BookOpen className="h-5 w-5 text-gray-500" />
                <span>Explore Code Guide</span>
              </button>
            </div>
          </div>

          {/* Box 2: Model Info */}
          <div className="md:col-span-4 bg-[#EDE9FE]/90 backdrop-blur-sm rounded-[2rem] p-8 border border-white shadow-sm flex flex-col justify-between text-violet-900">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-700">Model Level</span>
            <div className="my-6">
              <h3 className="text-2xl font-black text-violet-950 font-sans tracking-tight">RoBERTa</h3>
              <p className="text-xs text-violet-700/80 mt-1.5 leading-relaxed font-sans font-medium">
                Fine-tuned using GoEmotions to classify depression-related emotions such as sadness, remorse, fear, anger, disgust, and disapproval from text inputs.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("about")}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-violet-300 bg-white/70 hover:bg-white px-4 py-3 text-xs font-bold text-violet-700 transition-all mt-auto"
            >
              Learn more about the model
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Box 3: Emotion Showcase */}
          <div className="md:col-span-12 bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h3 className="font-sans text-lg font-bold text-gray-900">Primary Monitored Distress Signals</h3>
                <p className="text-xs text-gray-400 mt-0.5">We track self-reflection patterns commonly found in sub-clinical low mood states.</p>
              </div>
              <button onClick={() => setActiveTab("guide")} className="text-xs font-bold text-violet-600 hover:text-violet-800 underline text-left">
                Learn about our taxonomy definitions &rarr;
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {floatingCards.map((card) => (
                <div
                  key={card.emotion}
                  className={`flex flex-col items-center gap-5 p-7 rounded-2xl border ${card.bgColor} shadow-sm cursor-pointer hover:scale-[1.04] transition-transform duration-200`}
                  onClick={() => setActiveTab("guide")}
                >
                  <EmotionIcon emotion={card.emotion} className="w-20 h-20" />
                  <div className="text-center">
                    <h4 className="font-sans text-base font-bold text-gray-950">{card.label}</h4>
                    <p className="font-sans text-xs text-gray-500 mt-1">{card.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Box 4: Gentle Steps CTA */}
          <div
            className="md:col-span-12 bg-gradient-to-r from-violet-50/80 to-indigo-50/80 backdrop-blur-sm rounded-[2rem] p-8 border border-violet-100 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6 cursor-pointer group"
            onClick={() => setActiveTab("steps")}
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-violet-100">
                <Footprints className="w-7 h-7 text-violet-500" />
              </div>
              <div>
                <h4 className="font-sans text-base font-bold text-gray-900">Not sure where to start?</h4>
                <p className="font-sans text-sm text-gray-500 leading-relaxed mt-0.5 max-w-xl">
                  Follow our <span className="font-semibold text-violet-600">Gentle Steps</span> — a guided walkthrough that helps you ease into emotional self-reflection at your own pace.
                </p>
              </div>
            </div>
            <button className="shrink-0 flex items-center gap-2 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-6 py-3 transition-all group-hover:shadow-lg group-hover:shadow-violet-200">
              View Gentle Steps
              <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
