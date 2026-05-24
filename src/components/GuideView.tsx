import React from "react";
import { EMOTIONS_META } from "../utils/emotionMeta";
import { EmotionIcon } from "./EmotionIcon";
import { EmotionLabel } from "../types";
import { HelpCircle, Info } from "lucide-react";

export const GuideView: React.FC = () => {
  const emotionKeys = Object.keys(EMOTIONS_META) as EmotionLabel[];

  return (
    <div className="py-8 md:py-12" id="guide-view-container">
      {/* Introduction Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          Meet Your Emotions
        </h2>
        <p className="mx-auto mt-3 max-w-2xl font-sans text-sm md:text-base text-gray-500">
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
                className={`relative flex flex-col justify-between overflow-hidden rounded-[2.2rem] border ${meta.borderColor} ${meta.bgColor} p-6 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md`}
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

        {/* Disclaimer / Advice on using guide */}
        <div className="mt-12 rounded-xl bg-gray-50 p-4 border border-gray-100 flex items-start space-x-3">
          <Info className="h-5 w-5 text-violet-500 shrink-0 mt-0.5" />
          <p className="font-sans text-xs text-gray-500 leading-relaxed">
            <span className="font-bold text-gray-700">Research Framing Note:</span> These emotional divisions originate from the GoEmotions taxonomy. Our prototype maps negative signals like <span className="text-blue-600 font-semibold">Sadness</span>, <span className="text-violet-600 font-semibold">Remorse</span>, and <span className="text-indigo-600 font-semibold">Disapproval</span> because clinical papers suggest self-referential writing containing high levels of sadness combined with intense self-blame or disapproval are highly correlated with low mood syndromes.
          </p>
        </div>
      </div>
    </div>
  );
};
