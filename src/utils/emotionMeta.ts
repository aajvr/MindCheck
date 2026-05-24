import { EmotionLabel, EmotionMeta } from "../types";

export const EMOTIONS_META: Record<EmotionLabel, EmotionMeta> = {
  sadness: {
    label: "sadness",
    name: "Sadness",
    colorName: "blue",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    bannerColor: "bg-blue-500",
    gradient: "from-blue-500/10 to-blue-500/20",
    badgeColor: "bg-blue-100/80 text-blue-700 border-blue-200",
    borderColor: "border-blue-200",
    description: "Low mood, loneliness, emotional heaviness",
    meaning: "Reflects low mood, emotional weariness, or a feeling of loss or empty spaces.",
    example: "I feel heavy today and everything takes so much energy.",
    signalType: "Low mood / emotional heaviness",
  },
  remorse: {
    label: "remorse",
    name: "Remorse",
    colorName: "violet",
    textColor: "text-violet-600",
    bgColor: "bg-violet-50",
    bannerColor: "bg-violet-500",
    gradient: "from-violet-500/10 to-violet-500/20",
    badgeColor: "bg-violet-100/80 text-violet-700 border-violet-200",
    borderColor: "border-violet-200",
    description: "Guilt, regret, self-blame",
    meaning: "Relates to guilt, regret, or looking back wishfully at previous decisions with self-blame.",
    example: "I handle things so poorly; I wish I could do things differently.",
    signalType: "Guilt / regret / self-blame",
  },
  disapproval: {
    label: "disapproval",
    name: "Disapproval",
    colorName: "indigo",
    textColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    bannerColor: "bg-indigo-500",
    gradient: "from-indigo-500/10 to-indigo-500/20",
    badgeColor: "bg-indigo-100/80 text-indigo-700 border-indigo-200",
    borderColor: "border-indigo-200",
    description: "Negative judgment, self-criticism",
    meaning: "Tends to reflect severe self-dissatisfaction or disappointment with your own behaviors or choices.",
    example: "I am disappointed in myself for not getting anything done.",
    signalType: "Negative self-evaluation",
  },
  fear: {
    label: "fear",
    name: "Fear",
    colorName: "amber",
    textColor: "text-amber-600",
    bgColor: "bg-amber-50",
    bannerColor: "bg-amber-500",
    gradient: "from-amber-500/10 to-amber-500/20",
    badgeColor: "bg-amber-100/80 text-amber-700 border-amber-200",
    borderColor: "border-amber-200",
    description: "Worry, uncertainty, anxious vibes",
    meaning: "Brings up vulnerability, anticipation of difficulty, nervous strain, or overthinking situations.",
    example: "I am scared that things will keep getting harder and I can't cope.",
    signalType: "Worry / uncertainty",
  },
  anger: {
    label: "anger",
    name: "Anger",
    colorName: "red",
    textColor: "text-red-600",
    bgColor: "bg-red-50",
    bannerColor: "bg-red-500",
    gradient: "from-red-500/10 to-red-500/20",
    badgeColor: "bg-red-100/80 text-red-700 border-red-200",
    borderColor: "border-red-200",
    description: "Frustration, emotional tension, irritation",
    meaning: "Frustration, intense disappointment, or defense responses towards events that block your contentment.",
    example: "I'm so frustrated with this loop and tired thereof.",
    signalType: "Frustration / emotional tension",
  },
  disgust: {
    label: "disgust",
    name: "Disgust",
    colorName: "green",
    textColor: "text-green-600",
    bgColor: "bg-green-50",
    bannerColor: "bg-green-500",
    gradient: "from-green-500/10 to-green-500/20",
    badgeColor: "bg-green-100/80 text-green-700 border-green-200",
    borderColor: "border-green-200",
    description: "Rejection, discomfort, strong dislike",
    meaning: "An expression of strong aversion, weariness, or rejection of certain thoughts or internal feelings.",
    example: "I feel sick thinking about having to face that situation again.",
    signalType: "Rejection / discomfort",
  },
  joy: {
    label: "joy",
    name: "Joy",
    colorName: "yellow",
    textColor: "text-amber-500", // Yellow-orange for great contrast on white
    bgColor: "bg-yellow-50",
    bannerColor: "bg-yellow-500",
    gradient: "from-yellow-500/10 to-yellow-500/20",
    badgeColor: "bg-yellow-100/80 text-amber-800 border-yellow-200",
    borderColor: "border-yellow-200",
    description: "Positive contrast emotion, feeling okay",
    meaning: "Indicates safe emotional contrast, lightheartedness, relief, or a sense of peace.",
    example: "I had a moment of pure calm today and it felt wonderful.",
    signalType: "Positive emotional contrast",
  },
  surprise: {
    label: "surprise",
    name: "Surprise",
    colorName: "pink",
    textColor: "text-pink-600",
    bgColor: "bg-pink-50",
    bannerColor: "bg-pink-500",
    gradient: "from-pink-500/10 to-pink-500/20",
    badgeColor: "bg-pink-100/80 text-pink-700 border-pink-200",
    borderColor: "border-pink-200",
    description: "Sudden unexpected emotional reaction",
    meaning: "A sudden realization or unexpected twist in feeling that shakes up previous patterns.",
    example: "I didn't expect that small kindness to move me so deeply.",
    signalType: "Sudden emotional reaction",
  },
};

export const GENTLE_STEPS: Record<EmotionLabel, { title: string; prompt: string; actions: string[] }> = {
  sadness: {
    title: "Honoring Sadness",
    prompt: "Sadness is a completely natural response to heavy loads. It signals that you may need rest or a gentle path forward.",
    actions: [
      "Try writing down one thing that made today feel heavy, and then list one simple thing that felt slightly manageable.",
      "Engage in passive rest: wrap yourself in a warm blanket, listen to calm sounds, or sip warm tea.",
      "Acknowledge that feeling weary is a temporary season, and there is absolutely no rush to snap out of it."
    ]
  },
  remorse: {
    title: "Softening Regret",
    prompt: "Remorse often carries a self-critical voice of 'what if'. Finding gentle self-compassion helps loosen this grip.",
    actions: [
      "Write out what happened, and then write down what you would say to an dearest friend who finds themselves in the exact stance.",
      "Remind yourself that you made the choices you did with the tools and emotional clarity you possessed in that moment.",
      "Differentiate between things you can amend now and things you must leave behind in the past."
    ]
  },
  disapproval: {
    title: "Unpacking Self-Judgment",
    prompt: "Disapproval represents a harsh internal critic. Shifting focus from blame to understanding builds self-respect.",
    actions: [
      "Identify whether this negative assessment is directed safely at your entire identity, or simply a temporary circumstance.",
      "Challenge the thought: Is there factual evidence to support this disapproval, or are you holding yourself to impossible standards?",
      "Affirm that your human worth does not fluctuate based on daily productivity, errors, or temporary moods."
    ]
  },
  fear: {
    title: "Grounding Uncertain Thoughts",
    prompt: "Fear thrives in imagined tomorrows. Returning gently to the present moment helps steady the nervous system.",
    actions: [
      "Divide your thoughts into two clear lists: elements that are inside your control right now, and elements that are outside it.",
      "Practice a brief 5-4-3-2-1 grounding exercise: look around and note 5 things you can see, 4 you can touch, 3 touch hearing, etc.",
      "Tell yourself: 'Right now, in this exact second, I am in a safe space to breathe.'"
    ]
  },
  anger: {
    title: "Decompressing Tension",
    prompt: "Frustration points to crossed boundaries or blocked needs. Channeling it gently protects your mental well-being.",
    actions: [
      "Take a few physical steps: stretch your arms high, release the clenching in your jaw, or take a short brisk walk.",
      "Express the frustration on a scrap piece of paper with scribbles or extreme drafts, then shred it to signal release.",
      "Identify the affected expectation or boundary that triggered this response. How can we express that need gently later?"
    ]
  },
  disgust: {
    title: "Exploring Discomfort",
    prompt: "Aversion or disgust points to an internal disharmony. Restoring peace starts with self-care.",
    actions: [
      "Acknowledge the physical sensation of discomfort without trying to force yourself to feel positive right away.",
      "List the exact trigger of this feeling to separate the external event from your internal worth.",
      "Reset your immediate environment: change your shirt, step outside into fresh air, or wash your face to symbolize a fresh start."
    ]
  },
  joy: {
    title: "Amplifying Peaceful Calm",
    prompt: "Moments of joy or relief are anchors of resilience. Capturing them helps support you in heavier days.",
    actions: [
      "Write down the precise details of what made this moment feel okay: the smells, colors, sounds, or thoughts.",
      "Breathe deeply to let the physical warmth of this feeling expand inside your chest as a reservoir.",
      "Share a tiny bit of this light: send a quick pleasant thought to someone or write down your gratitude."
    ]
  },
  surprise: {
    title: "Embracing the Unexpected",
    prompt: "Surprise breaks the routine. It is a portal to wonder, offering new perspectives on stale habits.",
    actions: [
      "Ponder on how the unpredictable nature of life can bring both challenges and beautiful, unexpected kindnesses.",
      "Focus on the curious aspect of the feeling: what does this tell you about things you may have put out of mind lately?",
      "Accept that not everything needs to be predicted or controlled to find meaningful moments."
    ]
  }
};
