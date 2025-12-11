import React from 'react';
import { PieChart, CheckSquare, Video, Folders, MessageSquare, Hash, Search, ChevronRight, Pin, Plus, Smile, Send, MoreHorizontal, Layout, ArrowLeft } from 'lucide-react';
import { Project, User } from '../../types';
import { THEME_STYLES } from '../../data';
import { MemberAvatar, CloudyLogo } from '../Shared';

// 1. Navigation Sidebar
export const ProjectSidebar = ({ project, activeTab, setActiveTab, onBack }: { project: Project, activeTab: string, setActiveTab: (tab: string) => void, onBack: () => void }) => {
    const theme = THEME_STYLES[project.theme || 'green'];
    const navItems = [{ id: 'overview', label: 'Overview', icon: PieChart }, { id: 'tasks', label: 'Tasks', icon: CheckSquare }, { id: 'meetings', label: 'Meetings', icon: Video }, { id: 'files', label: 'Files', icon: Folders }];
    return (
        <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
            <div className="p-6">
                <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 mb-6 transition-colors group">
                    <div className="p-1.5 rounded-md group-hover:bg-gray-200 transition-colors"><ArrowLeft size={16} /></div>
                    Back to Dashboard
                </button>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-3 shadow-sm ${theme.solid}`}>
                    <span className="text-xl font-bold">{project.name.charAt(0)}</span>
                </div>
                <h2 className="font-bold text-gray-900 text-lg leading-tight mb-1">{project.name}</h2>
                <div className="flex items-center gap-2 text-xs text-gray-500"><span className="w-2 h-2 rounded-full bg-green-500"></span>{project.members.length} members • Active</div>
            </div>
            <nav className="flex-1 px-3 space-y-1">{navItems.map(item => (<button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? `bg-white text-gray-900 shadow-sm border border-gray-100` : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}><item.icon size={18} className={activeTab === item.id ? theme.text : 'text-gray-400'} />{item.label}</button>))}</nav>
            <div className="p-4 border-t border-gray-200"><h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Team</h3><div className="space-y-3">{project.members.map((m: User) => (<div key={m.id} className="flex items-center gap-3"><img src={m.avatar} className="w-8 h-8 rounded-full bg-white border border-gray-200" alt={m.name} /><span className="text-sm text-gray-600 truncate">{m.name}</span>{m.role === 'Leader' && <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 rounded">Lead</span>}</div>))}</div></div>
        </div>
    );
};

// 2. Chat Sidebar
export const ProjectChatSidebar = ({ project, currentUser, isOpen, onToggle }: { project: Project, currentUser: User, isOpen: boolean, onToggle: () => void }) => {
    const theme = THEME_STYLES[project.theme || 'green'];
    return (
        <div className={`border-l border-gray-200 bg-white flex flex-col transition-all duration-300 ease-in-out h-full ${isOpen ? 'w-80' : 'w-14'}`}>
            {!isOpen && (
                <div className="flex-1 flex flex-col items-center pt-6 gap-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={onToggle}>
                    <button className={`p-2 rounded-lg bg-gray-100 text-gray-500 hover:${theme.text} transition-colors`}><MessageSquare size={20} /></button>
                    <div className="flex flex-col items-center gap-1"><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>CHAT</span><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div></div>
                </div>
            )}
            <div className={`flex flex-col h-full ${!isOpen ? 'hidden' : 'flex'}`}>
                <div className="h-16 px-4 border-b border-gray-100 flex items-center justify-between shrink-0"><div><div className="font-bold text-gray-900 flex items-center gap-1"><Hash size={16} className="text-gray-400" /> general</div><div className="text-xs text-gray-400">Team announcements</div></div><div className="flex items-center gap-1"><Search size={18} className="text-gray-400 hover:text-gray-600 cursor-pointer mr-2" /><button onClick={onToggle} className="p-1 text-gray-400 hover:bg-gray-100 rounded transition-colors"><ChevronRight size={18}/></button></div></div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/30">
                    <div className={`${theme.light} border ${theme.border} rounded-xl p-4`}><div className="flex items-start gap-3 mb-2"><Pin size={16} className={theme.text} /><div><div className={`text-xs font-bold ${theme.text} mb-0.5`}>Instructor Announcement</div><p className="text-xs text-gray-600 leading-relaxed">Empathy Maps by Friday 5PM. I will be reviewing drafts on Thursday.</p></div></div><div className="flex items-center gap-2 pl-7"><MemberAvatar userId="prof" size="xs" /><span className={`text-[10px] ${theme.text} font-medium`}>Prof. Miller • 2 days ago</span></div></div>
                    <div className="flex gap-3"><MemberAvatar userId="2" size="sm" /><div><div className="flex items-baseline gap-2 mb-1"><span className="text-xs font-bold text-gray-900">Dani Park</span><span className="text-[10px] text-gray-400">10:00 AM</span></div><div className="bg-white border border-gray-200 p-3 rounded-xl rounded-tl-none shadow-sm text-sm text-gray-700">Has anyone seen the storyboard updates?</div><div className="flex gap-1 mt-1"><span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full">👀 1</span></div></div></div>
                    <div className="bg-white border border-purple-100 rounded-xl p-4 shadow-sm relative overflow-hidden"><div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-400"></div><div className="flex items-center gap-2 mb-2"><CloudyLogo size={18} className="text-purple-600" /><span className="text-xs font-bold text-purple-700">Cloudy - Your Ai assistance</span></div><p className="text-xs text-gray-600 leading-relaxed">Daily Chat Summary: The team discussed the storyboard updates and Charlotte requested help with the API timeout issue.</p></div>
                </div>
                <div className="p-4 border-t border-gray-200 bg-white"><div className="bg-gray-50 border border-gray-200 rounded-xl p-2 flex items-center gap-2"><button className="p-1.5 text-gray-400 hover:bg-gray-200 rounded-lg transition-colors"><Plus size={18}/></button><input className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400" placeholder="Message #general..." /><button className="p-1.5 text-gray-400 hover:text-gray-600"><Smile size={18}/></button><button className={`p-1.5 ${theme.bg} ${theme.text} rounded-lg hover:opacity-80`}><Send size={16}/></button></div></div>
            </div>
        </div>
    );
};

// 3. Project Overview
export const ProjectOverview = ({ project }: { project: Project }) => {
    const theme = THEME_STYLES[project.theme || 'green'];
    return (
        <div className="flex-1 h-full bg-white flex flex-col min-w-0">
             <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-end"><div><h1 className="text-2xl font-bold text-gray-900">Project Overview</h1><p className="text-gray-400 text-sm mt-1">Last updated today</p></div><button className="text-gray-400 hover:text-gray-600"><MoreHorizontal/></button></div>
             <div className="p-8 overflow-y-auto"><div className="grid grid-cols-2 gap-6 mb-8"><div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden"><div className="flex justify-between items-start mb-6"><span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Team Progress</span><Layout className="text-gray-200" size={48} /></div><div className={`text-4xl font-bold ${theme.text} mb-4`}>{project.teamProgress}%</div><div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${theme.bar}`} style={{ width: `${project.teamProgress}%` }}></div></div></div><div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden"><div className="flex justify-between items-start mb-6"><span className={`text-xs font-bold tracking-wider uppercase ${theme.text} opacity-70`}>Your Contribution</span><CheckSquare className={`${theme.text} opacity-20`} size={48} /></div><div className={`text-4xl font-bold ${theme.text} mb-4`}>{project.personalProgress}%</div><div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${theme.bar}`} style={{ width: `${project.personalProgress}%` }}></div></div></div></div></div>
        </div>
    );
};