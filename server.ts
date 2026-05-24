import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Python inference microservice URL — override via INFERENCE_URL in .env
const INFERENCE_URL = process.env.INFERENCE_URL ?? "http://localhost:5001";

app.use(express.json());

// ---------------------------------------------------------------------------
// POST /api/analyze
// Proxies the request to the Python RoBERTa inference microservice and
// returns an AnalysisResult object matching the frontend's types.ts contract.
// ---------------------------------------------------------------------------
app.post("/api/analyze", async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "Text entry is required for analysis." });
    return;
  }

  if (text.trim().length < 3) {
    res.status(400).json({ error: "Please provide a longer text for meaningful analysis." });
    return;
  }

  try {
    const inferenceRes = await fetch(`${INFERENCE_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await inferenceRes.json() as Record<string, unknown>;

    if (!inferenceRes.ok) {
      const message = typeof data.error === "string"
        ? data.error
        : "Inference service returned an error.";
      res.status(502).json({ error: message });
      return;
    }

    res.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";

    // Help developers diagnose a missing / crashed inference service
    if (message.includes("ECONNREFUSED") || message.includes("fetch failed")) {
      res.status(503).json({
        error:
          "Inference service is not running. Start it with: " +
          "MODEL_DIR=./model python inference/model_server.py",
      });
      return;
    }

    console.error("Proxy error:", message);
    res.status(500).json({ error: message });
  }
});

// ---------------------------------------------------------------------------
// GET /api/health  — optional healthcheck that pings the inference service
// ---------------------------------------------------------------------------
app.get("/api/health", async (_req, res) => {
  try {
    const r = await fetch(`${INFERENCE_URL}/health`);
    const body = await r.json();
    res.json({ node: "ok", inference: body });
  } catch {
    res.status(503).json({ node: "ok", inference: "unreachable" });
  }
});

// ---------------------------------------------------------------------------
// Vite / static file serving
// ---------------------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CloudNine MindCheck server  → http://0.0.0.0:${PORT}`);
    console.log(`Inference service expected  → ${INFERENCE_URL}`);
  });
}

startServer();
