import React, { useState } from "react";
import { EmotionLabel } from "../types";
import { EMOTIONS_META, GENTLE_STEPS } from "../utils/emotionMeta";
import { EmotionIcon } from "./EmotionIcon";
import { Heart, ChevronRight, MessageSquare, Anchor, Shield } from "lucide-react";

export const ActionsView: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionLabel>("sadness");
  const emotionKeys = Object.keys(EMOTIONS_META) as EmotionLabel[];

  const activeStep = GENTLE_STEPS[selectedEmotion];
  const activeMeta = EMOTIONS_META[selectedEmotion];

  return (
    <div className="py-8 md:py-12" id="steps-view-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center mb-10">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900">
            Gentle Support Steps
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-sans text-sm text-gray-500">
            Acknowledge your emotional state first, then explore these supportive, non-clinical exercises built carefully for each emotion.
          </p>
        </div>

        {/* Responsive Grid with side-menu selectors and focus content box */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Quick selectors - left 4 columns */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="font-sans text-[10px] font-bold text-gray-400 block uppercase tracking-wider pl-1 mb-1">
              Select Emotional State
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {emotionKeys.map((key) => {
                const meta = EMOTIONS_META[key];
                const isActive = selectedEmotion === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedEmotion(key)}
                    id={`action-select-${key}`}
                    className={`flex items-center space-x-3 w-full p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                      isActive
                        ? `${meta.borderColor} ${meta.bgColor} shadow-sm ring-1 ring-violet-400/20 font-bold`
                        : "border-gray-100 bg-white hover:bg-gray-50/50"
                    }`}
                  >
                    <EmotionIcon emotion={key} className="w-10 h-10 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-sans text-sm font-bold text-gray-900 leading-tight truncate">
                        {meta.name}
                      </p>
                      <p className="font-sans text-[10px] text-gray-400 truncate mt-0.5 font-medium">
                        {meta.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Contents Display Area - right 8 columns */}
          <div className="lg:col-span-8">
            <div className={`rounded-[2.2rem] border ${activeMeta.borderColor} bg-white p-8 shadow-sm min-h-[420px] flex flex-col justify-between overflow-hidden relative`}>
              {/* Visual stripe indicator */}
              <div className={`absolute top-0 left-0 right-0 h-2 ${activeMeta.bannerColor}`} />

              <div>
                {/* Header title */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-gray-100 mb-6">
                  <div className="flex items-center space-x-3">
                    <EmotionIcon emotion={selectedEmotion} className="w-16 h-16 shrink-0" />
                    <div>
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${activeMeta.badgeColor} border`}>
                        {activeMeta.signalType}
                      </span>
                      <h3 className="font-sans text-xl font-extrabold text-gray-900 mt-1">
                        {activeStep.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Introductory Prompt box resembling sticky note */}
                <div className={`rounded-xl p-4 mb-6 ${activeMeta.bgColor} border border-dashed border-gray-200/50 flex items-start space-x-3`}>
                  <MessageSquare className={`h-5 w-5 shrink-0 mt-0.5 ${activeMeta.textColor}`} />
                  <p className="font-sans text-sm text-gray-600 font-medium leading-relaxed">
                    {activeStep.prompt}
                  </p>
                </div>

                {/* Step List */}
                <div className="space-y-4">
                  <span className="font-sans text-[10px] font-bold text-gray-400 block uppercase tracking-wider">
                    Recommended Steps
                  </span>
                  {activeStep.actions.map((act, index) => (
                    <div key={index} className="flex items-start space-x-3 group">
                      <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold font-mono text-white ${activeMeta.bannerColor} shadow-sm`}>
                        {index + 1}
                      </div>
                      <p className="font-sans text-sm text-gray-700 leading-relaxed pt-0.5">
                        {act}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Safety anchor note at bottom */}
              <div className="mt-8 pt-5 border-t border-gray-100 flex items-start space-x-2.5 text-xs text-gray-500 font-sans">
                <Shield className="h-4.5 w-4.5 text-gray-400 shrink-0 mt-0.5" />
                <p>
                  These steps are designed strictly for emotional checking, grounding, and vocabulary building. If you are experiencing symptoms of clinical severity or safety crises, please reference the helpline links on our <span className="underline font-bold text-violet-600">About</span> page immediately.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
