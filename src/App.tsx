import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomeView } from "./components/HomeView";
import { AnalyzeView } from "./components/AnalyzeView";
import { GuideView } from "./components/GuideView";
import { ActionsView } from "./components/ActionsView";
import { AboutView } from "./components/AboutView";
import { Info } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");

  const renderActiveView = () => {
    switch (activeTab) {
      case "home":
        return <HomeView setActiveTab={setActiveTab} />;
      case "analyze":
        return <AnalyzeView />;
      case "guide":
        return <GuideView />;
      case "steps":
        return <ActionsView />;
      case "about":
        return <AboutView />;
      default:
        return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/50">
      {/* Sticky Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Primary Tab Content Area */}
      <main className="flex-grow">
        <div className="animate-fade-in mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {renderActiveView()}
        </div>
      </main>

      {/* Footer Banner */}
      <footer className="border-t border-gray-100 bg-white py-8 text-center" id="applet-footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-xs text-gray-400 font-sans">
          
          <div>
            <p>&copy; 2026 CloudNine MindCheck Prototype. Designed carefully for research and screening.</p>
          </div>

          <div className="flex items-center space-x-1 hover:text-gray-600 transition-colors">
            <Info className="h-3.5 w-3.5" />
            <button onClick={() => setActiveTab("about")} className="underline cursor-pointer">
              Research Disclaimer
            </button>
          </div>

        </div>
      </footer>
    </div>
  );
}
