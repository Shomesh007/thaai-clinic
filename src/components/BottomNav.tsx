import React from 'react';
import { Home, Calendar, Briefcase, BookOpen, User } from 'lucide-react';
import { motion } from 'motion/react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'book-appointment' as TabType, label: 'Appointments', icon: Calendar },
    { id: 'services' as TabType, label: 'Services', icon: Briefcase, badge: true },
    { id: 'health-tips' as TabType, label: 'Health Tips', icon: BookOpen },
    { id: 'about-doctor' as TabType, label: 'About', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-gray-100 px-3 py-2 z-30 flex justify-around items-center shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          activeTab === tab.id ||
          (tab.id === 'home' && activeTab === 'welcome') ||
          (tab.id === 'book-appointment' && activeTab === 'appointments') ||
          (tab.id === 'services' && (activeTab === 'clinic-info' || activeTab === 'consult-now')) ||
          (tab.id === 'health-tips' && activeTab === 'health-records');

        return (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileTap={{ scale: 0.9 }}
            aria-current={isActive ? 'page' : undefined}
            className="flex flex-col items-center justify-center py-1 px-2 relative text-xs font-medium cursor-pointer"
          >
            {isActive && (
              <motion.span
                layoutId="bottom-nav-active"
                className="absolute -top-2 w-8 h-[3px] rounded-full bg-gradient-to-r from-pink-500 to-rose-600"
                transition={{ type: 'spring', stiffness: 500, damping: 36 }}
              />
            )}
            <motion.div
              className="relative"
              animate={{ y: isActive ? -1 : 0, scale: isActive ? 1.08 : 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            >
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive ? 'text-pink-600 stroke-[2.2]' : 'text-gray-400 stroke-[1.8]'
                }`}
              />
              {tab.badge && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-pink-500 border-2 border-white rounded-full" />
              )}
            </motion.div>
            <span
              className={`text-[11px] mt-1 font-medium transition-colors ${
                isActive ? 'text-pink-600 font-semibold' : 'text-gray-400'
              }`}
            >
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
};
