import React from 'react';
import { Bell, CheckCheck, X, Calendar, Sparkles, Building } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsDrawerProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  notifications,
  onClose,
  onMarkAllAsRead,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end animate-in fade-in duration-200">
      <div className="bg-white max-w-[380px] w-full h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        <div className="p-5 bg-pink-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <h3 className="font-extrabold text-base">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-pink-700 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-pink-50 flex items-center justify-between border-b border-pink-100">
          <span className="text-xs font-bold text-pink-700">
            {notifications.filter((n) => !n.read).length} Unread Updates
          </span>
          <button
            onClick={onMarkAllAsRead}
            className="text-xs font-bold text-pink-600 hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all ${
                !n.read ? 'bg-pink-50/50 border-pink-100' : 'bg-white border-gray-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-pink-600 bg-pink-100/80 px-2 py-0.5 rounded-full">
                  {n.type}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">{n.time}</span>
              </div>
              <h4 className="font-extrabold text-gray-900 text-xs mt-1">{n.title}</h4>
              <p className="text-xs text-gray-600 mt-0.5 font-medium leading-relaxed">
                {n.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
