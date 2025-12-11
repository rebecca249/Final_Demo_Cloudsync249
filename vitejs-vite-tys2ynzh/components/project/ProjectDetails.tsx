import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CalendarDays, UserPlus, FileText, ExternalLink, Clock, UploadCloud, Download, History, MessageSquare, Send, Video, PlayCircle, Sparkles, CheckCircle2, ListTodo, Folders, Mic, Phone, ScreenShare, MoreVertical, Smile, Paperclip, ChevronDown, Layout, Presentation, Sheet, MousePointer2, Hand, Move, ZoomIn, ZoomOut, Bold, Italic, Underline, AlignLeft, Grid, Printer, Plus, HelpCircle, Link as LinkIcon, Zap, Eye, Users, GraduationCap, X, ChevronRight } from 'lucide-react';
import { Task, Meeting, ProjectFile, User, FileType, FileStatus } from '../../types';
import { users, THEME_STYLES } from '../../data';
import { MemberAvatar, FileIcon, FileStatusBadge } from '../Shared';

// --- Helper: Specific Editor Mocks ---

const DocEditor = ({ file }: { file: ProjectFile }) => (
    <div className="h-full flex flex-col bg-gray-100 overflow-y-auto">
        <div className="h-10 bg-white border-b border-gray-200 flex items-center px-4 gap-2 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-2">
                 <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600"><Printer size={16}/></button>
                 <div className="text-xs text-gray-400">100%</div>
            </div>
            <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-2">
                <select className="text-xs bg-transparent outline-none font-medium text-gray-700"><option>Normal Text</option><option>Heading 1</option></select>
            </div>
            <div className="flex items-center gap-1">
                <button className="p-1 hover:bg-gray-100 rounded text-gray-700"><Bold size={14}/></button>
                <button className="p-1 hover:bg-gray-100 rounded text-gray-700"><Italic size={14}/></button>
                <button className="p-1 hover:bg-gray-100 rounded text-gray-700"><Underline size={14}/></button>
                <button className="p-1 hover:bg-gray-100 rounded text-gray-700 ml-2"><AlignLeft size={14}/></button>
            </div>
        </div>
        <div className="flex-1 p-8 flex justify-center">
            <div className="w-[816px] min-h-[1056px] bg-white shadow-md p-16 transition-all">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">{file.title}</h1>
                <div className="space-y-4 text-gray-700 leading-relaxed font-serif">
                    <p><strong>1. Introduction</strong></p>
                    <p>This document serves as the primary source of truth for the project requirements and specifications. All team members are expected to contribute to the sections relevant to their roles.</p>
                    <p><strong>2. Objectives</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Define user personas and user journeys.</li>
                        <li>Establish technical feasibility for the backend architecture.</li>
                        <li>Create high-fidelity prototypes for the core user flows.</li>
                    </ul>
                    <p><strong>3. Methodology</strong></p>
                    <p>We will be adopting an agile methodology with two-week sprints. The design phase will precede the development phase by one sprint to ensure assets are ready.</p>
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800 my-4 italic">
                        Note: Please update the timeline section below by EOD Friday.
                    </div>
                    <p><strong>4. Timeline</strong></p>
                    <p>[Content to be added by Project Lead]</p>
                </div>
            </div>
        </div>
    </div>
);

const SlideEditor = ({ file }: { file: ProjectFile }) => (
    <div className="h-full flex bg-gray-100">
        <div className="w-48 bg-white border-r border-gray-200 flex flex-col p-3 gap-3 overflow-y-auto">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className={`aspect-video bg-gray-50 border-2 rounded cursor-pointer relative group ${i === 1 ? 'border-orange-500 ring-2 ring-orange-100' : 'border-transparent hover:border-gray-300'}`}>
                    <div className="absolute top-1 left-1 text-[10px] font-bold text-gray-400">{i}</div>
                    <div className="w-full h-full flex flex-col items-center justify-center p-2">
                         <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                         <div className="w-2/3 h-1 bg-gray-200 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
        <div className="flex-1 flex flex-col">
            <div className="h-10 bg-white border-b border-gray-200 flex items-center px-4 gap-2">
                <button className="flex items-center gap-1 text-xs font-bold bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"><Plus size={12}/> New Slide</button>
                <div className="h-4 w-px bg-gray-200 mx-1"></div>
                <button className="p-1.5 hover:bg-gray-100 rounded"><Layout size={14}/></button>
                <button className="p-1.5 hover:bg-gray-100 rounded"><Presentation size={14}/></button>
            </div>
            <div className="flex-1 flex items-center justify-center p-8 bg-gray-100/50">
                <div className="aspect-video w-full max-w-4xl bg-white shadow-lg border border-gray-200 p-16 flex flex-col items-center text-center relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-8">{file.title}</h1>
                    <p className="text-xl text-gray-500">Project Update • Oct 2025</p>
                    <div className="mt-12 flex gap-4">
                        <div className="w-32 h-32 bg-gray-100 rounded-lg"></div>
                        <div className="w-32 h-32 bg-gray-100 rounded-lg"></div>
                        <div className="w-32 h-32 bg-gray-100 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const BoardEditor = ({ file }: { file: ProjectFile }) => (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex flex-col gap-1 z-10">
            <button className="p-2 bg-purple-50 text-purple-600 rounded"><MousePointer2 size={18}/></button>
            <button className="p-2 hover:bg-gray-50 text-gray-600 rounded"><Hand size={18}/></button>
            <button className="p-2 hover:bg-gray-50 text-gray-600 rounded"><FileText size={18}/></button>
            <button className="p-2 hover:bg-gray-50 text-gray-600 rounded"><Layout size={18}/></button>
        </div>
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex gap-2 z-10">
            <button className="p-1.5 hover:bg-gray-50 rounded"><ZoomOut size={16}/></button>
            <span className="text-xs font-bold py-1.5">100%</span>
            <button className="p-1.5 hover:bg-gray-50 rounded"><ZoomIn size={16}/></button>
        </div>
        <div className="flex-1 relative overflow-auto">
             {/* Mock Board Items */}
             <div className="absolute top-20 left-40 w-56 h-56 bg-yellow-200 shadow-md p-4 rotate-2 transform hover:scale-105 transition-transform cursor-pointer font-handwriting">
                <p className="font-bold text-yellow-900 mb-2 text-lg">Brainstorming</p>
                <p className="text-yellow-900">How might we improve the onboarding flow for new students?</p>
                <div className="absolute bottom-2 right-2 flex -space-x-1">
                     <MemberAvatar userId="1" size="xs" />
                </div>
             </div>
             
             <div className="absolute top-40 left-[400px] w-64 h-40 bg-white border border-gray-200 rounded-lg shadow-sm p-4 cursor-pointer">
                 <div className="flex justify-between items-center mb-2">
                     <span className="text-xs font-bold text-gray-400 uppercase">User Flow</span>
                     <MoreVertical size={14} className="text-gray-400"/>
                 </div>
                 <div className="flex items-center justify-between gap-2">
                     <div className="w-12 h-12 border-2 border-purple-500 rounded-lg flex items-center justify-center text-[10px]">Login</div>
                     <div className="flex-1 h-0.5 bg-gray-300"></div>
                     <div className="w-12 h-12 border-2 border-purple-500 rounded-lg flex items-center justify-center text-[10px]">Home</div>
                 </div>
             </div>
             
             <div className="absolute top-[300px] left-[150px] w-48 h-48 bg-pink-200 shadow-md p-4 -rotate-1 transform hover:scale-105 transition-transform cursor-pointer">
                <p className="text-pink-900 font-bold">Needs:</p>
                <ul className="list-disc pl-4 text-sm text-pink-900">
                    <li>Mobile Responsive</li>
                    <li>Dark Mode</li>
                    <li>Notifications</li>
                </ul>
             </div>
             
             {/* Cursors */}
             <div className="absolute top-[180px] left-[520px] pointer-events-none transition-all duration-1000 ease-in-out">
                 <MousePointer2 size={16} className="text-blue-500 fill-blue-500" />
                 <div className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-br rounded-bl rounded-tr ml-3 mt-1 font-bold">Dani</div>
             </div>
        </div>
    </div>
);

const SheetEditor = ({ file }: { file: ProjectFile }) => (
     <div className="h-full flex flex-col bg-white">
          <div className="h-10 border-b border-gray-200 flex items-center px-2 bg-gray-50">
               <div className="flex items-center gap-1 border-r border-gray-200 pr-2 mr-2">
                    <button className="p-1 hover:bg-gray-200 rounded"><Grid size={16} className="text-green-700"/></button>
               </div>
               <div className="flex items-center text-xs font-mono text-gray-600 w-64 bg-white border border-gray-300 px-2 py-1 rounded">
                   =SUM(B2:B14)
               </div>
          </div>
          <div className="flex-1 overflow-auto relative">
               <table className="w-full border-collapse text-sm">
                   <thead>
                       <tr>
                           <th className="w-10 bg-gray-100 border border-gray-300 text-gray-500 font-medium"></th>
                           {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(col => (
                               <th key={col} className="bg-gray-100 border border-gray-300 px-2 py-1 text-center font-bold text-gray-600 min-w-[100px]">{col}</th>
                           ))}
                       </tr>
                   </thead>
                   <tbody>
                       {[...Array(20)].map((_, r) => (
                           <tr key={r}>
                               <td className="bg-gray-100 border border-gray-300 text-center text-gray-500 font-medium">{r + 1}</td>
                               {[...Array(7)].map((_, c) => (
                                   <td key={c} className="border border-gray-200 px-2 py-1 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500">
                                       {r === 0 && c === 0 ? 'Item' : r === 0 && c === 1 ? 'Cost' : r > 0 && c === 0 ? `Resource ${r}` : r > 0 && c === 1 ? `$${(r * 150).toFixed(2)}` : ''}
                                   </td>
                               ))}
                           </tr>
                       ))}
                   </tbody>
               </table>
          </div>
          <div className="h-8 bg-gray-100 border-t border-gray-200 flex items-center px-4 gap-1">
               <button className="px-4 py-1 bg-white text-green-700 font-bold text-xs border-b-2 border-green-600">Sheet 1</button>
               <button className="px-4 py-1 text-gray-500 font-medium text-xs hover:bg-gray-200 rounded">Sheet 2</button>
               <button className="p-1 hover:bg-gray-200 rounded"><Plus size={14}/></button>
          </div>
     </div>
);


// 3. File Detail View (New Interactive Component)
export const FileDetailView = ({ file, project, currentUser, onBack }: { file: ProjectFile, project: any, currentUser: User, onBack: () => void }) => {
    const [status, setStatus] = useState<FileStatus>(file.status);
    const [progress, setProgress] = useState(file.progress);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState<any[]>([
        ...file.activityLogs.map(log => ({ ...log, isLog: true })),
        { id: 'm1', userId: '2', text: 'I think we should expand on the methodology section.', timestamp: '10:30 AM', type: 'comment' },
        { id: 'm2', userId: '1', text: 'Agreed. I will add the agile sprint breakdown.', timestamp: '10:35 AM', type: 'comment' }
    ]);
    const theme = THEME_STYLES[project.theme || 'green'];
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Sort messages by time (mock sort for now, assuming append)
    const sortedMessages = messages.sort((a,b) => (a.timestamp || '').localeCompare(b.timestamp || ''));

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;
        const newMsg = {
            id: Date.now().toString(),
            userId: currentUser.id,
            text: chatInput,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'comment'
        };
        setMessages([...messages, newMsg]);
        setChatInput('');
    };

    const handleStatusChange = (newStatus: FileStatus) => {
        setStatus(newStatus);
        setMessages([...messages, {
            id: Date.now().toString(),
            userId: currentUser.id,
            action: `changed status to ${newStatus}`,
            timestamp: 'Just now',
            type: 'status_change',
            isLog: true
        }]);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const renderEditor = () => {
        switch(file.type) {
            case 'slide': return <SlideEditor file={file} />;
            case 'board': return <BoardEditor file={file} />;
            case 'sheet': return <SheetEditor file={file} />;
            default: return <DocEditor file={file} />;
        }
    };

    return (
        <div className="flex flex-col h-full bg-white animate-in fade-in duration-300">
            {/* 1. Header Area */}
            <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white shrink-0 z-20">
                <div className="flex items-center gap-4 min-w-0">
                    <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 ${theme.bg} rounded-lg flex items-center justify-center ${theme.text}`}>
                            <FileIcon type={file.type} />
                        </div>
                        <div>
                             <div className="flex items-center gap-2">
                                <h1 className="text-lg font-bold text-gray-900 truncate max-w-xs">{file.title}</h1>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${theme.bg} ${theme.text}`}>{file.category}</span>
                             </div>
                             <div className="flex items-center gap-2 text-xs text-gray-500">
                                 <span className="flex items-center gap-1"><Clock size={10}/> Last edited {file.lastModified}</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {/* Progress Editor */}
                    <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <div className="text-xs font-bold text-gray-400 uppercase">Progress</div>
                        <input 
                            type="range" 
                            min="0" max="100" 
                            value={progress} 
                            onChange={(e) => setProgress(Number(e.target.value))}
                            className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <span className="text-xs font-bold text-purple-600 w-8 text-right">{progress}%</span>
                    </div>

                    {/* Status Selector */}
                    <div className="relative group">
                         <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all uppercase tracking-wider ${
                            status === 'need-help' ? 'bg-red-50 text-red-600 border-red-200' : 
                            status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : 
                            status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 
                            'bg-gray-50 text-gray-600 border-gray-200'
                         }`}>
                             {status === 'need-help' && <CheckCircle2 size={12}/>} 
                             {status.replace('-', ' ')}
                             <ChevronDown size={12}/>
                         </button>
                         {/* Dropdown (Mock) */}
                         <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden hidden group-hover:block z-50">
                             {['not-started', 'in-progress', 'need-help', 'completed'].map((s) => (
                                 <button key={s} onClick={() => handleStatusChange(s as FileStatus)} className="w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 capitalize text-gray-700">
                                     {s.replace('-', ' ')}
                                 </button>
                             ))}
                         </div>
                    </div>

                    <div className="h-6 w-px bg-gray-200"></div>

                    {/* Active Members */}
                    <div className="flex -space-x-2">
                        {file.members.map(mid => <MemberAvatar key={mid} userId={mid} size="sm" />)}
                        <button className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-gray-400 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                            <UserPlus size={14} />
                        </button>
                    </div>

                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-purple-700">Share</button>
                </div>
            </div>

            {/* 2. Main Content Layout */}
            <div className="flex-1 flex overflow-hidden">
                
                {/* Editor Area */}
                <div className="flex-1 overflow-hidden relative">
                    {renderEditor()}
                </div>

                {/* 3. Collaboration Sidebar (Chatbox) */}
                <div className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-xl z-20">
                     {/* Toolbar */}
                     <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                         <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Collaboration</span>
                         <div className="flex gap-1">
                             <button className="p-2 hover:bg-purple-50 hover:text-purple-600 rounded-lg text-gray-500 transition-colors" title="Start Call"><Phone size={16}/></button>
                             <button className="p-2 hover:bg-purple-50 hover:text-purple-600 rounded-lg text-gray-500 transition-colors" title="Screen Share"><ScreenShare size={16}/></button>
                         </div>
                     </div>

                     {/* Feed */}
                     <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
                         {sortedMessages.map((msg, idx) => {
                             if (msg.isLog) {
                                 return (
                                     <div key={idx} className="flex items-center gap-2 justify-center my-4">
                                         <div className="h-px flex-1 bg-gray-200"></div>
                                         <div className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                                             <MemberAvatar userId={msg.userId} size="xs" />
                                             <span>{users.find(u=>u.id === msg.userId)?.name.split(' ')[0]} {msg.action}</span>
                                             <span className="opacity-70">• {msg.timestamp}</span>
                                         </div>
                                         <div className="h-px flex-1 bg-gray-200"></div>
                                     </div>
                                 );
                             }
                             const isMe = msg.userId === currentUser.id;
                             return (
                                 <div key={idx} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
                                     <MemberAvatar userId={msg.userId} size="xs" />
                                     <div className={`max-w-[85%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                                         <div className="flex items-baseline gap-2 mb-1">
                                             <span className="text-xs font-bold text-gray-900">{users.find(u=>u.id===msg.userId)?.name}</span>
                                             <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                                         </div>
                                         <div className={`p-3 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none'}`}>
                                             {msg.text}
                                         </div>
                                     </div>
                                 </div>
                             );
                         })}
                         <div ref={messagesEndRef} />
                     </div>

                     {/* Input */}
                     <div className="p-3 bg-white border-t border-gray-200">
                         <div className="relative">
                            <input 
                                className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-purple-300 rounded-xl pl-4 pr-24 py-3 text-sm outline-none transition-all placeholder-gray-400"
                                placeholder="Type a comment..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <div className="absolute right-2 top-1.5 flex items-center gap-1">
                                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"><Mic size={16}/></button>
                                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"><Smile size={16}/></button>
                                <button onClick={handleSendMessage} className="p-1.5 bg-purple-100 text-purple-600 hover:bg-purple-200 rounded-lg transition-colors"><Send size={14}/></button>
                            </div>
                         </div>
                         <div className="flex justify-between items-center mt-2 px-1">
                             <div className="flex gap-2">
                                 <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1"><Paperclip size={10}/> Attach</button>
                             </div>
                             <div className="text-[10px] text-gray-300">Enter to send</div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};


// 1. Task Detail View
export const TaskDetailView = ({ task, onBack, onUpdateStatus, onAddUser, currentUser, allFiles, onOpenFile }: any) => {
    // Initialize subtasks with some default mock data
    const [subtasks, setSubtasks] = useState([
        { id: '1', text: 'Research requirements', completed: task.progress >= 25 },
        { id: '2', text: 'Draft initial concept', completed: task.progress >= 50 },
        { id: '3', text: 'Internal team review', completed: task.progress >= 75 },
        { id: '4', text: 'Final polish & submission', completed: task.progress === 100 },
    ]);
    const [progress, setProgress] = useState(task.progress);
    const [status, setStatus] = useState(task.status);
    const [chatInput, setChatInput] = useState('');
    const [showCelebration, setShowCelebration] = useState(false);
    const [activities, setActivities] = useState<{ id: string; user: string; action: string; time: string; type: string; text?: string }[]>([{ id: '1', user: 'Emma', action: 'created task', time: 'Oct 10', type: 'log' }]);
    const [relatedFiles, setRelatedFiles] = useState(task.relatedFiles || []);
    const [helpStep, setHelpStep] = useState<'none' | 'type' | 'target'>('none');
    const [helpType, setHelpType] = useState('');
    const [previousStatus, setPreviousStatus] = useState(task.status);

    const isPersonalTask = task.assigneeIds.length === 1;
    const linkedProjectFile = task.relatedFileId ? allFiles.find((f: ProjectFile) => f.id === task.relatedFileId) : null;
    
    // Check if current user is an assignee
    const isAssignee = task.assigneeIds.includes(currentUser.id);

    // Recalculate progress whenever subtasks change
    useEffect(() => {
        const completedCount = subtasks.filter(s => s.completed).length;
        const newProgress = Math.round((completedCount / subtasks.length) * 100);
        setProgress(newProgress);
    }, [subtasks]);

    const toggleSubtask = (id: string) => {
        if (!isAssignee) return; // STRICTLY Prevent interaction for non-assignees
        setSubtasks(prev => prev.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
    };

    const handleMarkComplete = () => {
        if (!isAssignee) return; // Prevent completion for non-assignees
        setStatus('completed');
        if (onUpdateStatus) onUpdateStatus('completed');
        setShowCelebration(true);
        // Hide celebration after a few seconds
        setTimeout(() => setShowCelebration(false), 5000);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        if (!isAssignee) return;

        if (newStatus === 'need-help') {
             setPreviousStatus(status);
             setStatus('need-help'); 
             setHelpStep('type');
        } else {
             setStatus(newStatus);
             if (onUpdateStatus) onUpdateStatus(newStatus);
        }
    };

    const confirmHelp = (target: string) => {
        // Status is already 'need-help' in state, now we finalize the side effects
        if (onUpdateStatus) onUpdateStatus('need-help');
        
        const targetText = target === 'group' ? 'Project Group' : 'Instructor';
        const helpTypeText = helpType ? helpType.charAt(0).toUpperCase() + helpType.slice(1) : 'General';
        
        setActivities(prev => [...prev, {
            id: Date.now().toString(),
            user: currentUser.name.split(' ')[0],
            action: `requested ${helpTypeText} help from ${targetText}`,
            time: 'Just now',
            type: 'log'
        }]);
        
        setHelpStep('none');
        setHelpType('');
    };

    const handleCancelHelp = () => {
        setStatus(previousStatus);
        setHelpStep('none');
        setHelpType('');
    };

    const handleSendComment = () => {
        if (!chatInput.trim()) return;
        setActivities([...activities, { id: Date.now().toString(), user: currentUser.name.split(' ')[0], action: 'commented', time: 'Just now', type: 'comment', text: chatInput }]);
        setChatInput('');
    };
    const handleUploadFile = () => { setRelatedFiles([...relatedFiles, { name: 'API_Schema_Draft.json', type: 'JSON', size: '45 KB' }]); };

    return (
        <div className="flex-1 h-full bg-white flex flex-col min-w-0 relative">
            {/* Celebration Overlay */}
            {showCelebration && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm animate-in fade-in duration-500"></div>
                    {/* Confetti Particles Mock */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="absolute w-3 h-3 rounded-full opacity-0" 
                                style={{
                                    top: `${Math.random() * 80 + 10}%`,
                                    left: `${Math.random() * 80 + 10}%`,
                                    backgroundColor: ['#9333ea', '#2563eb', '#16a34a', '#db2777', '#ca8a04'][Math.floor(Math.random() * 5)],
                                    animation: `ping 1s cubic-bezier(0, 0, 0.2, 1) infinite`,
                                    animationDelay: `${Math.random() * 0.5}s`
                                }}
                            ></div>
                        ))}
                    </div>
                    <div className="relative bg-white p-8 rounded-3xl shadow-2xl text-center animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border-4 border-purple-100">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <CheckCircle2 size={40} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-2">Task Complete!</h2>
                        <p className="text-gray-500 font-medium">You smashed it! Keep up the momentum.</p>
                    </div>
                </div>
            )}

            <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"><ArrowLeft size={20} /></button>
                    <div className="flex-1">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">UX Design Project</div>
                        <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
                    </div>
                    <div className="flex gap-2">
                        <select 
                            value={status} 
                            onChange={handleStatusChange} 
                            disabled={!isAssignee}
                            className={`bg-white border border-gray-200 text-sm font-medium rounded-lg px-3 py-2 outline-none focus:border-purple-500 ${!isAssignee ? 'opacity-60 cursor-not-allowed bg-gray-50' : ''}`}
                        >
                            <option value="not-started">Not Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="need-review">Needs Review</option>
                            <option value="need-help">Need Help</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl">
                    <span className="text-xs font-bold text-gray-500">Progress</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-purple-600 w-10 text-right">{progress}%</span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-8">
                        {linkedProjectFile && (
                            <section className="animate-in fade-in slide-in-from-bottom-2">
                                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider flex items-center gap-2"><FileText size={16} className="text-purple-600" /> Linked Work File</h3>
                                <div onClick={() => onOpenFile(linkedProjectFile)} className="bg-purple-50 border border-purple-100 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-purple-100 hover:border-purple-200 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-105 transition-transform"><FileIcon type={linkedProjectFile.type} /></div>
                                        <div><h4 className="font-bold text-gray-900 text-sm group-hover:text-purple-700 transition-colors">{linkedProjectFile.title}</h4><span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={10} /> Last modified {linkedProjectFile.lastModified}</span></div>
                                    </div>
                                    <button className="flex items-center gap-1 text-xs font-bold bg-white text-purple-600 px-3 py-1.5 rounded-lg shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-all">Open File <ExternalLink size={12} /></button>
                                </div>
                            </section>
                        )}
                        <section>
                            <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Description</h3>
                            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">{task.description}</p>
                        </section>

                        {/* Subtasks Checklist */}
                        <section className="animate-in fade-in slide-in-from-bottom-1">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                                    <ListTodo size={16} className="text-purple-600" /> Subtasks
                                </h3>
                                <span className="text-xs font-bold text-gray-400">{subtasks.filter(s=>s.completed).length}/{subtasks.length} Completed</span>
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                                {subtasks.map(st => (
                                    <div 
                                        key={st.id} 
                                        onClick={() => toggleSubtask(st.id)}
                                        className={`group flex items-center gap-3 p-4 border-b border-gray-50 last:border-0 transition-colors ${isAssignee ? 'cursor-pointer hover:bg-purple-50/50' : 'cursor-default opacity-70 bg-gray-50/50'}`}
                                    >
                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${st.completed ? 'bg-purple-600 border-purple-600' : 'bg-white border-gray-300 ' + (isAssignee ? 'group-hover:border-purple-300' : '')}`}>
                                            {st.completed && <CheckCircle2 size={12} className="text-white" strokeWidth={3} />}
                                        </div>
                                        <span className={`text-sm font-medium transition-colors ${st.completed ? 'text-gray-400 line-through decoration-gray-300' : 'text-gray-700'}`}>
                                            {st.text}
                                        </span>
                                        {!isAssignee && <span className="ml-auto text-[10px] text-gray-400 italic">Read only</span>}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Mark Complete Action - Only for Assignee */}
                            {progress === 100 && status !== 'completed' && isAssignee && (
                                <div className="mt-4 animate-in zoom-in-95 duration-300">
                                    <button 
                                        onClick={handleMarkComplete}
                                        className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-xl hover:bg-black hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Sparkles size={16} className="text-yellow-400 animate-pulse" /> Mark Task as Complete
                                    </button>
                                </div>
                            )}
                        </section>

                        {isPersonalTask ? (
                            <section className="animate-in fade-in slide-in-from-bottom-2">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2"><div className="text-blue-600"><FileText size={16} /></div> Related Materials</h3>
                                    <button onClick={handleUploadFile} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors font-medium border border-gray-200"><UploadCloud size={14} /> Upload File</button>
                                </div>
                                {relatedFiles && relatedFiles.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-3">
                                        {relatedFiles.map((file: any, idx: number) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group">
                                                <FileIcon type={file.type} />
                                                <div className="flex-1 min-w-0"><div className="text-sm font-medium text-gray-900 truncate">{file.name}</div><div className="text-xs text-gray-500">{file.size}</div></div>
                                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Download size={16} /></button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center text-gray-400 text-sm">No related materials attached.</div>
                                )}
                            </section>
                        ) : (
                            <section>
                                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Activity & Discussion</h3>
                                <div className="border border-gray-200 rounded-xl overflow-hidden flex flex-col h-96">
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
                                        {activities.map((act: any) => (
                                            <div key={act.id} className="flex gap-3 text-sm">
                                                <div className="w-8 flex justify-center pt-1">{act.type === 'log' ? <History size={14} className="text-gray-400"/> : <MessageSquare size={14} className="text-blue-500"/>}</div>
                                                <div className="flex-1">
                                                    <div className="flex items-baseline gap-2"><span className="font-bold text-gray-900">{act.user}</span><span className="text-gray-500">{act.action}</span><span className="text-xs text-gray-400 ml-auto">{act.time}</span></div>
                                                    {act.text && <div className="mt-1 bg-white p-2 rounded border border-gray-100 text-gray-700">{act.text}</div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
                                        <input className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-300" placeholder="Write a comment..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
                                        <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700" onClick={handleSendComment}><Send size={16}/></button>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                    <div className="col-span-1 space-y-6">
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 text-xs uppercase tracking-wider">Assignees</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {task.assigneeIds.map((uid: string) => { const u = users.find(user => user.id === uid); return u ? (<div key={uid} className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"><img src={u.avatar} className="w-6 h-6 rounded-full" /><span className="text-xs font-medium">{u.name.split(' ')[0]}</span></div>) : null; })}
                            </div>
                            <button onClick={() => onAddUser(task.id)} className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-purple-600 flex items-center justify-center gap-2"><UserPlus size={14} /> Add Assignee</button>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
                            <div>
                                <div className="text-xs text-gray-400 font-bold uppercase mb-1">Due Date</div>
                                <div className={`flex items-center gap-2 text-sm font-bold p-2 rounded-lg ${task.isOverdue ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-50 text-gray-900 border border-gray-100'}`}><CalendarDays size={16} /> {task.dueDate}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 font-bold uppercase mb-1">Priority</div>
                                <div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span><span className="text-sm font-medium capitalize">{task.priority} Priority</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Need Help Modal Overlay */}
            {helpStep !== 'none' && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] animate-in fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-[400px] animate-in zoom-in-95 slide-in-from-bottom-4 border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">
                                {helpStep === 'type' ? 'What kind of help do you need?' : 'Who should we notify?'}
                            </h3>
                            <button onClick={handleCancelHelp} className="p-1 hover:bg-gray-100 rounded-full text-gray-400"><X size={18}/></button>
                        </div>
                        
                        {helpStep === 'type' ? (
                            <div className="space-y-3">
                                {[
                                    { id: 'clarification', label: 'Clarification', icon: HelpCircle, text: 'Requirements are unclear' },
                                    { id: 'dependency', label: 'Dependency', icon: LinkIcon, text: 'Blocked by another task' },
                                    { id: 'technical', label: 'Technical Issue', icon: Zap, text: 'Stuck on implementation' },
                                    { id: 'review', label: 'Review Needed', icon: Eye, text: 'Need feedback on work' }
                                ].map(opt => (
                                    <button key={opt.id} onClick={() => { setHelpType(opt.id); setHelpStep('target'); }} className="w-full flex items-center gap-4 p-3 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all text-left group">
                                        <div className="w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center text-gray-500 group-hover:text-purple-600 transition-colors border border-gray-100">
                                            <opt.icon size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 text-sm group-hover:text-purple-700">{opt.label}</div>
                                            <div className="text-xs text-gray-500">{opt.text}</div>
                                        </div>
                                        <ChevronRight size={16} className="ml-auto text-gray-300 group-hover:text-purple-400"/>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <button onClick={() => confirmHelp('group')} className="w-full flex items-center gap-4 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left group">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Users size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 text-sm">Project Group</div>
                                        <div className="text-xs text-gray-500">Post to team channel</div>
                                    </div>
                                </button>
                                <button onClick={() => confirmHelp('instructor')} className="w-full flex items-center gap-4 p-3 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all text-left group">
                                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                        <GraduationCap size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 text-sm">Instructor</div>
                                        <div className="text-xs text-gray-500">Send private message</div>
                                    </div>
                                </button>
                                <button onClick={() => setHelpStep('type')} className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-2">Back</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// 2. Meeting Detail View
export const MeetingDetailView = ({ meeting, onBack }: { meeting: Meeting; onBack: () => void }) => {
    const isUpcoming = meeting.status === 'upcoming';
    
    return (
        <div className="flex-1 h-full bg-white flex flex-col min-w-0">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center gap-4"><button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"><ArrowLeft size={20} /></button><div className="flex-1"><div className="flex items-center gap-3 mb-1"><h1 className="text-2xl font-bold text-gray-900">{meeting.title}</h1><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${meeting.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{meeting.status}</span></div><div className="text-sm text-gray-500 flex items-center gap-2"><CalendarDays size={14} /> {meeting.date}<Clock size={14} className="ml-2" /> {meeting.startTime} ({meeting.duration})</div></div></div>
            <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-8">
                        {isUpcoming ? (
                             <>
                                <section>
                                    <div className="bg-purple-600 rounded-2xl p-8 text-white flex flex-col items-center text-center shadow-lg relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
                                        <div className="relative z-10 w-full flex flex-col items-center">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/20">
                                                <Video size={32} className="text-white" />
                                            </div>
                                            <h2 className="text-2xl font-bold mb-3">Ready to join?</h2>
                                            <p className="text-purple-100 mb-8 max-w-md leading-relaxed">The team is gathering. Click the button below to enter the meeting room.</p>
                                            <button className="bg-white text-purple-600 px-8 py-3.5 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                                Join Meeting Now
                                            </button>
                                            {meeting.countdownMinutes && (
                                                <div className="mt-8 flex items-center gap-2 text-sm font-medium bg-purple-700/50 px-4 py-2 rounded-full border border-purple-500/30">
                                                    <Clock size={16} className="animate-pulse" />
                                                    Starts in {meeting.countdownMinutes} minutes
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                                
                                <section>
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><ListTodo size={18} className="text-blue-600" /> Agenda</h3>
                                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                        {meeting.agenda && meeting.agenda.length > 0 ? (
                                            <ul className="space-y-3">
                                                {meeting.agenda.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                                        <div className="bg-blue-50 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shrink-0">{idx + 1}</div>
                                                        <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                                                <ListTodo size={32} className="mb-2 opacity-20" />
                                                <p className="text-sm italic">No agenda set for this meeting.</p>
                                            </div>
                                        )}
                                    </div>
                                </section>
                             </>
                        ) : (
                             <>
                                <section><h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Video size={18} className="text-purple-600" /> Meeting History & Recording</h3><div className="aspect-video bg-gray-900 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer shadow-lg"><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div><PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all z-10" /><div className="absolute bottom-4 left-4 right-4 text-white z-10 flex justify-between items-center"><div className="text-sm font-medium">00:00 / {meeting.duration}</div><div className="flex gap-2"><div className="h-1 w-64 bg-white/30 rounded-full overflow-hidden"><div className="h-full w-1/3 bg-white rounded-full"></div></div></div></div></div></section>
                                {meeting.transcript && <section><h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText size={18} className="text-blue-600" /> Transcript Highlights</h3><div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-4 max-h-64 overflow-y-auto">{meeting.transcript.map((line, idx) => (<div key={idx} className="flex gap-3 text-sm"><span className="font-mono text-xs text-gray-400 mt-0.5">{line.time}</span><div><span className="font-bold text-gray-900 mr-2">{line.user}:</span><span className="text-gray-600">{line.text}</span></div></div>))}</div></section>}
                                <section><h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Sparkles size={18} className="text-purple-600" /> AI Summary & Outcomes</h3><div className="bg-purple-50 rounded-xl p-6 border border-purple-100 space-y-6"><div><div className="text-xs font-bold text-purple-700 uppercase mb-2">Executive Summary</div><p className="text-gray-700 text-sm leading-relaxed">{meeting.summary || "No summary available."}</p></div><div className="grid grid-cols-2 gap-6"><div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm"><div className="text-xs font-bold text-gray-900 uppercase mb-3 flex items-center gap-2"><CheckCircle2 size={14} className="text-green-600"/> Key Decisions</div><ul className="list-disc list-inside text-sm text-gray-600 space-y-1">{meeting.keyDecisions?.map((d, i) => <li key={i}>{d}</li>)}</ul></div><div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm"><div className="text-xs font-bold text-gray-900 uppercase mb-3 flex items-center gap-2"><ListTodo size={14} className="text-blue-600"/> Action Items</div><ul className="space-y-2">{meeting.actionItems?.map((item, i) => (<li key={i} className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-2 rounded"><span className="truncate flex-1">{item.text}</span><MemberAvatar userId={item.assigneeId} size="xs" /></li>))}</ul></div></div></div></section>
                             </>
                        )}
                    </div>
                    <div className="col-span-1 space-y-8">
                        <section><h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Folders size={18} className="text-orange-500" /> Meeting Files</h3><div className="space-y-3">{meeting.materials?.map((file, idx) => (<div key={idx} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group"><FileIcon type={file.type} /><div className="flex-1 min-w-0"><div className="text-sm font-medium text-gray-900 truncate">{file.name}</div><div className="text-xs text-gray-500">{file.size}</div></div><Download size={16} className="text-gray-400 group-hover:text-blue-600" /></div>))}{(!meeting.materials || meeting.materials.length === 0) && <div className="text-sm text-gray-400 italic">No files attached.</div>}</div></section>
                        <section><h3 className="font-bold text-gray-900 mb-4 text-xs uppercase tracking-wider">Participants</h3><div className="flex flex-wrap gap-2">{meeting.participants.map(pid => { const u = users.find(user => user.id === pid); if (!u) return null; return (<div key={pid} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full"><img src={u.avatar} className="w-5 h-5 rounded-full" /><span className="text-xs font-medium text-gray-700">{u.name}</span></div>)})}</div></section>
                    </div>
                </div>
            </div>
        </div>
    );
};