import React, { useState } from 'react';
import { AnimatePresence, motion, useDragControls } from 'motion/react';
import {
  Clock,
  ThumbsUp,
  Search,
  Sparkles,
  ChevronRight,
  X,
  Leaf,
  Apple,
  HeartPulse,
  Baby,
  Stethoscope,
} from 'lucide-react';
import { HeaderNav } from './HeaderNav';
import { HealthTip, TabType } from '../types';
import { EASE_OUT } from './ui/Motion';

interface HealthTipsScreenProps {
  tips: HealthTip[];
  setActiveTab: (tab: TabType) => void;
  onToggleLike: (id: string) => void;
}

const CATEGORY_STYLE: Record<HealthTip['category'], { icon: typeof Leaf; chip: string; bar: string }> = {
  Wellness: { icon: Leaf, chip: 'bg-emerald-50 text-emerald-700 border-emerald-100', bar: 'from-emerald-400 to-teal-500' },
  Nutrition: { icon: Apple, chip: 'bg-amber-50 text-amber-700 border-amber-100', bar: 'from-amber-400 to-orange-500' },
  'Chronic Care': { icon: HeartPulse, chip: 'bg-blue-50 text-blue-700 border-blue-100', bar: 'from-blue-400 to-indigo-500' },
  'Child Health': { icon: Baby, chip: 'bg-pink-50 text-pink-700 border-pink-100', bar: 'from-pink-400 to-rose-500' },
};

const LikeButton: React.FC<{ tip: HealthTip; onToggle: () => void; solid?: boolean }> = ({ tip, onToggle, solid }) => (
  <motion.button
    whileTap={{ scale: 0.85 }}
    onClick={onToggle}
    aria-pressed={!!tip.isLiked}
    className={`flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
      solid
        ? `px-4 py-2 rounded-full border ${tip.isLiked ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-gray-700 border-gray-200'}`
        : tip.isLiked
          ? 'text-pink-600'
          : 'text-gray-400 hover:text-pink-600'
    }`}
  >
    <motion.span
      key={tip.isLiked ? 'liked' : 'unliked'}
      initial={{ scale: 0.6, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 600, damping: 14 }}
      className="inline-flex"
    >
      <ThumbsUp className={`w-4 h-4 ${tip.isLiked && !solid ? 'fill-pink-600' : ''}`} />
    </motion.span>
    <span className="tabular-nums">{tip.likes}</span> Helpful
  </motion.button>
);

export const HealthTipsScreen: React.FC<HealthTipsScreenProps> = ({
  tips,
  setActiveTab,
  onToggleLike,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sheetDrag = useDragControls();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Wellness', 'Nutrition', 'Chronic Care', 'Child Health'];
  const selectedTip = tips.find((t) => t.id === selectedId) ?? null;

  const filteredTips = tips.filter((t) => {
    const matchesCat = activeCategory === 'All' || t.category === activeCategory;
    const q = searchQuery.toLowerCase();
    return matchesCat && (t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q));
  });

  return (
    <div className="flex-1 overflow-y-auto pb-28 bg-[#FAF5F7]">
      <HeaderNav
        title="Health Tips & Advice"
        subtitle="Expert wellness insights from Dr. Sakthimaindan"
        onBack={() => setActiveTab('home')}
      />

      <div className="px-4 pt-4 space-y-4">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="relative overflow-hidden bg-gradient-to-br from-[#FF2D75] via-[#E91E63] to-[#AD1457] rounded-3xl p-5 text-white shadow-xl shadow-pink-900/15"
        >
          <div className="absolute inset-0 bg-dots opacity-50" aria-hidden="true" />
          <div className="relative flex items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-extrabold tracking-[0.18em] bg-white/20 px-2.5 py-0.5 rounded-full inline-block mb-1">
                Daily wellness
              </span>
              <h3 className="font-extrabold text-lg leading-tight">Simple Habits for Family Health</h3>
              <p className="text-pink-100 text-xs font-medium flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5" /> Doctor-verified by Dr. Sakthimaindan
              </p>
            </div>
            <motion.div
              animate={{ rotate: [0, 12, -8, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5 }}
            >
              <Sparkles className="w-10 h-10 text-amber-200" />
            </motion.div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search health tips, flu, diabetes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search health tips"
            className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-2xs"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 text-gray-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Category Pills with sliding highlight */}
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar py-1 -mx-4 px-4" role="tablist">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  active ? 'text-white' : 'text-gray-600 bg-white border border-gray-200'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="tips-category-pill"
                    className="absolute inset-0 rounded-full bg-pink-600 shadow-md shadow-pink-200"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                  />
                )}
                <span className="relative">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Tips List */}
        <motion.div layout className="space-y-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredTips.map((tip, i) => {
              const style = CATEGORY_STYLE[tip.category];
              const Icon = style.icon;
              return (
                <motion.article
                  key={tip.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE_OUT, delay: i * 0.04 } }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  className="relative bg-white rounded-3xl p-4 pl-5 border border-gray-100 shadow-2xs overflow-hidden"
                >
                  <span className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-gradient-to-b ${style.bar}`} aria-hidden="true" />
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${style.chip}`}>
                      <Icon className="w-3 h-3" /> {tip.category}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {tip.readTime}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedId(tip.id)}
                    className="font-extrabold text-gray-900 text-[15px] leading-snug hover:text-pink-600 transition-colors cursor-pointer mt-2.5"
                  >
                    {tip.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mt-1">{tip.summary}</p>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
                    <LikeButton tip={tip} onToggle={() => onToggleLike(tip.id)} />
                    <motion.button
                      whileHover={{ x: 2 }}
                      onClick={() => setSelectedId(tip.id)}
                      className="text-xs font-extrabold text-pink-600 flex items-center gap-0.5 cursor-pointer"
                    >
                      Read article <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
          {filteredTips.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 text-xs text-gray-500 font-medium"
            >
              No tips match “{searchQuery}”. Try another word.
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Article Reading Bottom Sheet */}
      <AnimatePresence>
        {selectedTip && (
          <motion.div
            key="tip-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selectedTip.title}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: '100%' }}
              animate={{ y: 0, transition: { type: 'spring', stiffness: 380, damping: 38 } }}
              exit={{ y: '100%', transition: { duration: 0.22, ease: 'easeIn' } }}
              drag="y"
              dragListener={false}
              dragControls={sheetDrag}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 600) setSelectedId(null);
              }}
              className="bg-white rounded-t-[28px] sm:rounded-3xl max-w-[430px] w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div
                onPointerDown={(e) => sheetDrag.start(e)}
                className="sticky top-0 bg-white pt-3 pb-2 flex justify-center z-10 cursor-grab active:cursor-grabbing touch-none"
              >
                <span className="w-10 h-1.5 rounded-full bg-gray-200" aria-hidden="true" />
              </div>
              <div className="px-6 pb-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${CATEGORY_STYLE[selectedTip.category].chip}`}>
                    {selectedTip.category} • {selectedTip.readTime}
                  </span>
                  <button
                    onClick={() => setSelectedId(null)}
                    aria-label="Close article"
                    className="w-8 h-8 rounded-full bg-slate-100 text-gray-500 hover:text-gray-800 flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="text-xl font-extrabold text-gray-900 leading-snug">{selectedTip.title}</h2>

                <div className="p-3.5 bg-pink-50/70 rounded-2xl border border-pink-100 text-xs text-pink-900 font-semibold leading-relaxed">
                  Dr. Sakthimaindan's Advice: {selectedTip.summary}
                </div>

                <motion.ol
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { delayChildren: 0.15, staggerChildren: 0.07 } } }}
                  className="space-y-3 pt-1 text-xs text-gray-700 leading-relaxed font-medium"
                >
                  {selectedTip.content.map((p, idx) => (
                    <motion.li
                      key={idx}
                      variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                      className="flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-pink-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="flex-1">{p}</p>
                    </motion.li>
                  ))}
                </motion.ol>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <LikeButton tip={selectedTip} onToggle={() => onToggleLike(selectedTip.id)} solid />
                  <button
                    onClick={() => setSelectedId(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-gray-800 font-bold px-5 py-2 rounded-full text-xs cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
