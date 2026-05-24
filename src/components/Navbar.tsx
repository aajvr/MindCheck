import React from "react";
import { Cloud, HelpCircle } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "analyze", label: "Analyze" },
    { id: "guide", label: "Guide" },
    { id: "steps", label: "Gentle Steps" },
    { id: "about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div
          onClick={() => setActiveTab("home")}
          className="flex cursor-pointer items-center space-x-2 transition-opacity hover:opacity-90"
          id="nav-logo-btn"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-200">
            <Cloud className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-sans text-lg font-bold tracking-tight text-gray-900 leading-none">
              CloudNine
            </h1>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-violet-600">
              MindCheck
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6" id="desktop-nav-menu">
          <nav className="flex items-center space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-4 py-2 font-sans text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="bg-white px-3 py-1.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">System Ready</span>
          </div>
        </div>

        {/* Small/Mobile Layout Nav triggers */}
        <div className="flex md:hidden items-center" id="mobile-nav-indicator">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 font-sans text-sm font-medium text-gray-700 shadow-sm focus:border-violet-500 focus:outline-none"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};
