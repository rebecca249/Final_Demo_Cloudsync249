import React from 'react';
import { Home, Calendar as CalendarIcon, MessageSquare, Cloud, Settings } from 'lucide-react';
import { ContextualHelp } from './Shared';

const Sidebar = ({ activeTab, setActiveTab, collapsed }: any) => {
  const menuItems = [{ id: 'dashboard', icon: Home, label: 'Home' }, { id: 'calendar', icon: CalendarIcon, label: 'My Calendar' }, { id: 'messages', icon: MessageSquare, label: 'Messages' }];
  return (
    <div className={`bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-6 flex items-center gap-3"><div className="w-8 h-8 flex items-center justify-center text-purple-600"><Cloud size={32} strokeWidth={2.5} /></div>{!collapsed && <span className="font-bold text-xl text-gray-900">Cloud Sync</span>}</div>
      <div className="px-4 py-2"><nav className="space-y-1">{menuItems.map((item) => (<button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}><item.icon size={20} className={activeTab === item.id ? 'text-purple-600' : 'text-gray-400'} />{!collapsed && <span>{item.label}</span>}</button>))}</nav></div>
      
      {/* Bottom Menu - Contextual Help & Settings */}
      <div className="mt-auto p-4 border-t border-gray-100 space-y-2">
          <ContextualHelp context={activeTab} collapsed={collapsed} />
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            <Settings size={20} className="text-gray-400" />
            {!collapsed && <span>Settings</span>}
          </button>
      </div>
    </div>
  );
};

export default Sidebar;
