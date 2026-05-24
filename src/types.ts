export type EmotionLabel =
  | "sadness"
  | "remorse"
  | "disapproval"
  | "fear"
  | "anger"
  | "disgust"
  | "joy"
  | "surprise";

export interface EmotionBreakdown {
  sadness: number;
  remorse: number;
  disapproval: number;
  fear: number;
  anger: number;
  disgust: number;
  joy: number;
  surprise: number;
}

export interface AnalysisResult {
  dominantEmotion: EmotionLabel;
  confidence: number;
  emotionBreakdown: EmotionBreakdown;
  signalType: string;
  signalLevel: "Low" | "Moderate" | "High";
  explanation: string;
  reflectionPrompt: string;
}

export interface HistoryEntry {
  id: string;
  text: string;
  result: AnalysisResult;
  timestamp: string;
}

export interface EmotionMeta {
  label: EmotionLabel;
  name: string;
  colorName: string; // e.g. blue, purple
  textColor: string; // Tailwind class
  bgColor: string;   // Tailwind class
  bannerColor: string; // Tailwind class for guide pages
  gradient: string;   // Tailwind class
  badgeColor: string; // Tailwind class
  borderColor: string; // Tailwind class
  meaning: string;
  example: string;
  description: string;
  signalType: string;
}
