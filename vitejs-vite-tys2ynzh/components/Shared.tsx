import React, { useState, useEffect } from 'react';
import { HelpCircle, X, LifeBuoy, FileText, Presentation, Layout, Sheet, File, AlertCircle } from 'lucide-react';
import { HELP_CONTENT, users } from '../data';
import { FileType, FileStatus, TaskStatus } from '../types';

// --- Custom Icons ---
export const CloudyLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.132 20.177 10.244 17.813 10.035C17.433 6.643 14.545 4 11 4C7.455 4 4.567 6.643 4.187 10.035C1.823 10.244 0 12.132 0 14.5C0 16.9853 2.01472 19 4.5 19H17.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 10L9.01 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.5 10L14.51 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 14C10 14 11 15 13.5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- Contextual Help ---
export const ContextualHelp = ({ context, collapsed }: { context: string, collapsed: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const helpKey = Object.keys(HELP_CONTENT).find(key => context.includes(key)) || 'dashboard';
    // @ts-ignore
    const content = HELP_CONTENT[helpKey];

    useEffect(() => { setIsOpen(false); }, [context]);

    return (
        <div className="relative group">
            {isOpen && (
                <div className="absolute bottom-full left-4 mb-2 bg-white rounded-2xl shadow-xl border border-gray-200 w-72 overflow-hidden z-50 animate-in slide-in-from-bottom-2 fade-in duration-300 origin-bottom-left">
                    <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
                        <h3 className="font-bold text-sm flex items-center gap-2">
                            <LifeBuoy size={16} /> {content.title}
                        </h3>
                        <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="hover:bg-purple-700 rounded p-1"><X size={14}/></button>
                    </div>
                    <div className="p-4 space-y-4">
                        {content.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex gap-3 text-sm text-gray-600">
                                <div className="mt-0.5 text-purple-600 shrink-0"><item.icon size={16} /></div>
                                <span className="leading-snug">{item.text}</span>
                            </div>
                        ))}
                    </div>
                     <div className="bg-gray-50 p-3 text-[10px] text-center text-gray-400 border-t border-gray-100">
                        CloudSync Smart Guide
                    </div>
                </div>
            )}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isOpen ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
                <HelpCircle size={20} className={isOpen ? 'text-purple-600' : 'text-gray-400'} />
                {!collapsed && <span>Help & Guide</span>}
            </button>
        </div>
    );
};

// --- Badges & Icons ---
export const FileIcon = ({ type }: { type: FileType | string }) => {
  const baseClasses = "w-10 h-10 p-2 rounded-lg flex items-center justify-center mb-2";
  switch (type) {
    case 'doc': case 'PDF': return <div className={`${baseClasses} bg-blue-50 text-blue-600`}><FileText size={20} /></div>;
    case 'slide': return <div className={`${baseClasses} bg-orange-50 text-orange-600`}><Presentation size={20} /></div>;
    case 'board': return <div className={`${baseClasses} bg-purple-50 text-purple-600`}><Layout size={20} /></div>;
    case 'sheet': return <div className={`${baseClasses} bg-green-50 text-green-600`}><Sheet size={20} /></div>;
    case 'JSON': return <div className={`${baseClasses} bg-yellow-50 text-yellow-600`}><FileText size={20} /></div>;
    default: return <div className={`${baseClasses} bg-gray-50 text-gray-600`}><File size={20} /></div>;
  }
};

export const FileStatusBadge = ({ status }: { status: FileStatus }) => {
    const styles = { 'not-started': 'bg-gray-100 text-gray-500', 'in-progress': 'bg-blue-100 text-blue-700', 'need-help': 'bg-red-50 text-red-600 border border-red-100', 'completed': 'bg-green-100 text-green-700' };
    return (<span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${styles[status]}`}>{status.replace('-', ' ')}</span>);
};

export const TaskStatusBadge = ({ status }: { status: TaskStatus }) => {
    const config = { 'not-started': { bg: 'bg-gray-200', text: 'text-gray-600', label: 'NOT STARTED', icon: false }, 'in-progress': { bg: 'bg-blue-200', text: 'text-blue-700', label: 'IN PROGRESS', icon: false }, 'need-review': { bg: 'bg-yellow-200', text: 'text-yellow-700', label: 'NEEDS REVIEW', icon: false }, 'need-help': { bg: 'bg-red-100', text: 'text-red-600', label: 'NEED HELP', icon: true }, 'completed': { bg: 'bg-green-200', text: 'text-green-800', label: 'COMPLETED', icon: false }, 'overdue': { bg: 'bg-red-200', text: 'text-red-800', label: 'OVERDUE', icon: false } }[status];
    return (<span className={`text-[10px] font-bold px-2 py-1 rounded ${config.bg} ${config.text} flex items-center gap-1 w-fit`}>{config.icon && <AlertCircle size={10} />}{config.label}</span>);
};

export const MemberAvatar = ({ userId, size="sm" }: { userId: string, size?: "xs"|"sm"|"md" }) => {
    const user = users.find(u => u.id === userId);
    const sizeClasses = { xs: "w-5 h-5", sm: "w-8 h-8", md: "w-10 h-10" };
    if (!user) return null;
    return <img src={user.avatar} alt={user.name} className={`${sizeClasses[size]} rounded-full border-2 border-white`} title={user.name} />;
};
