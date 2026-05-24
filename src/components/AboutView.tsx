import React from "react";
import { AlertTriangle, ShieldCheck, FileText, Heart, Compass, HeartHandshake } from "lucide-react";
import { EMOTIONS_META } from "../utils/emotionMeta";
import { EmotionIcon } from "./EmotionIcon";
import { EmotionLabel } from "../types";

export const AboutView: React.FC = () => {
  const emotionsList = Object.keys(EMOTIONS_META) as EmotionLabel[];

  return (
    <div className="mx-auto max-w-7xl py-8 md:py-12 px-4 sm:px-6" id="about-view-container">
      {/* App Headline Section */}
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <span className="inline-flex items-center space-x-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">
          Academic Research Context
        </span>
        <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          About CloudNine MindCheck
        </h2>
        <p className="mt-2 text-sm text-gray-500 font-sans leading-relaxed">
          Behind the offline-first text analysis prototype and the sub-clinical emotional parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Card 1: Research Goals (Full Width) */}
        <div className="lg:col-span-12 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm flex flex-col gap-6">
          <div className="flex items-center space-x-3 text-violet-600">
            <Compass className="h-6 w-6" />
            <span className="font-sans text-lg font-bold text-gray-950">Objective & Methodology</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Objective */}
            <div>
              <h4 className="font-sans text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Objective</h4>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                The objective of the study was to develop and evaluate an <strong className="text-gray-800">emotion recognition model</strong> for identifying <strong className="text-violet-700">depression-related emotional patterns</strong> in text. The study used the <strong className="text-gray-800">GoEmotions dataset</strong>, which contains <strong className="text-gray-800">Reddit comments</strong> labeled with fine-grained emotions. From the original dataset, <strong className="text-violet-700">eight labels</strong> were selected: <span className="text-violet-600 font-semibold">sadness</span>, <span className="text-violet-600 font-semibold">remorse</span>, <span className="text-violet-600 font-semibold">fear</span>, <span className="text-violet-600 font-semibold">anger</span>, <span className="text-violet-600 font-semibold">disgust</span>, <span className="text-violet-600 font-semibold">disapproval</span>, <span className="text-violet-600 font-semibold">joy</span>, and <span className="text-violet-600 font-semibold">surprise</span>.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed mt-3">
                The task was treated as a <strong className="text-gray-800">single-label multiclass classification</strong> problem, so only samples with exactly one selected emotion label were retained, while multi-label or unrelated samples were removed. To improve class balance, <strong className="text-gray-800">oversampling</strong> was applied only to the <strong className="text-gray-800">training set</strong>, while the validation and test sets remained unchanged for fair evaluation.
              </p>
            </div>

            {/* Methodology */}
            <div>
              <h4 className="font-sans text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Methodology</h4>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                The text data was tokenized with a maximum length of <strong className="text-gray-800">128 tokens</strong> and trained using three transformer-based models: <strong className="text-violet-700">Distil-RoBERTa</strong>, <strong className="text-violet-700">ModernBERT</strong>, and <strong className="text-violet-700">RoBERTa</strong>. All models were fine-tuned under the same training setup using <strong className="text-gray-800">weighted cross-entropy loss</strong>, <strong className="text-gray-800">five epochs</strong>, a learning rate of <strong className="text-gray-800">8e-6</strong>, batch size of <strong className="text-gray-800">8</strong>, weight decay of <strong className="text-gray-800">0.01</strong>, and <strong className="text-gray-800">macro F1</strong> as the best model criterion.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed mt-3">
                Results showed that all three models reached around <strong className="text-violet-700">80% test accuracy</strong>:
              </p>
              <ul className="mt-2 space-y-1.5 font-sans text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                  <span><strong className="text-gray-800">Distil-RoBERTa</strong> — <strong className="text-gray-800">80.08%</strong> accuracy, <strong className="text-gray-800">0.8007</strong> macro F1</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                  <span><strong className="text-gray-800">ModernBERT</strong> — <strong className="text-gray-800">80.45%</strong> accuracy, <strong className="text-gray-800">0.8024</strong> macro F1</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
                  <span><strong className="text-violet-700">RoBERTa</strong> — <strong className="text-violet-700">80.45%</strong> accuracy, highest macro F1 of <strong className="text-violet-700">0.8035</strong> — <span className="font-semibold text-violet-700">strongest model overall</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 2: Essential Disclaimer (Full Width, below Objective & Methodology) */}
        <div className="lg:col-span-12 rounded-[2rem] border border-amber-200 bg-amber-50/50 p-8 shadow-inner border-dashed flex flex-col gap-4">
          <div className="flex items-center space-x-2 text-amber-700">
            <AlertTriangle className="h-6 w-6 shrink-0" />
            <span className="font-bold text-base font-sans">Strict Disclaimer</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="font-sans text-xs text-amber-800 leading-relaxed">
              CloudNine MindCheck is <strong>not</strong> a diagnostic device, psychiatric test instrument, or therapy replacement. The signal score represents calculated sentiment density approximations, <strong>not personal physiological statuses</strong>.
            </p>
            <p className="font-sans text-xs text-amber-800 leading-relaxed">
              Never dismiss professional health care or avoid professional counseling services based on parameters shown here.
            </p>
          </div>
          <div className="text-[10px] text-amber-600/80 font-mono uppercase font-bold border-t border-amber-200/50 pt-3">
            Educational Prototype &bull; Safe Study
          </div>
        </div>

        {/* Card 3: Support resources (6 Columns) */}
        <div className="lg:col-span-6 rounded-[2rem] border border-rose-100 bg-rose-50/10 p-8 shadow-sm border-dashed flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 text-rose-600 mb-3">
              <HeartHandshake className="h-5 w-5" />
              <h3 className="font-sans text-base font-bold text-gray-950">Safety Hotlines & Resources</h3>
            </div>
            <p className="font-sans text-xs text-gray-600 leading-relaxed mb-4">
              If you or someone close is dealing with deep sorrow, anxiety, or high stress, these national connections offer free, warm, private support 24 hours a day:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            <div className="rounded-2xl bg-white p-4 border border-rose-50 shadow-sm">
              <p className="font-bold text-rose-700">United States Crisis Lifeline</p>
              <p className="text-gray-600 mt-1">Shortcode calling/text: <span className="font-mono font-bold bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded">988</span></p>
            </div>
            <div className="rounded-2xl bg-white p-4 border border-rose-50 shadow-sm">
              <p className="font-bold text-rose-700">Crisis Text Line</p>
              <p className="text-gray-600 mt-1">Send Text <span className="font-bold">HOME</span> to <span className="font-mono font-bold bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded">741741</span></p>
            </div>
            <div className="rounded-2xl bg-white p-4 border border-rose-50 shadow-sm">
              <p className="font-bold text-rose-700">United Kingdom Helpline</p>
              <p className="text-gray-600 mt-1">Free Samaritans line: <span className="font-mono font-bold bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded">116 123</span></p>
            </div>
            <div className="rounded-2xl bg-white p-4 border border-rose-50 shadow-sm flex items-center justify-between">
              <div>
                <p className="font-bold text-indigo-700 text-xs">Global Help Index</p>
                <p className="text-gray-500 text-[10px] mt-0.5">findahelpline.com</p>
              </div>
              <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-indigo-600 hover:underline">
                Visit Site &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Card 4: Included Emotions Showcase (6 Columns) */}
        <div className="lg:col-span-6 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm flex flex-col justify-between gap-4">
          <div>
            <h3 className="font-sans text-base font-bold text-gray-950 mb-2 flex items-center">
              <Heart className="h-5 w-5 text-rose-500 mr-2 shrink-0" />
              Eight Analyzed GoEmotions Anchors
            </h3>
            <p className="text-xs text-gray-400 mb-4 leading-normal">
              Our analyzer measures negative categories to find distress, balanced with positive keys to determine mood spectrum counters.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {emotionsList.map((e) => (
              <div key={e} className="flex flex-col items-center p-3 rounded-2xl bg-gray-50 border border-gray-100/50 hover:bg-violet-50 hover:border-violet-100 transition-colors duration-200">
                <EmotionIcon emotion={e} className="w-10 h-10" />
                <span className="font-sans text-[10px] font-bold text-gray-600 mt-1.5 capitalize">{e}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
