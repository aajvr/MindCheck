import React from "react";
import { AlertTriangle, Heart, Compass, Phone, MessageSquare, Crown, Sparkles } from "lucide-react";
import { EMOTIONS_META } from "../utils/emotionMeta";
import { EmotionIcon } from "./EmotionIcon";
import { EmotionLabel } from "../types";

export const AboutView: React.FC = () => {
  const emotionsList = Object.keys(EMOTIONS_META) as EmotionLabel[];

  return (
    <div
      id="about-view-container"
      className="relative flex-1"
      style={{
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(145deg, #ffffff 0%, #f3efff 30%, #ebe4ff 60%, #dfd5ff 100%)",
      }}
    >
      {/* ── Full-page decorative blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {/* top-left large */}
        <div className="absolute -left-40 -top-24 w-[520px] h-[520px] rounded-full bg-violet-200/45" />
        <div className="absolute -left-20 top-24 w-80 h-80 rounded-full bg-violet-100/55" />
        {/* top-right large */}
        <div className="absolute -right-36 -top-16 w-[480px] h-[480px] rounded-full bg-violet-100/60" />
        <div className="absolute right-16 top-32 w-56 h-56 rounded-full bg-violet-200/30" />
        {/* bottom-left */}
        <div className="absolute -left-32 bottom-0 w-96 h-96 rounded-full bg-violet-200/35" />
        {/* bottom-right */}
        <div className="absolute -right-24 bottom-10 w-72 h-72 rounded-full bg-indigo-100/40" />
        {/* scattered small dots */}
        <div className="absolute right-1/4 top-16 w-3 h-3 rounded-full bg-violet-400/25" />
        <div className="absolute right-1/3 top-8 w-2 h-2 rounded-full bg-violet-400/30" />
        <div className="absolute left-1/3 bottom-24 w-2 h-2 rounded-full bg-violet-300/35" />
        <span className="absolute left-[22%] top-10 text-violet-300/45 text-3xl font-light select-none">+</span>
        <span className="absolute right-[18%] bottom-32 text-violet-300/35 text-2xl font-light select-none">+</span>
      </div>

      {/* ── Content wrapper ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">

      {/* ── Page header ── */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-700">
          Academic Research Context
        </span>
        <h2 className="mt-4 font-sans text-5xl font-extrabold tracking-tight text-gray-900">
          About MindCheck
        </h2>
        <p className="mt-3 text-base text-gray-500 font-sans leading-relaxed">
          Behind the offline-first text analysis prototype and the sub-clinical emotional parameters.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* ── Card 1: Objective & Methodology ── */}
        <div className="lg:col-span-12 rounded-[2rem] border border-gray-100 bg-white p-10 shadow-sm flex flex-col gap-8">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200 shrink-0">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-sans text-2xl font-bold text-gray-950">Objective & Methodology</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Objective column */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs font-black text-violet-600 uppercase tracking-widest">Objective</h4>
              <p className="font-sans text-base text-gray-600 leading-relaxed">
                The objective of the study was to develop and evaluate an{" "}
                <strong className="text-gray-900">emotion recognition model</strong> for identifying{" "}
                <strong className="text-violet-700">depression-related emotional patterns</strong> in text.
              </p>
              <p className="font-sans text-base text-gray-600 leading-relaxed">
                The study used the <strong className="text-violet-700">GoEmotions dataset</strong>, which contains
                Reddit comments labeled with fine-grained emotions. From the original dataset,{" "}
                <strong className="text-violet-700">eight labels</strong> were selected:{" "}
                <span className="text-violet-600 font-semibold">sadness</span>,{" "}
                <span className="text-violet-600 font-semibold">remorse</span>,{" "}
                <span className="text-violet-600 font-semibold">fear</span>,{" "}
                <span className="text-violet-600 font-semibold">anger</span>,{" "}
                <span className="text-violet-600 font-semibold">disgust</span>,{" "}
                <span className="text-violet-600 font-semibold">disapproval</span>,{" "}
                <span className="text-violet-600 font-semibold">joy</span>, and{" "}
                <span className="text-violet-600 font-semibold">surprise</span>.
              </p>
              <p className="font-sans text-base text-gray-600 leading-relaxed">
                The task was treated as a{" "}
                <strong className="text-gray-900">single-label multiclass classification</strong> problem, so only
                samples with exactly one selected emotion label were retained, while multi-label or unrelated samples
                were removed. To improve class balance,{" "}
                <strong className="text-gray-900">oversampling</strong> was applied only to the{" "}
                <strong className="text-gray-900">training set</strong>, while the validation and test sets remained
                unchanged for fair evaluation.
              </p>
            </div>

            {/* Methodology column */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs font-black text-violet-600 uppercase tracking-widest">Methodology</h4>
              <p className="font-sans text-base text-gray-600 leading-relaxed">
                The text data was tokenized with a maximum length of{" "}
                <strong className="text-gray-900">128 tokens</strong> and trained using three transformer-based
                models: <strong className="text-violet-700">Distil-RoBERTa</strong>,{" "}
                <strong className="text-violet-700">ModernBERT</strong>, and{" "}
                <strong className="text-violet-700">RoBERTa</strong>.
              </p>
              <p className="font-sans text-base text-gray-600 leading-relaxed">
                All models were fine-tuned under the same training setup using{" "}
                <strong className="text-gray-900">weighted cross-entropy loss</strong>,{" "}
                <strong className="text-gray-900">five epochs</strong>, a learning rate of{" "}
                <strong className="text-gray-900">8e-6</strong>, batch size of{" "}
                <strong className="text-gray-900">8</strong>, weight decay of{" "}
                <strong className="text-gray-900">0.01</strong>, and{" "}
                <strong className="text-gray-900">macro F1</strong> as the best model criterion.
              </p>
              <p className="font-sans text-base text-gray-600 leading-relaxed">
                Results show that all three models reached around{" "}
                <strong className="text-violet-700">80% test accuracy</strong>.
              </p>

              {/* Model comparison rows */}
              <div className="rounded-2xl border border-gray-100 overflow-hidden mt-2">
                {[
                  { name: "Distil-RoBERTa", acc: "80.08%", f1: "0.8007", best: false },
                  { name: "ModernBERT",     acc: "80.45%", f1: "0.8024", best: false },
                  { name: "RoBERTa",        acc: "80.45%", f1: "0.8035", best: true  },
                ].map((m, i, arr) => (
                  <div
                    key={m.name}
                    className={`flex items-center justify-between px-5 py-4 ${
                      i < arr.length - 1 ? "border-b border-gray-100" : ""
                    } ${m.best ? "bg-violet-50/60" : "bg-white"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full shrink-0 ${m.best ? "bg-violet-600" : "bg-violet-300"}`} />
                      <span className={`font-sans text-sm font-bold ${m.best ? "text-violet-700" : "text-gray-700"}`}>
                        {m.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-5 flex-wrap justify-end">
                      <span className={`font-mono text-sm font-bold ${m.best ? "text-violet-700" : "text-gray-600"}`}>
                        {m.acc} accuracy
                      </span>
                      <span className={`font-mono text-sm ${m.best ? "text-violet-600 font-bold" : "text-gray-400"}`}>
                        {m.f1} macro F1
                      </span>
                      {m.best && (
                        <span className="inline-flex items-center gap-1.5 bg-violet-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg whitespace-nowrap">
                          <Crown className="w-3 h-3" />
                          Strongest Overall
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 2: Disclaimer ── */}
        <div className="lg:col-span-12 rounded-[2rem] border-2 border-amber-200 bg-amber-50/70 p-8 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <span className="font-bold text-xl font-sans text-amber-900">Strict Disclaimer</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <p className="font-sans text-sm text-amber-800 leading-relaxed">
              CloudNine MindCheck is <strong>not</strong> a diagnostic device, psychiatric test instrument, or therapy
              replacement.
            </p>
            <p className="font-sans text-sm text-amber-800 leading-relaxed">
              The signal score represents calculated sentiment density approximations,{" "}
              <strong>not personal physiological statuses</strong>.
            </p>
            <p className="font-sans text-sm text-amber-800 leading-relaxed">
              Never dismiss professional health care or avoid professional counseling services based on parameters
              shown here.
            </p>
          </div>
        </div>

        {/* ── Card 3: Safety Hotlines ── */}
        <div className="lg:col-span-6 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-200 shrink-0">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-sans text-xl font-bold text-gray-950">Mental Health & Crisis Support</h3>
              <p className="font-sans text-sm text-gray-500 mt-1 leading-relaxed">
                If you or someone close is in crisis or dealing with deep distress, these Philippine
                support lines offer free, confidential help.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* NCMH */}
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">National Center for Mental Health (NCMH)</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Crisis Hotline (Toll-Free Luzon):{" "}
                  <span className="font-mono font-black text-rose-600">1553</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Globe/TM:{" "}
                  <span className="font-mono font-black text-rose-600">0917-899-8727</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Smart/TNT:{" "}
                  <span className="font-mono font-black text-rose-600">0919-057-1553</span>
                </p>
              </div>
            </div>

            {/* Hopeline */}
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">Hopeline Philippines (NGF)</p>
                <p className="text-xs text-gray-500 mt-1">
                  Globe/TM:{" "}
                  <span className="font-mono font-black text-rose-600">2919</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Landline:{" "}
                  <span className="font-mono font-black text-rose-600">(02) 8804-4673</span>
                </p>
              </div>
            </div>

            {/* In Touch */}
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center shrink-0 shadow-sm">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">In Touch Community Services</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Landline:{" "}
                  <span className="font-mono font-black text-rose-600">(02) 8893-7603</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 4: GoEmotions Anchors ── */}
        <div className="lg:col-span-6 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-200 shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-sans text-xl font-bold text-gray-950">Eight Analyzed GoEmotions Anchors</h3>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Our analyzer measures negative categories to find distress, balanced with positive keys to determine
                mood spectrum counters.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {emotionsList.map((e) => {
              const m = EMOTIONS_META[e];
              return (
                <div
                  key={e}
                  className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-violet-50 hover:border-violet-100 transition-colors duration-200"
                >
                  <EmotionIcon emotion={e} className="w-14 h-14" />
                  <span className="font-sans text-xs font-bold text-gray-700 capitalize text-center leading-tight">
                    {m.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      </div>
    </div>
  );
};
