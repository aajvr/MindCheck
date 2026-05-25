import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

function analyzeTextWithCustomModel(text: string) {
  const normalized = text.toLowerCase();

  const lexicons: Record<string, string[]> = {
    sadness: ["sad", "unhappy", "cry", "lonely", "heavy", "grief", "sorrow", "empty", "depressed", "tear", "pain", "hurt", "miserable", "heartbroken", "down", "gloomy"],
    remorse: ["sorry", "apologize", "regret", "blame myself", "guilt", "should have", "could have", "my fault", "remorse", "mistake", "forgive", "ashamed"],
    disapproval: ["disapprove", "wrong", "failure", "hate myself", "critic", "worthless", "not good enough", "useless", "disappointed", "loser", "hate my", "bad person"],
    fear: ["afraid", "scared", "fear", "anxious", "worry", "panic", "terrified", "future", "nervous", "uneasy", "frightened", "dread"],
    anger: ["angry", "mad", "hate", "furious", "annoyed", "pissed", "frustrated", "irritated", "rage", "offended", "resent", "envy"],
    disgust: ["disgust", "gross", "sick", "repulsed", "awful", "nasty", "revolting", "dislike"],
    joy: ["happy", "joy", "glad", "excited", "good", "wonderful", "peace", "love", "smile", "great", "content", "blessed", "hopeful", "calm", "safe"],
    surprise: ["surprise", "shock", "unexpected", "sudden", "amazed", "wow", "accident", "startled", "astounded"]
  };

  const matches: Record<string, number> = {
    sadness: 0, remorse: 0, disapproval: 0, fear: 0,
    anger: 0, disgust: 0, joy: 0, surprise: 0
  };

  let totalMatches = 0;
  for (const [emotion, words] of Object.entries(lexicons)) {
    for (const word of words) {
      if (normalized.includes(word)) {
        matches[emotion] += 15;
        totalMatches += 15;
      }
    }
  }

  const baseWeights: Record<string, number> = {
    sadness: 4,
    remorse: 3,
    disapproval: 3,
    fear: 3,
    anger: 3,
    disgust: 2,
    joy: 4,
    surprise: 2
  };

  const rawBreakdown: Record<string, number> = {};
  let rawSum = 0;
  for (const key of Object.keys(baseWeights)) {
    rawBreakdown[key] = baseWeights[key] + (matches[key] || 0);
    rawSum += rawBreakdown[key];
  }

  const emotionBreakdown = {
    sadness: 0, remorse: 0, disapproval: 0, fear: 0,
    anger: 0, disgust: 0, joy: 0, surprise: 0
  };

  let normalizedSum = 0;
  const keys = Object.keys(emotionBreakdown) as (keyof typeof emotionBreakdown)[];
  keys.forEach((key, idx) => {
    if (idx === keys.length - 1) {
      emotionBreakdown[key] = 100 - normalizedSum;
    } else {
      const val = Math.round((rawBreakdown[key] / rawSum) * 100);
      emotionBreakdown[key] = val;
      normalizedSum += val;
    }
  });

  let dominantEmotion: keyof typeof emotionBreakdown = "sadness";
  let highestScore = 0;
  for (const key of keys) {
    if (emotionBreakdown[key] > highestScore) {
      highestScore = emotionBreakdown[key];
      dominantEmotion = key;
    }
  }

  const confidence = Math.max(55, Math.min(94, Math.round(highestScore * 1.5 + (totalMatches > 0 ? 10 : 0))));

  const signalTypes: Record<string, string> = {
    sadness: "Low Mood / Emotional Heaviness",
    remorse: "Guilt / Regret / Self-Blame",
    disapproval: "Negative Self-Evaluation",
    fear: "Worry / Anxiety",
    anger: "Frustration / Tension",
    disgust: "Aversion / Strong Dislike",
    joy: "Positive Emotion Contrast",
    surprise: "Sudden Emotional Shift"
  };

  const negativeSum = emotionBreakdown.sadness + emotionBreakdown.remorse + emotionBreakdown.disapproval + emotionBreakdown.fear + emotionBreakdown.anger + emotionBreakdown.disgust;
  let signalLevel: "Low" | "Moderate" | "High" = "Low";
  if (negativeSum >= 70) signalLevel = "High";
  else if (negativeSum >= 35) signalLevel = "Moderate";

  const explanations: Record<string, string> = {
    sadness: "The text bears the characteristics of sadness, grief, or emotional low energy. This reflection format highlights a quiet moment of vulnerability and emotional weight.",
    remorse: "There is an expression of self-blame, regrets, or sorrow over past occurrences. Written remorse often loops recursively if not met with tender care.",
    disapproval: "Labeled self-critical phrasing or disappointment is visible. Low feelings often project negative biases, directing harsher judgments toward our own self-worth.",
    fear: "Signals of nervousness, worry, or future anxiety are active. Written expressions of fear are the mind's biological warning signs coping with change.",
    anger: "Frustration, irritation, or emotional tension seems apparent here. Expressing frustration in letters serves as a safe container to release inner pressure.",
    disgust: "The wording highlights deep aversion or strong rejection. This category arises around situations that violate our safety or emotional borders.",
    joy: "An active registry of emotional balance, cheerfulness, or comfort is detected. Noting positive markers helps build psychological resilience.",
    surprise: "Indicators of sudden startle or unexpected shock are prominent. Sudden transitions request patience while adjusting to unanticipated life shifts."
  };

  const reflectionPrompts: Record<string, string> = {
    sadness: "When thinking about this heavy feeling, what is one tiny, gentle self-care action you can perform for yourself today?",
    remorse: "If a kind friend was carrying this exact regret, what words of understanding and forgiveness would you offer them?",
    disapproval: "Write down two small things about your journey or choices that you are proud of, countering this self-criticism.",
    fear: "Take a steady breath. What is one supportive, unchanging physical detail in your current room that is completely safe right now?",
    anger: "What underlying boundary, personal value, or emotional need is this irritation attempting to protect?",
    disgust: "How can you establish a healthy distance from the source of this emotional repulsion to preserve your energy?",
    joy: "What aspect of this warm, positive momentum can you carry forward into other routines of your day?",
    surprise: "Take a light pause. How can you extend extra patience to yourself as you finish digesting this unexpected event?"
  };

  return {
    dominantEmotion,
    confidence,
    emotionBreakdown,
    signalType: signalTypes[dominantEmotion] || "General Mental Mapping",
    signalLevel,
    explanation: explanations[dominantEmotion] || "General linguistic markers analyzed.",
    reflectionPrompt: reflectionPrompts[dominantEmotion] || "Take a moment to check in with yourself."
  };
}

app.post("/api/analyze", (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "Text entry is required for analysis." });
    return;
  }

  try {
    const result = analyzeTextWithCustomModel(text);
    res.json(result);
  } catch (error: any) {
    console.error("Analysis Error:", error);
    res.status(500).json({
      error: error.message || "An error occurred during emotion analysis."
    });
  }
});

const distPath = path.join(process.cwd(), "dist");
app.use(express.static(distPath));
app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`CloudNine MindCheck server running on http://0.0.0.0:${PORT}`);
});
