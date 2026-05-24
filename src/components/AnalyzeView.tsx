import React, { useState } from "react";
import { AnalysisResult, EmotionLabel, HistoryEntry } from "../types";
import { EMOTIONS_META } from "../utils/emotionMeta";
import { EmotionIcon } from "./EmotionIcon";
import { Send, AlertTriangle, Heart, Sparkles, PenLine, Shield, Info } from "lucide-react";

export const AnalyzeView: React.FC = () => {
  const [text, setText]                         = useState("");
  const [loading, setLoading]                   = useState(false);
  const [error, setError]                       = useState<string | null>(null);
  const [result, setResult]                     = useState<AnalysisResult | null>(null);
  const [showDetails, setShowDetails]           = useState(false);
  const [reflection, setReflection]             = useState("");
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  const maxChars = 1000;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value.slice(0, maxChars));
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) { setError("Please write or paste some text first."); return; }
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
      localStorage.setItem("mindcheck_history", JSON.stringify(list.slice(-100)));
    } catch (e) {
      console.error("Local storage save error:", e);
    }
  };

  return (
    <div className="py-8 md:py-12" id="analyze-view-container">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-sans text-5xl font-extrabold tracking-tight text-gray-900">
            Emotional Tone & Sentiment Analyzer
          </h2>
          <p className="mt-3 font-sans text-base text-gray-500">
            Write or paste a journal entry, message, or thought to discover the primary emotional sentiment and confidence level.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/20 p-8 text-center flex flex-col items-center animate-pulse mb-8" id="analysis-loader">
            <Sparkles className="h-8 w-8 text-violet-500 animate-spin mb-3" />
            <p className="font-sans text-sm font-bold text-violet-700">Running semantic classifier...</p>
            <p className="font-sans text-xs text-violet-500 mt-1">Sieving text elements against primary sentiment taxonomy indicators.</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 flex items-start space-x-3 text-red-800 shadow-sm mb-8" id="analysis-error">
            <AlertTriangle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
            <div className="text-xs font-sans">
              <p className="font-bold">Analysis Terminated</p>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Pre-analysis: centered input */}
        {!result && !loading && (
          <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm max-w-2xl mx-auto">
            <form onSubmit={handleAnalyze} className="space-y-4">
              <label className="flex items-center gap-2 font-sans text-xs font-bold text-gray-400 uppercase tracking-wider">
                <PenLine className="w-3.5 h-3.5" />
                Your Written Words
              </label>
              <textarea
                id="journal-textarea"
                rows={6}
                value={text}
                onChange={handleTextChange}
                placeholder="Write or paste a journal entry, message, or thought here..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-4 font-sans text-sm outline-none placeholder:text-gray-400 focus:border-violet-500 focus:bg-white transition-all resize-none shadow-inner"
              />
              <div className="flex justify-between items-center text-[11px] font-sans text-gray-400">
                <span>All analysis is private, processed locally, and completely customizable.</span>
                <span className={text.length >= maxChars - 50 ? "text-amber-600 font-bold" : ""}>
                  {text.length}/{maxChars} characters
                </span>
              </div>
              <button
                type="submit"
                disabled={loading || !text.trim()}
                id="btn-analyze-submit"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 px-6 py-4 font-sans text-sm font-semibold text-white shadow-lg shadow-violet-200 transition-all disabled:opacity-40 cursor-pointer"
              >
                <span>Analyze Emotional Sentiment</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        {/* Post-analysis layout */}
        {result && (
          <div className="space-y-6 animate-fade-in" id="analysis-result-box">

            {/* Row 1: Input (left) + Primary Sentiment (right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Left: Written Words input */}
              <section className="lg:col-span-5 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col gap-4">
                <label className="flex items-center gap-2 font-sans text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <PenLine className="w-3.5 h-3.5" />
                  Your Written Words
                </label>
                <form onSubmit={handleAnalyze} className="flex flex-col flex-1 gap-4">
                  <textarea
                    rows={9}
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Write or paste a journal entry, message, or thought here..."
                    className="flex-1 w-full rounded-xl border border-gray-200 bg-gray-50/50 p-4 font-sans text-sm outline-none placeholder:text-gray-400 focus:border-violet-500 focus:bg-white transition-all resize-none shadow-inner"
                  />
                  <div className="flex justify-between items-center text-[11px] font-sans text-gray-400">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      All analysis is private, processed locally, and completely customizable.
                    </span>
                    <span className={text.length >= maxChars - 50 ? "text-amber-600 font-bold" : ""}>
                      {text.length}/{maxChars} characters
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !text.trim()}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 px-6 py-4 font-sans text-sm font-semibold text-white shadow-lg shadow-violet-200 transition-all disabled:opacity-40 cursor-pointer"
                  >
                    <span>Analyze Emotional Sentiment</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </section>

              {/* Right: Primary Sentiment + Confidence + Weights */}
              <section className="lg:col-span-7 bg-[#EDE9FE] rounded-[2rem] p-8 shadow-sm border border-white flex flex-col gap-6">

                {/* Section header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-600" />
                    <h3 className="text-xs font-bold text-violet-700 uppercase tracking-wider">Primary Sentiment</h3>
                  </div>
                  <span className="font-mono text-xs font-bold bg-white text-violet-700 px-2.5 py-1 rounded-lg border border-violet-100">
                    Linguistic Code: {result.dominantEmotion}
                  </span>
                </div>

                {/* Giant emotion display */}
                <div className="flex items-center gap-6">
                  <div className="w-28 h-28 rounded-3xl bg-white flex items-center justify-center shadow-md border border-violet-100 shrink-0">
                    <EmotionIcon emotion={result.dominantEmotion} className="w-20 h-20" />
                  </div>
                  <div>
                    <h4 className="font-sans font-black tracking-tight text-violet-950 capitalize leading-none"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
                      {result.dominantEmotion}
                    </h4>
                    <p className="text-sm text-violet-700/80 mt-2 font-medium font-sans">
                      Dominant category detected in statement.
                    </p>
                  </div>
                </div>

                {/* Confidence */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-violet-700 uppercase tracking-widest flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" /> Model Confidence
                    </span>
                    <span className="text-3xl font-black text-violet-950 font-mono">{result.confidence}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-600 rounded-full transition-all duration-700"
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-violet-700/70 leading-relaxed">
                    High confidence indicates a strong emotional signal of {result.dominantEmotion} in your text.
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-violet-200/50" />

                {/* Weights */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold text-violet-800 uppercase tracking-widest">Linguistic Parameter Weights</h3>
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="text-[11px] font-bold text-violet-600 hover:text-violet-800 transition-colors cursor-pointer"
                    >
                      {showDetails ? "Collapse details" : "View full distribution"}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(Object.keys(result.emotionBreakdown) as EmotionLabel[])
                      .sort((a, b) => (result.emotionBreakdown[b] || 0) - (result.emotionBreakdown[a] || 0))
                      .slice(0, showDetails ? 8 : 3)
                      .map((label) => {
                        const value = result.emotionBreakdown[label] || 0;
                        const m = EMOTIONS_META[label];
                        return (
                          <div key={label} className="space-y-1">
                            <div className="flex justify-between items-center text-xs font-bold">
                              <span className="capitalize text-violet-900 flex items-center gap-2">
                                <EmotionIcon emotion={label} className="w-5 h-5" />
                                {m.name}
                              </span>
                              <span className="text-violet-700 font-mono">{value}%</span>
                            </div>
                            <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${m.bannerColor} rounded-full transition-all duration-500`}
                                style={{ width: `${value}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <p className="text-[10px] text-violet-600/60 mt-3">
                    Scores represent the relative weight of each emotion detected.
                  </p>
                </div>

              </section>
            </div>

            {/* Row 2: Reflection (full width) */}
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 space-y-6">

              {/* Reflection prompt */}
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Reflection</span>
                  <h3 className="font-sans text-2xl font-bold text-gray-900 leading-snug">
                    {result.reflectionPrompt}
                  </h3>
                  <p className="font-sans text-sm text-gray-400">
                    You don&apos;t have to find a silver lining — just notice what&apos;s there.
                  </p>
                </div>
                <Sparkles className="w-5 h-5 text-violet-400 shrink-0 ml-4 mt-1" />
              </div>

              {/* Your Reflection input */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Your Reflection</span>

                {!reflectionSubmitted ? (
                  <>
                    <textarea
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="Write as if you're talking to someone you trust — there's no wrong answer here..."
                      rows={4}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/50 p-4 font-sans text-sm outline-none focus:border-violet-400 focus:bg-white placeholder:text-gray-400 transition-all resize-none shadow-sm"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" />
                        Private to you
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setReflectionSubmitted(true);
                          if (result) {
                            try {
                              const raw = localStorage.getItem("mindcheck_reflections");
                              const list = raw ? JSON.parse(raw) : [];
                              list.push({
                                id: `r-${Date.now()}`,
                                text: reflection.trim(),
                                emotion: result.dominantEmotion,
                                confidence: result.confidence,
                                timestamp: new Date().toISOString(),
                              });
                              localStorage.setItem("mindcheck_reflections", JSON.stringify(list.slice(-50)));
                            } catch (_) {}
                          }
                        }}
                        disabled={!reflection.trim()}
                        className="flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-5 py-2.5 font-sans text-sm font-semibold text-white shadow-sm transition-colors disabled:opacity-40 cursor-pointer"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Post reflection
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
                    <p className="font-sans text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <Heart className="h-4 w-4 text-emerald-600" />
                      Reflection preserved.
                    </p>
                    <p className="font-sans text-xs text-emerald-700 leading-relaxed italic">
                      &ldquo;{reflection}&rdquo;
                    </p>
                  </div>
                )}
              </div>

            </section>
          </div>
        )}

      </div>
    </div>
  );
};
