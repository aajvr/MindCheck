import React, { useState } from "react";
import { AnalysisResult, EmotionLabel, HistoryEntry } from "../types";
import { EMOTIONS_META } from "../utils/emotionMeta";
import { EmotionIcon } from "./EmotionIcon";
import { Send, AlertTriangle, ArrowRight, CornerDownRight, Heart, Sparkles, HelpCircle } from "lucide-react";

export const AnalyzeView: React.FC = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Local Reflection Input
  const [reflection, setReflection] = useState("");
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Character limit tracker
  const maxChars = 1000;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value.slice(0, maxChars));
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please write or paste some text first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setShowDetails(false);
    setReflection("");
    setReflectionSubmitted(false);

    try {
      const resp = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!resp.ok) {
        const errJson = await resp.json().catch(() => ({}));
        throw new Error(errJson.error || "Failed to analyze emotional patterns.");
      }

      const analyzedResult: AnalysisResult = await resp.json();
      setResult(analyzedResult);

      // Save to local storage for trends
      saveToHistory(text, analyzedResult);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const saveToHistory = (inputText: string, res: AnalysisResult) => {
    try {
      const historyStr = localStorage.getItem("mindcheck_history");
      const list: HistoryEntry[] = historyStr ? JSON.parse(historyStr) : [];
      
      const newEntry: HistoryEntry = {
        id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: inputText,
        result: res,
        timestamp: new Date().toISOString(),
      };

      list.push(newEntry);
      // Keep only last 100 to save space
      const trimmed = list.slice(-100);
      localStorage.setItem("mindcheck_history", JSON.stringify(trimmed));
    } catch (e) {
      console.error("Local storage save error:", e);
    }
  };

  return (
    <div className="py-8 md:py-12" id="analyze-view-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center mb-8">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-900">
            Emotional Tone & Sentiment Analyzer
          </h2>
          <p className="mt-2 font-sans text-sm text-gray-500">
            Write or paste a journal entry, message, or thought to discover the primary emotional sentiment and confidence level.
          </p>
        </div>

        {/* Input Card Container */}
        <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm mb-8">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label htmlFor="journal-textarea" className="block font-sans text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Your Written Words
              </label>
              <textarea
                id="journal-textarea"
                rows={5}
                value={text}
                onChange={handleTextChange}
                placeholder="Write or paste a journal entry, message, or thought here..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-4 font-sans text-sm outline-none placeholder:text-gray-400 focus:border-violet-500 focus:bg-white transition-all resize-none shadow-inner"
              />
              <div className="flex justify-between items-center mt-1.5 text-[11px] font-sans text-gray-400">
                <span>All analysis is private, processed locally, and completely customizable.</span>
                <span className={text.length >= maxChars - 50 ? "text-amber-600 font-bold" : ""}>
                  {text.length}/{maxChars} characters
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !text.trim()}
                id="btn-analyze-submit"
                className="flex items-center space-x-2 rounded-xl bg-gray-900 px-6 py-3 font-sans text-sm font-semibold text-white shadow hover:bg-violet-600 transition-colors duration-200 disabled:opacity-40 disabled:hover:bg-gray-900 cursor-pointer"
              >
                <span>Analyze Emotional Sentiment</span>
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/20 p-8 text-center shadow-inner flex flex-col items-center justify-center animate-pulse" id="analysis-loader">
            <Sparkles className="h-8 w-8 text-violet-500 animate-spin mb-3" />
            <p className="font-sans text-sm font-bold text-violet-700">Running semantic classifier...</p>
            <p className="font-sans text-xs text-violet-500 mt-1">Sieving text elements against primary sentiment taxonomy indicators.</p>
          </div>
        )}

        {/* Error Flag */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 flex items-start space-x-3 text-red-800 shadow-sm" id="analysis-error">
            <AlertTriangle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
            <div className="text-xs font-sans">
              <p className="font-bold">Analysis Terminated</p>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Analysis Result Display */}
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in" id="analysis-result-box">
            
            {/* Box 1: Processed Diary Entry (Left Column) */}
            <section className="col-span-12 lg:col-span-7 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between gap-6 min-h-[300px]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 font-sans">Analyzed Text Entry</h3>
                <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest bg-violet-50 px-3 py-1 rounded-full">
                  Linguistic Input
                </span>
              </div>
              
              <div className="flex-1 bg-slate-50 rounded-2xl border border-gray-100 p-6 flex items-center justify-center">
                <p className="text-base leading-relaxed text-gray-700 italic font-sans text-center">
                  &ldquo;{text}&rdquo;
                </p>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Length: {text.length} characters</span>
                <button
                  onClick={() => {
                    setResult(null);
                    setText("");
                  }}
                  className="font-bold text-violet-600 hover:text-violet-800 transition-colors cursor-pointer"
                >
                  Analyze another entry &rarr;
                </button>
              </div>
            </section>

            {/* Box 2: PRIMARY SENTIMENT & CONFIDENCE CARD (Top Right, Simple & Clean) */}
            <section className="col-span-12 lg:col-span-5 bg-[#EDE9FE] rounded-[2rem] p-8 shadow-sm border border-white flex flex-col justify-between gap-6 min-h-[300px] text-violet-905">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-violet-700 uppercase tracking-wider font-sans">Primary Sentiment</h3>
                <span className="font-mono text-xs font-bold bg-white text-violet-700 px-2.5 py-0.5 rounded-lg border border-violet-100">
                  Linguistic Code: {result.dominantEmotion}
                </span>
              </div>

              {/* Giant Sentiment Icon + Text Row */}
              <div className="flex items-center gap-4 py-2">
                <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-md border border-violet-100">
                  <EmotionIcon emotion={result.dominantEmotion} className="w-14 h-14" />
                </div>
                <div>
                  <h4 className="text-3xl font-black text-violet-950 capitalize tracking-tight font-sans">
                    {result.dominantEmotion}
                  </h4>
                  <p className="text-xs text-violet-700/80 mt-1 font-medium font-sans">
                    Dominant category detected in statement.
                  </p>
                </div>
              </div>

              {/* Simple Progress Bar showing Confidence */}
              <div className="space-y-2">
                <div className="flex justify-between items-end text-xs font-bold">
                  <span className="text-violet-700 uppercase tracking-widest">Model Confidence</span>
                  <span className="text-violet-950 text-base font-black font-mono">{result.confidence}%</span>
                </div>
                <div className="w-full h-4 bg-white/60 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-violet-600 rounded-full shadow-inner transition-all duration-700"
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-[10px] text-violet-700/70 leading-normal border-t border-violet-200/40 pt-3">
                Score indicates dictionary mapping weight. Ready for custom model swap.
              </div>
            </section>

            {/* Box 3: Interpretation & Reflection Prompt Portal */}
            <section className="col-span-12 lg:col-span-7 bg-[#F1F5F9] rounded-[2rem] p-8 border border-white shadow-sm flex flex-col justify-between gap-6 min-h-[320px]">
              <div>
                <div className="flex items-center space-x-3 text-slate-705 mb-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-500">
                    <HelpCircle className="w-5 h-5 text-indigo-505" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Semantic Meaning & Action Tool</h4>
                    <p className="font-sans text-[11px] text-slate-500">Reframing suggestion & contextual brief</p>
                  </div>
                </div>

                {/* Local Interpretation paragraph */}
                <p className="font-sans text-xs text-slate-600 leading-relaxed mb-4 bg-white/70 rounded-2xl p-4 border border-slate-100">
                  <span className="font-bold text-gray-800 block mb-1">Interpretation Note:</span>
                  {result.explanation}
                </p>

                <p className="text-sm text-slate-800 italic font-semibold leading-relaxed bg-white rounded-2xl p-4 border border-slate-100 shadow-sm mt-2">
                  &ldquo;{result.reflectionPrompt}&rdquo;
                </p>

                {!reflectionSubmitted ? (
                  <div className="mt-4 space-y-3">
                    <textarea
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Type a brief therapeutic response as if you were talking to a close friend..."
                      rows={3}
                      className="w-full rounded-2xl border border-slate-200 bg-white/90 p-4 font-sans text-xs outline-none focus:border-violet-400 placeholder:text-gray-400 transition-all resize-none shadow-sm"
                    />
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setReflectionSubmitted(true)}
                        disabled={!reflection.trim()}
                        className="flex items-center space-x-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 px-4 py-2 font-sans text-xs font-semibold text-white shadow-sm transition-colors cursor-pointer"
                      >
                        <CornerDownRight className="h-3.5 w-3.5" />
                        <span>Submit Private Reflection</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
                    <p className="font-sans text-xs font-bold text-emerald-800 flex items-center">
                      <Heart className="h-4 w-4 mr-1.5 text-emerald-600" />
                      Reflection Preserved Dynamically.
                    </p>
                    <p className="font-sans text-xs text-emerald-700 leading-relaxed italic">
                      &ldquo;{reflection}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Box 4: Emotion Probability Breakdown and Category Footnote */}
            <section className="col-span-12 lg:col-span-5 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between gap-4 min-h-[320px]">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Linguistic Parameter Weights</h3>
                  <button 
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-[11px] font-bold text-violet-600 hover:text-violet-800 transition-colors"
                  >
                    {showDetails ? "Collapse Details" : "Show Full Distribution"}
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 leading-normal mb-4">
                  These weights denote other potential sentiment signals active in your typed sequence of text.
                </p>

                {/* Always show top 3 emotions, expand to all 8 on showDetails */}
                <div className="space-y-3.5">
                  {(Object.keys(result.emotionBreakdown) as EmotionLabel[])
                    .sort((a, b) => (result.emotionBreakdown[b] || 0) - (result.emotionBreakdown[a] || 0))
                    .slice(0, showDetails ? 8 : 3)
                    .map((label) => {
                      const value = result.emotionBreakdown[label] || 0;
                      const meta = EMOTIONS_META[label];
                      return (
                        <div key={label} className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-sans font-bold">
                            <span className="capitalize text-gray-700 flex items-center gap-1.5">
                              <span className={`w-2.5 h-2.5 rounded-full ${meta.bannerColor}`}></span>
                              {meta.name}
                            </span>
                            <span className="text-gray-500 font-mono text-[11px]">{value}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${meta.bannerColor} transition-all duration-500`}
                              style={{ width: `${value}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Mini stickers showing references */}
              <div className="grid grid-cols-4 gap-2 border-t border-gray-100 pt-4 mt-auto">
                {(Object.keys(EMOTIONS_META) as EmotionLabel[]).slice(0, 4).map((label) => {
                  const meta = EMOTIONS_META[label];
                  return (
                    <div
                      key={label}
                      className={`${meta.bgColor} border ${meta.borderColor} rounded-xl p-1.5 text-center flex flex-col items-center justify-center`}
                    >
                      <span className={`w-2 h-2 rounded-full ${meta.bannerColor} mb-0.5`}></span>
                      <span className="text-[8px] font-bold uppercase text-gray-500 font-sans tracking-wide">
                        {meta.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        )}

      </div>
    </div>
  );
};
