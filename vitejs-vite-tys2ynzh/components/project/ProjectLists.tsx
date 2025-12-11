import React, { useState, useEffect, useRef } from 'react';
import { Plus, Search, ChevronRight, Flag, MoreHorizontal, Filter, ChevronDown, CheckCircle2, Clock, CalendarDays, UserPlus } from 'lucide-react';
import { Project, ProjectFile, Task, Meeting, User, TaskStatus } from '../../types';
import { THEME_STYLES, users } from '../../data';
import { FileIcon, FileStatusBadge, MemberAvatar, TaskStatusBadge } from '../Shared';

// 1. Files List
export const ProjectFilesList = ({ project, files, onOpenFile }: { project: Project, files: ProjectFile[], onOpenFile: (f: ProjectFile) => void }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [hideInstructor, setHideInstructor] = useState(false);
    const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({});
    const theme = THEME_STYLES[project.theme || 'green'];

    useEffect(() => {
        const initialExpanded: Record<string, boolean> = { 'general': true };
        project.milestones.forEach(m => initialExpanded[m.id] = true);
        setExpandedMilestones(initialExpanded);
    }, [project]);

    const toggleMilestone = (mId: string) => setExpandedMilestones(prev => ({ ...prev, [mId]: !prev[mId] }));

    const filteredFiles = files.filter(f => {
        const matchesProject = f.projectId === project.id;
        const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesInstructor = hideInstructor ? f.category !== 'course' : true;
        return matchesProject && matchesSearch && matchesInstructor;
    });

    const filesByMilestone = filteredFiles.reduce((acc, file) => {
        const mId = file.milestoneId || 'general';
        if (!acc[mId]) acc[mId] = [];
        acc[mId].push(file);
        return acc;
    }, {} as Record<string, ProjectFile[]>);

    const sortedMilestones = [...project.milestones].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const renderFileCard = (file: ProjectFile) => (
        <div key={file.id} onClick={() => onOpenFile(file)} className={`bg-white p-5 rounded-xl border transition-all cursor-pointer group flex flex-col relative hover:shadow-lg ${file.status === 'need-help' ? 'border-red-200 shadow-red-50' : 'border-gray-200 hover:border-purple-200'}`}>
            <div className="flex justify-between items-start"><FileIcon type={file.type} /><button className="text-gray-300 hover:text-gray-600"><MoreHorizontal size={16}/></button></div>
            <h3 className="font-bold text-gray-900 mb-3 line-clamp-1">{file.title}</h3>
            <div className="flex items-center gap-2 mb-4"><FileStatusBadge status={file.status} /></div>
            <div className="mt-auto"><div className="flex justify-between items-end mb-1"><span className="text-xs text-gray-400">Progress</span><span className={`text-xs font-bold ${theme.text}`}>{file.progress}%</span></div><div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-4"><div className={`h-full rounded-full ${theme.bar}`} style={{ width: `${file.progress}%` }}></div></div><div className="flex items-center justify-between pt-3 border-t border-gray-50"><div className="flex -space-x-2">{file.members.map(mid => (<MemberAvatar key={mid} userId={mid} size="xs" />))}</div><span className="text-[10px] text-gray-400">{file.lastModified}</span></div></div>
        </div>
    );

    return (
        <div className="flex-1 h-full bg-white flex flex-col min-w-0">
            <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex justify-between items-end mb-6"><div><h1 className="text-2xl font-bold text-gray-900">Files</h1><p className="text-gray-400 text-sm mt-1">Resources grouped by milestone phases.</p></div><div className="flex gap-2"><button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-purple-700 ml-2"><Plus size={16} /> Upload</button></div></div>
                <div className="flex items-center justify-between gap-4"><div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><input type="text" placeholder="Search files..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-gray-200 hover:bg-gray-100 rounded-lg text-sm outline-none transition-all"/></div><div className="flex items-center gap-3"><button onClick={() => setHideInstructor(!hideInstructor)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${hideInstructor ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-white text-gray-500 border-gray-200 hover:border-purple-200'}`}>Hide Instructor Files</button></div></div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50/30 space-y-8">
                {filesByMilestone['general'] && filesByMilestone['general'].length > 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500"><button onClick={() => toggleMilestone('general')} className="flex items-center gap-2 w-full text-left mb-4 group"><div className={`p-1 rounded hover:bg-gray-200 transition-colors ${expandedMilestones['general'] ? 'rotate-90' : ''}`}><ChevronRight size={16} className="text-gray-500" /></div><span className="text-sm font-bold text-gray-700 uppercase tracking-wider">General Resources</span><div className="h-px flex-1 bg-gray-200 group-hover:bg-gray-300 transition-colors"></div></button>{expandedMilestones['general'] && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pl-2">{filesByMilestone['general'].map(renderFileCard)}</div>}</div>
                )}
                {sortedMilestones.map((ms) => {
                    const filesInMs = filesByMilestone[ms.id] || [];
                    if (filesInMs.length === 0) return null; 
                    return (
                        <div key={ms.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500"><button onClick={() => toggleMilestone(ms.id)} className="flex items-center gap-2 w-full text-left mb-4 group"><div className={`p-1 rounded hover:bg-gray-200 transition-colors duration-200 ${expandedMilestones[ms.id] ? 'rotate-90' : ''}`}><ChevronRight size={16} className="text-gray-500" /></div><div className="flex items-center gap-2"><Flag size={16} className={`${theme.text}`} /><span className="text-sm font-bold text-gray-900 uppercase tracking-wider">{ms.title}</span><span className="text-xs text-gray-400 font-medium ml-2">Due {ms.date}</span></div><div className={`h-px flex-1 transition-colors ${theme.bg.replace('bg-', 'bg-').replace('100', '200')}`}></div></button>{expandedMilestones[ms.id] && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pl-2">{filesInMs.map(renderFileCard)}</div>}</div>
                    );
                })}
            </div>
        </div>
    );
};

// 2. Tasks List
export const ProjectTasksList = ({ project, currentUser, onSelectTask }: { project: Project, currentUser: User, onSelectTask: (t: Task) => void }) => {
    const theme = THEME_STYLES[project.theme || 'green'];
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');
    const [viewFilter, setViewFilter] = useState<'all' | 'mine'>('mine');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [tasks, setTasks] = useState(project.tasks);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => { if (filterRef.current && !filterRef.current.contains(event.target as Node)) setShowFilterDropdown(false); };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const parseDate = (dateStr: string) => new Date(`${dateStr}, ${new Date().getFullYear()}`).getTime();
    const handleAddUser = (taskId: string) => {
        const otherUser = users.find(u => u.id !== '1'); 
        if (!otherUser) return;
        setTasks(prev => prev.map(t => { if (t.id === taskId && !t.assigneeIds.includes(otherUser.id)) { return { ...t, assigneeIds: [...t.assigneeIds, otherUser.id] }; } return t; }));
    };

    const filteredTasks = tasks.filter(task => {
        const assignees = users.filter(u => task.assigneeIds.includes(u.id));
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || assignees.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
        const matchesView = viewFilter === 'all' || task.assigneeIds.includes(currentUser.id);
        return matchesSearch && matchesFilter && matchesView;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (a.status === 'completed' && b.status !== 'completed') return 1;
        if (a.status !== 'completed' && b.status === 'completed') return -1;
        const isUrgentA = a.status === 'overdue' || a.status === 'need-help';
        const isUrgentB = b.status === 'overdue' || b.status === 'need-help';
        if (isUrgentA && !isUrgentB) return -1;
        if (!isUrgentA && isUrgentB) return 1;
        return parseDate(a.dueDate) - parseDate(b.dueDate);
    });

    return (
        <div className="flex-1 h-full bg-white flex flex-col min-w-0">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-end">
                <div><h1 className="text-2xl font-bold text-gray-900">Tasks</h1><p className="text-gray-400 text-sm mt-1">Manage deliverables and deadlines.</p></div>
                <div className="flex gap-3 items-center">
                    <div className="flex bg-gray-100 p-1 rounded-lg"><button onClick={() => setViewFilter('mine')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${viewFilter === 'mine' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>My Tasks</button><button onClick={() => setViewFilter('all')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${viewFilter === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>All Tasks</button></div>
                    <div className="relative group"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><input type="text" placeholder="Search tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-gray-200 hover:bg-gray-100 rounded-lg text-sm outline-none transition-all w-48 focus:w-64"/></div>
                    <div className="relative" ref={filterRef}>
                        <button onClick={() => setShowFilterDropdown(!showFilterDropdown)} className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all border ${filterStatus !== 'all' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'text-gray-500 hover:text-gray-900 border-transparent hover:bg-gray-50'}`}><Filter size={16} /><span className="capitalize">{filterStatus === 'all' ? 'Status' : filterStatus.replace('-', ' ')}</span><ChevronDown size={14} className={`transition-transform duration-200 ${showFilterDropdown ? 'rotate-180' : ''}`}/></button>
                        {showFilterDropdown && <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-20 animate-in fade-in zoom-in-95 duration-200"><div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Filter Status</div>{['all', 'not-started', 'in-progress', 'need-review', 'need-help', 'completed'].map(status => (<button key={status} onClick={() => { setFilterStatus(status as any); setShowFilterDropdown(false); }} className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-50 capitalize ${filterStatus === status ? 'text-purple-600 font-medium bg-purple-50' : 'text-gray-600'}`}>{status.replace('-', ' ')}{filterStatus === status && <CheckCircle2 size={14} />}</button>))}</div>}
                    </div>
                    <button className={`flex items-center gap-2 px-4 py-2 ${theme.solid} text-white rounded-lg text-sm font-bold shadow-sm hover:opacity-90 ml-2`}><Plus size={16} /> Add Task</button>
                </div>
            </div>
            <div className="flex items-center px-8 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider"><div className="flex-1 pl-2">Task Name</div><div className="w-40">Assignees</div><div className="w-32">Status</div><div className="w-40 text-right pr-2">Deadlines</div></div>
            <div className="flex-1 overflow-y-auto">
                {sortedTasks.length > 0 ? sortedTasks.map((task) => {
                    return (
                        <div key={task.id} onClick={() => onSelectTask(task)} className="flex items-center px-8 py-4 border-b border-gray-50 hover:bg-gray-50/80 transition-colors group cursor-pointer">
                            <div className={`flex-1 font-medium text-sm pl-2 ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{task.title}</div>
                            <div className="w-40 flex items-center group/assignee"><div className="flex -space-x-2 mr-2">{task.assigneeIds.map(uid => (<MemberAvatar key={uid} userId={uid} size="xs" />))}</div><button onClick={(e) => { e.stopPropagation(); handleAddUser(task.id); }} className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center opacity-0 group-hover/assignee:opacity-100 hover:bg-purple-100 hover:text-purple-600 transition-all" title="Add assignee"><Plus size={12} /></button></div>
                            <div className="w-32"><TaskStatusBadge status={task.status} /></div>
                            <div className="w-40 text-right flex flex-col justify-center pr-2"><div className={`text-xs font-medium ${task.status === 'overdue' ? 'text-red-600' : 'text-gray-900'}`}>{task.dueDate}</div>{task.projectDeadline && <div className="text-[10px] text-gray-400 mt-0.5">Group: {task.projectDeadline}</div>}</div>
                        </div>
                    );
                }) : <div className="flex flex-col items-center justify-center h-64 text-gray-400"><Filter size={32} className="mb-2 opacity-20" /><p className="text-sm">No tasks match.</p></div>}
            </div>
        </div>
    );
};

// 3. Meetings List
export const ProjectMeetingsList = ({ project, onSelectMeeting }: { project: Project, onSelectMeeting: (m: Meeting) => void }) => {
    const upcomingMeetings = project.meetings.filter(m => m.status === 'upcoming').sort((a, b) => new Date(`${a.date} ${a.startTime}`).getTime() - new Date(`${b.date} ${b.startTime}`).getTime());
    const nearestMeetingId = upcomingMeetings.length > 0 ? upcomingMeetings[0].id : null;
    const sortedMeetings = [...project.meetings].sort((a, b) => {
        if (a.status === 'completed' && b.status !== 'completed') return 1;
        if (a.status !== 'completed' && b.status === 'completed') return -1;
        const timeA = new Date(`${a.date} ${a.startTime}`).getTime();
        const timeB = new Date(`${b.date} ${b.startTime}`).getTime();
        return a.status === 'upcoming' ? timeA - timeB : timeB - timeA;
    });

    return (
        <div className="flex-1 h-full bg-white flex flex-col min-w-0">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-end"><div><h1 className="text-2xl font-bold text-gray-900">Meetings</h1><p className="text-gray-400 text-sm mt-1">Schedule and review sessions.</p></div><button className={`flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-bold shadow-sm hover:opacity-90`}><Plus size={16} /> Schedule Meeting</button></div>
            <div className="flex-1 overflow-y-auto p-8 space-y-4">
                {sortedMeetings.map((meeting) => {
                    const isNearest = meeting.id === nearestMeetingId;
                    const showCountdown = isNearest && meeting.status === 'upcoming' && meeting.countdownMinutes && meeting.countdownMinutes <= 60;
                    const isCompleted = meeting.status === 'completed';
                    return (<div key={meeting.id} className={`rounded-xl p-6 flex items-center justify-between transition-all group ${isCompleted ? 'bg-gray-50 border border-gray-100 opacity-80 hover:opacity-100' : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'}`}><div><h3 className={`text-lg font-bold mb-1 ${isCompleted ? 'text-gray-600' : 'text-gray-900'}`}>{meeting.title}</h3><div className="text-sm text-gray-500">{meeting.date} @ {meeting.startTime}</div></div><div className="flex items-center gap-4">{showCountdown && (<div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 animate-pulse"><Clock size={14} className="animate-spin-slow" /><span className="text-xs font-bold">Starts in {meeting.countdownMinutes}m</span></div>)}<button onClick={() => onSelectMeeting(meeting)} className={`px-4 py-2 font-medium text-sm rounded-lg transition-colors ${isCompleted ? 'bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>{isCompleted ? 'View Recording' : 'View'}</button></div></div>);
                })}
            </div>
        </div>
    );
};
