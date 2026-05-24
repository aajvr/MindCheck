import React, { useState, useEffect, useRef } from "react";
import { EmotionLabel } from "../types";
import { EMOTIONS_META } from "../utils/emotionMeta";
import { EmotionIcon } from "./EmotionIcon";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface WallReflection {
  id: string;
  text: string;
  emotion: EmotionLabel;
  confidence: number;
  timestamp: string;
}

interface Physics {
  x: number; y: number;
  vx: number; vy: number;
  w: number; h: number;
  pulse: number;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const SAFE_R = 190;

const DAILY_PROMPTS = [
  "What's one small thing that felt okay today, even slightly?",
  "What emotion has been visiting you most this week?",
  "Name one moment today where you were gentler with yourself.",
  "What does your heart need most right now?",
  "What is one thing you're choosing to let go of today?",
  "Where in your body do you feel today's emotion?",
  "What would you tell yourself from a year ago?",
];

// Light pastel bubble styles
const BUBBLE_STYLE: Record<string, { bg: string; border: string; textColor: string }> = {
  sadness:     { bg: "rgba(219,234,254,0.84)",  border: "rgba(147,197,253,0.80)",  textColor: "#1d4ed8" },
  remorse:     { bg: "rgba(237,233,254,0.84)",  border: "rgba(196,181,253,0.80)",  textColor: "#6d28d9" },
  disapproval: { bg: "rgba(224,231,255,0.84)",  border: "rgba(165,180,252,0.80)",  textColor: "#4338ca" },
  fear:        { bg: "rgba(254,243,199,0.84)",  border: "rgba(252,211,77,0.80)",   textColor: "#b45309" },
  anger:       { bg: "rgba(254,226,226,0.84)",  border: "rgba(252,165,165,0.80)",  textColor: "#b91c1c" },
  disgust:     { bg: "rgba(220,252,231,0.84)",  border: "rgba(134,239,172,0.80)",  textColor: "#15803d" },
  joy:         { bg: "rgba(254,249,195,0.84)",  border: "rgba(253,224,71,0.80)",   textColor: "#a16207" },
  surprise:    { bg: "rgba(252,231,243,0.84)",  border: "rgba(249,168,212,0.80)",  textColor: "#be185d" },
};

const SEED_REFLECTIONS: WallReflection[] = [
  { id: "s1",  text: "I just needed today to be quiet.",                               emotion: "sadness",     confidence: 72, timestamp: "" },
  { id: "s2",  text: "I talked to her finally. Something shifted.",                    emotion: "surprise",    confidence: 68, timestamp: "" },
  { id: "s3",  text: "Heavy, but I kept going anyway.",                                emotion: "remorse",     confidence: 81, timestamp: "" },
  { id: "s4",  text: "I smiled at a stranger and it helped more than I expected.",     emotion: "joy",         confidence: 89, timestamp: "" },
  { id: "s5",  text: "Still figuring it out. That's okay.",                            emotion: "fear",        confidence: 65, timestamp: "" },
  { id: "s6",  text: "My chest felt tight all morning but by evening it softened.",    emotion: "anger",       confidence: 74, timestamp: "" },
  { id: "s7",  text: "I let myself cry. First time in weeks.",                         emotion: "remorse",     confidence: 78, timestamp: "" },
  { id: "s8",  text: "Grateful, quietly.",                                             emotion: "joy",         confidence: 91, timestamp: "" },
  { id: "s9",  text: "Nothing happened today and that was okay.",                      emotion: "sadness",     confidence: 70, timestamp: "" },
  { id: "s10", text: "I didn't break. That matters.",                                  emotion: "fear",        confidence: 77, timestamp: "" },
  { id: "s11", text: "Lonely but not alone.",                                          emotion: "disapproval", confidence: 69, timestamp: "" },
  { id: "s12", text: "I kept going even when I didn't want to.",                       emotion: "disgust",     confidence: 63, timestamp: "" },
];

const SPARKLE_POSITIONS = [
  { left: "13%",  top: "10%"  }, { left: "77%",  top: "7%"   },
  { left: "6%",   top: "43%"  }, { left: "92%",  top: "31%"  },
  { left: "21%",  top: "80%"  }, { left: "67%",  top: "77%"  },
  { left: "43%",  top: "5%"   }, { left: "53%",  top: "90%"  },
  { left: "34%",  top: "17%"  }, { left: "84%",  top: "59%"  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function calcBubbleDims(text: string): { w: number; h: number } {
  const w = Math.min(290, Math.max(175, text.length * 5.4 + 72));
  const h = text.length > 42 ? 76 : 58;
  return { w, h };
}

function overlapsCenter(x: number, y: number, w: number, h: number, cx: number, cy: number): boolean {
  const closestX = Math.max(cx - SAFE_R, Math.min(cx + SAFE_R, x + w / 2));
  const closestY = Math.max(cy - SAFE_R, Math.min(cy + SAFE_R, y + h / 2));
  const dx = closestX - (x + w / 2);
  const dy = closestY - (y + h / 2);
  return dx * dx + dy * dy < (w * w * 0.16 + h * h * 0.25);
}

function loadReflections(): WallReflection[] {
  try {
    const raw = localStorage.getItem("mindcheck_reflections");
    const user: WallReflection[] = raw ? JSON.parse(raw) : [];
    return [...SEED_REFLECTIONS, ...user];
  } catch {
    return SEED_REFLECTIONS;
  }
}

// ── Component ──────────────────────────────────────────────────────────────────

export const ReflectionsWallView: React.FC = () => {
  const [popup, setPopup]         = useState<WallReflection | null>(null);
  const [reflections]             = useState<WallReflection[]>(loadReflections);

  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const elRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const physicsRef    = useRef<Physics[]>([]);
  const frameRef      = useRef(0);
  const rafRef        = useRef(0);

  const todayPrompt = DAILY_PROMPTS[new Date().getDay()];

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    const W  = container.clientWidth  || window.innerWidth;
    const H  = container.clientHeight || (window.innerHeight - 64);
    const CX = W / 2;
    const CY = H / 2;

    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // Initialise physics
    const physics: Physics[] = reflections.map((r) => {
      const { w, h } = calcBubbleDims(r.text);
      const margin = 24;
      let x = 0, y = 0, tries = 0;
      do {
        x = margin + Math.random() * (W - w - margin * 2);
        y = margin + Math.random() * (H - h - margin * 2);
        tries++;
      } while (overlapsCenter(x, y, w, h, CX, CY) && tries < 100);
      return {
        x, y,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        w, h,
        pulse: Math.random() * Math.PI * 2,
      };
    });
    physicsRef.current = physics;

    // Apply initial positions
    physics.forEach((p, i) => {
      const el = elRefs.current[i];
      if (!el) return;
      el.style.left     = p.x + "px";
      el.style.top      = p.y + "px";
      el.style.width    = p.w + "px";
      el.style.minHeight = p.h + "px";
      el.style.opacity  = "1";
    });

    // Canvas: soft orbs + concentric rings (light theme)
    function drawBg() {
      const t = frameRef.current * 0.003;
      ctx.clearRect(0, 0, W, H);

      const orbs = [
        { x: CX + Math.cos(t) * 110,            y: CY + Math.sin(t * 0.7) * 85,   r: 280, c: "rgba(167,139,250,0.09)" },
        { x: CX + Math.cos(t * 1.3 + 2) * 150,  y: CY + Math.sin(t * 0.9 + 1) * 110, r: 220, c: "rgba(139,92,246,0.06)" },
        { x: CX + Math.cos(t * 0.8 + 4) * 95,   y: CY + Math.sin(t * 1.2 + 3) * 130, r: 200, c: "rgba(196,181,253,0.08)" },
      ];
      orbs.forEach(({ x, y, r, c }) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, c);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.lineWidth = 0.7;
      for (let i = 0; i < 5; i++) {
        const r = 110 + i * 62 + Math.sin(t + i) * 7;
        ctx.strokeStyle = `rgba(139,92,246,${0.055 - i * 0.007})`;
        ctx.beginPath();
        ctx.arc(CX, CY, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function tick() {
      frameRef.current++;
      const ps = physicsRef.current;

      ps.forEach((s, i) => {
        const el = elRefs.current[i];
        if (!el) return;

        s.vx += (Math.random() - 0.5) * 0.009;
        s.vy += (Math.random() - 0.5) * 0.009;
        const spd = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        if (spd > 0.44) { s.vx *= 0.44 / spd; s.vy *= 0.44 / spd; }
        if (spd < 0.07) { s.vx *= 1.14; s.vy *= 1.14; }

        const nx = s.x + s.w / 2 - CX;
        const ny = s.y + s.h / 2 - CY;
        const dist = Math.sqrt(nx * nx + ny * ny);
        if (dist < SAFE_R + 28) {
          const push = (SAFE_R + 28 - dist) / (SAFE_R + 28);
          s.vx += (nx / dist) * push * 0.10;
          s.vy += (ny / dist) * push * 0.10;
        }

        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0)        { s.x = 0;       s.vx =  Math.abs(s.vx); }
        if (s.x + s.w > W)  { s.x = W - s.w; s.vx = -Math.abs(s.vx); }
        if (s.y < 0)        { s.y = 0;       s.vy =  Math.abs(s.vy); }
        if (s.y + s.h > H)  { s.y = H - s.h; s.vy = -Math.abs(s.vy); }

        s.pulse += 0.014;
        const pScale = 1 + Math.sin(s.pulse) * 0.013;
        const opacity = 0.80 + Math.sin(s.pulse * 0.65) * 0.14;

        el.style.left      = s.x + "px";
        el.style.top       = s.y + "px";
        el.style.transform = `scale(${pScale})`;
        el.style.opacity   = String(opacity);
      });

      if (frameRef.current % 2 === 0) drawBg();
      rafRef.current = requestAnimationFrame(tick);
    }

    drawBg();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reflections]);

  const popupMeta = popup ? EMOTIONS_META[popup.emotion] : null;

  return (
    <div
      id="wall-view-container"
      ref={containerRef}
      className="relative flex-1 overflow-hidden"
      style={{
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(160deg, #ffffff 0%, #ede8ff 28%, #dbd0ff 58%, #c8b8ff 100%)",
      }}
    >
      {/* Canvas — soft animated orbs + rings */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      {/* ── Cloud blobs ── */}
      {/* Bottom-left large */}
      <div style={{
        position: "absolute", bottom: "-90px", left: "-110px",
        width: "420px", height: "340px", borderRadius: "50%",
        background: "rgba(255,255,255,0.58)", filter: "blur(3px)",
        pointerEvents: "none", zIndex: 1,
      }} />
      {/* Bottom-left small */}
      <div style={{
        position: "absolute", bottom: "70px", left: "-40px",
        width: "240px", height: "190px", borderRadius: "50%",
        background: "rgba(255,255,255,0.44)", filter: "blur(2px)",
        pointerEvents: "none", zIndex: 1,
      }} />
      {/* Bottom-left mid */}
      <div style={{
        position: "absolute", bottom: "20px", left: "80px",
        width: "180px", height: "150px", borderRadius: "50%",
        background: "rgba(255,255,255,0.36)", filter: "blur(2px)",
        pointerEvents: "none", zIndex: 1,
      }} />
      {/* Bottom-right large */}
      <div style={{
        position: "absolute", bottom: "-100px", right: "-120px",
        width: "470px", height: "370px", borderRadius: "50%",
        background: "rgba(255,255,255,0.55)", filter: "blur(3px)",
        pointerEvents: "none", zIndex: 1,
      }} />
      {/* Bottom-right small */}
      <div style={{
        position: "absolute", bottom: "90px", right: "-30px",
        width: "260px", height: "210px", borderRadius: "50%",
        background: "rgba(255,255,255,0.42)", filter: "blur(2px)",
        pointerEvents: "none", zIndex: 1,
      }} />
      {/* Bottom-right mid */}
      <div style={{
        position: "absolute", bottom: "30px", right: "90px",
        width: "200px", height: "160px", borderRadius: "50%",
        background: "rgba(255,255,255,0.32)", filter: "blur(2px)",
        pointerEvents: "none", zIndex: 1,
      }} />
      {/* Top-right subtle */}
      <div style={{
        position: "absolute", top: "-60px", right: "-60px",
        width: "280px", height: "220px", borderRadius: "50%",
        background: "rgba(255,255,255,0.30)", filter: "blur(2px)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* ── Sparkle decorations ── */}
      {SPARKLE_POSITIONS.map((sp, i) => (
        <div
          key={i}
          style={{
            position: "absolute", left: sp.left, top: sp.top,
            color: "rgba(109,40,217,0.30)", fontSize: "14px",
            pointerEvents: "none", zIndex: 2, userSelect: "none",
          }}
        >
          ✦
        </div>
      ))}

      {/* ── Floating bubble cards — React-rendered, positions set via RAF ── */}
      {reflections.map((r, i) => {
        const style   = BUBBLE_STYLE[r.emotion] ?? BUBBLE_STYLE.sadness;
        const preview = r.text.length > 44 ? r.text.slice(0, 42) + "…" : r.text;
        return (
          <div
            key={r.id}
            ref={(el) => { elRefs.current[i] = el; }}
            onClick={() => setPopup(r)}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.boxShadow = `0 6px 32px ${style.border}`;
              el.style.zIndex    = "8";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.boxShadow = "0 2px 18px rgba(139,92,246,0.10)";
              el.style.zIndex    = "3";
            }}
            style={{
              position:        "absolute",
              background:      style.bg,
              border:          `1.5px solid ${style.border}`,
              borderRadius:    "22px",
              padding:         "11px 18px 11px 13px",
              display:         "flex",
              alignItems:      "center",
              gap:             "11px",
              cursor:          "pointer",
              backdropFilter:  "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow:       "0 2px 18px rgba(139,92,246,0.10)",
              opacity:         0,
              zIndex:          3,
              willChange:      "left, top, transform, opacity",
            }}
          >
            <EmotionIcon emotion={r.emotion} className="w-7 h-7 shrink-0" />
            <span style={{
              fontSize:   "13.5px",
              color:      style.textColor,
              lineHeight: 1.45,
              fontFamily: "inherit",
              fontWeight: 500,
            }}>
              {preview}
            </span>
          </div>
        );
      })}

      {/* ── Center prompt card ── */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", zIndex: 10,
      }}>
        <div style={{
          background:         "rgba(255,255,255,0.90)",
          border:             "1.5px solid rgba(196,181,253,0.55)",
          borderRadius:       "28px",
          padding:            "38px 48px",
          textAlign:          "center",
          maxWidth:           "420px",
          width:              "90%",
          backdropFilter:     "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:          "0 8px 48px rgba(109,40,217,0.13)",
        }}>
          <div style={{
            fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase",
            color: "rgba(109,40,217,0.65)", fontWeight: 700, marginBottom: "4px",
          }}>
            ✦ Today&apos;s Reflection
          </div>
          <div style={{
            width: "36px", height: "1.5px",
            background: "rgba(196,181,253,0.65)",
            margin: "10px auto 16px",
            borderRadius: "2px",
          }} />
          <div style={{
            fontSize: "21px", fontWeight: 800, color: "#2d1b69",
            lineHeight: 1.5, fontFamily: "inherit",
          }}>
            &ldquo;{todayPrompt}&rdquo;
          </div>
          <div style={{
            fontSize: "12.5px", color: "rgba(109,40,217,0.42)", marginTop: "16px", lineHeight: 1.5,
          }}>
            Post a reflection on the Analyze page to appear here.
          </div>
        </div>
      </div>

      {/* ── Reflection count ── */}
      <div style={{
        position: "absolute", bottom: "22px", right: "26px",
        fontSize: "12px", color: "rgba(109,40,217,0.50)",
        letterSpacing: "0.05em", zIndex: 10,
        display: "flex", alignItems: "center", gap: "6px",
        fontWeight: 600,
      }}>
        ✦ {reflections.length} reflections shared
      </div>

      {/* ── Popup overlay ── */}
      {popup && popupMeta && (
        <div
          style={{
            position: "absolute", inset: 0,
            background: "rgba(45,27,105,0.30)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 20,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setPopup(null); }}
        >
          <div style={{
            background:   "rgba(255,255,255,0.97)",
            borderRadius: "26px",
            padding:      "34px",
            maxWidth:     "380px",
            width:        "90%",
            position:     "relative",
            boxShadow:    "0 24px 64px rgba(45,27,105,0.18)",
          }}>
            {/* Close */}
            <button
              onClick={() => setPopup(null)}
              style={{
                position:   "absolute", top: "16px", right: "16px",
                background: "rgba(196,181,253,0.25)", border: "none",
                cursor:     "pointer", color: "rgba(109,40,217,0.75)",
                fontSize:   "20px", lineHeight: 1,
                padding:    "3px 10px", borderRadius: "8px",
                fontWeight: 700,
              }}
            >
              ×
            </button>

            {/* Emotion header */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
              <EmotionIcon emotion={popup.emotion} className="w-14 h-14 shrink-0" />
              <div>
                <div style={{
                  fontSize: "13px", letterSpacing: "0.10em", textTransform: "uppercase",
                  color: "#6d28d9", fontWeight: 800,
                }}>
                  {popupMeta.name}
                </div>
                <div style={{ fontSize: "12px", color: "rgba(109,40,217,0.50)", marginTop: "3px" }}>
                  {popup.confidence}% confidence
                </div>
              </div>
            </div>

            {/* Reflection text */}
            <p style={{
              fontSize: "18px", color: "#2d1b69", lineHeight: 1.75,
              fontFamily: "inherit", fontWeight: 500,
              borderTop: "1px solid rgba(196,181,253,0.35)",
              paddingTop: "18px",
            }}>
              &ldquo;{popup.text}&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
