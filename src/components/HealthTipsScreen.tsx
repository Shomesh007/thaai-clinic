import React, { useState } from 'react';
import {
  Heart,
  BookOpen,
  Share2,
  Clock,
  ThumbsUp,
  Search,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { HeaderNav } from './HeaderNav';
import { HealthTip, TabType } from '../types';

interface HealthTipsScreenProps {
  tips: HealthTip[];
  setActiveTab: (tab: TabType) => void;
  onToggleLike: (id: string) => void;
}

export const HealthTipsScreen: React.FC<HealthTipsScreenProps> = ({
  tips,
  setActiveTab,
  onToggleLike,
}) => {
  const [selectedTip, setSelectedTip] = useState<HealthTip | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Wellness', 'Nutrition', 'Chronic Care', 'Child Health'];

  const filteredTips = tips.filter((t) => {
    const matchesCat = activeCategory === 'All' || t.category === activeCategory;
    const matchesQuery =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="flex-1 overflow-y-auto pb-28 bg-slate-50/50">
      <HeaderNav
        title="Health Tips & Advice"
        subtitle="Expert wellness insights from Dr. Sakthimaindan"
        onBack={() => setActiveTab('home')}
      />

      <div className="px-5 pt-4 space-y-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-pink-600 rounded-3xl p-5 text-white flex items-center justify-between shadow-md">
          <div className="space-y-1 max-w-[240px]">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1">
              DAILY WELLNESS
            </span>
            <h3 className="font-extrabold text-base leading-tight">
              Simple Habits for Family Health
            </h3>
            <p className="text-pink-100 text-xs">Doctor-verified wellness tips</p>
          </div>
          <Sparkles className="w-10 h-10 text-yellow-300 opacity-90" />
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search health tips, flu, diabetes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-2xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-pink-600 text-white shadow-2xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tips List */}
        <div className="space-y-4">
          {filteredTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white rounded-3xl p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-100">
                  {tip.category}
                </span>
                <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {tip.readTime}
                </span>
              </div>

              <h3
                onClick={() => setSelectedTip(tip)}
                className="font-extrabold text-gray-900 text-base leading-snug hover:text-pink-600 transition-colors cursor-pointer"
              >
                {tip.title}
              </h3>

              <p className="text-xs text-gray-600 font-normal leading-relaxed line-clamp-2">
                {tip.summary}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <button
                  onClick={() => onToggleLike(tip.id)}
                  className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                    tip.isLiked ? 'text-pink-600' : 'text-gray-400 hover:text-pink-600'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${tip.isLiked ? 'fill-pink-600' : ''}`} />
                  <span>{tip.likes} Helpful</span>
                </button>

                <button
                  onClick={() => setSelectedTip(tip)}
                  className="text-xs font-extrabold text-pink-600 flex items-center gap-0.5 hover:underline"
                >
                  Read Full Article <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reading Modal */}
      {selectedTip && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-[430px] w-full max-h-[85vh] overflow-y-auto p-6 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-start">
              <span className="text-xs font-extrabold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                {selectedTip.category} • {selectedTip.readTime}
              </span>
              <button
                onClick={() => setSelectedTip(null)}
                className="text-gray-400 hover:text-gray-600 text-lg p-1"
              >
                ✕
              </button>
            </div>

            <h2 className="text-xl font-extrabold text-gray-900 leading-snug">
              {selectedTip.title}
            </h2>

            <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-100 text-xs text-pink-900 font-semibold leading-relaxed">
              Dr. Sakthimaindan's Advice: {selectedTip.summary}
            </div>

            <div className="space-y-3 pt-2 text-xs text-gray-700 leading-relaxed font-medium">
              {selectedTip.content.map((p, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="flex-1">{p}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => onToggleLike(selectedTip.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all ${
                  selectedTip.isLiked
                    ? 'bg-pink-600 text-white border-pink-600'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                <ThumbsUp className="w-4 h-4" /> {selectedTip.likes} Helpful
              </button>

              <button
                onClick={() => setSelectedTip(null)}
                className="bg-slate-100 hover:bg-slate-200 text-gray-800 font-bold px-5 py-2 rounded-full text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
