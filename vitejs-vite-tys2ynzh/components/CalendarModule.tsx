import React, { useState, useMemo } from 'react';
import { User, Users, ChevronLeft, ChevronRight, Video, CheckCircle2, Clock, Plus, Filter, LayoutGrid } from 'lucide-react';
import { Project } from '../types';
import { THEME_STYLES, users, currentUser } from '../data';
import { MemberAvatar } from './Shared';

const CalendarModule = ({ projects }: { projects: Project[] }) => {
    const [view, setView] = useState<'personal' | 'team'>('personal');
    const [calendarViewMode, setCalendarViewMode] = useState<'month' | 'week'>('month');
    const [month] = useState('December 2025'); // Mock current month
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [filterType, setFilterType] = useState<'all' | 'meeting' | 'task'>('all');
    const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('all');
    
    // Transform Project Data into Calendar Events
    const calendarEvents = useMemo(() => {
        const events: any[] = [];
        const currentMonthShort = 'Dec'; // Matches mock data context

        projects.forEach(project => {
            // Team View: Filter by Project Selection
            if (view === 'team' && selectedProjectFilter !== 'all' && project.id !== selectedProjectFilter) return;

            // 1. Process Tasks
            project.tasks.forEach(task => {
                // Personal View: Only show assigned tasks
                if (view === 'personal' && !task.assigneeIds.includes(currentUser.id)) return;

                const [m, d] = task.dueDate.split(' ');
                if (m === currentMonthShort) {
                    events.push({
                        id: task.id,
                        day: parseInt(d),
                        title: task.title,
                        type: 'task',
                        theme: project.theme,
                        details: { 
                            assignee: task.assigneeIds[0], 
                            status: task.status, 
                            project: project.name,
                            description: task.description 
                        }
                    });
                }
            });

            // 2. Process Meetings
            project.meetings.forEach(meeting => {
                // Personal View: Only show relevant meetings
                if (view === 'personal' && !meeting.participants.includes(currentUser.id)) return;

                const [m, d] = meeting.date.split(' ');
                if (m === currentMonthShort) {
                    events.push({
                        id: meeting.id,
                        day: parseInt(d),
                        title: meeting.title,
                        time: meeting.startTime,
                        type: 'meeting',
                        theme: project.theme,
                        details: { 
                            participants: meeting.participants, 
                            desc: meeting.title, 
                            project: project.name,
                            duration: meeting.duration
                        }
                    });
                }
            });
        });
        return events.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    }, [projects, view, selectedProjectFilter]);

    const allDays = Array.from({ length: 35 }, (_, i) => i + 1);
    const daysToShow = calendarViewMode === 'week' ? [8, 9, 10, 11, 12, 13, 14] : allDays;
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    
    const handleEventClick = (event: any) => setSelectedEvent(event);
    const toggleFilter = (type: 'meeting' | 'task') => setFilterType(prev => prev === type ? 'all' : type);
    
    return (
        <div className="flex h-full bg-gray-50 overflow-hidden relative">
             <div className="flex-1 flex flex-col h-full bg-white border-r border-gray-200 overflow-hidden">
                 {/* Header */}
                 <div className="h-16 border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
                     <h1 className="text-2xl font-bold text-gray-900">{view === 'personal' ? 'My Calendar' : 'Team Calendar'}</h1>
                     <div className="flex items-center gap-3">
                         <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                             <button onClick={() => setView('personal')} className={`flex items-center px-4 py-2 text-xs font-bold rounded-md transition-all ${view === 'personal' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                                 <User size={14} className="mr-2"/> Personal
                             </button>
                             <button onClick={() => setView('team')} className={`flex items-center px-4 py-2 text-xs font-bold rounded-md transition-all ${view === 'team' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                                 <Users size={14} className="mr-2"/> Team View
                             </button>
                         </div>
                     </div>
                 </div>

                 {/* Controls Bar */}
                 <div className="px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex bg-gray-100 rounded-lg p-0.5 border border-gray-200">
                            <button onClick={() => setCalendarViewMode('month')} className={`px-4 py-1.5 rounded-md text-xs font-bold border ${calendarViewMode === 'month' ? 'bg-white shadow-sm border-gray-200 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Month</button>
                            <button onClick={() => setCalendarViewMode('week')} className={`px-4 py-1.5 rounded-md text-xs font-bold border ${calendarViewMode === 'week' ? 'bg-white shadow-sm border-gray-200 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>Week</button>
                        </div>
                        <div className="h-6 w-px bg-gray-200"></div>
                        
                        {view === 'personal' ? (
                            <div className="flex gap-2">
                                <button onClick={() => toggleFilter('meeting')} className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all border ${filterType === 'meeting' || filterType === 'all' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-gray-50 text-gray-400 border-transparent'}`}>Meetings</button>
                                <button onClick={() => toggleFilter('task')} className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all border ${filterType === 'task' || filterType === 'all' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-gray-50 text-gray-400 border-transparent'}`}>Tasks</button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><Filter size={12}/> Project:</span>
                                <select 
                                    value={selectedProjectFilter} 
                                    onChange={(e) => setSelectedProjectFilter(e.target.value)}
                                    className="bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg px-2 py-1.5 outline-none focus:border-purple-300 shadow-sm"
                                >
                                    <option value="all">All Projects</option>
                                    {projects.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg border border-gray-200"><ChevronLeft size={16}/></button>
                        <span className="text-base font-bold text-gray-900 w-32 text-center">{month}</span>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg border border-gray-200"><ChevronRight size={16}/></button>
                    </div>
                 </div>

                 {/* Calendar Grid */}
                 <div className="flex-1 overflow-y-auto px-8 pb-8">
                     {calendarViewMode === 'month' && (
                        <div className="grid grid-cols-7 mb-4">
                            {weekDays.map(d => (<div key={d} className="text-xs font-bold text-gray-400 text-center uppercase tracking-wider">{d}</div>))}
                        </div>
                     )}
                     <div className={calendarViewMode === 'month' ? 'grid grid-cols-7 grid-rows-5 h-[650px] gap-4' : 'flex flex-col gap-4 h-full'}>
                        {daysToShow.map((day, i) => { 
                            const dayEvents = calendarEvents.filter(e => e.day === day && (filterType === 'all' || e.type === filterType)); 
                            const isToday = day === 14; // Mock Today
                            
                            return (
                                <div key={i} className={`border rounded-2xl relative transition-all hover:shadow-md group ${isToday ? 'bg-purple-50/30 border-purple-200 shadow-sm ring-2 ring-purple-100' : 'bg-white border-gray-100'} ${calendarViewMode === 'week' ? 'flex flex-row items-start p-4 min-h-[120px]' : 'flex flex-col gap-2 p-3'}`}>
                                    <div className={calendarViewMode === 'week' ? 'w-24 border-r border-gray-100 pr-4 flex flex-col items-center justify-center' : ''}>
                                        <span className={`font-bold ${calendarViewMode === 'week' ? 'text-2xl' : 'text-sm'} ${isToday ? 'text-purple-600' : 'text-gray-400'}`}>
                                            {day <= 31 ? day : ''}
                                        </span>
                                        {calendarViewMode === 'week' && (
                                            <span className="text-[10px] font-bold text-gray-400 uppercase mt-1">{weekDays[i]}</span>
                                        )}
                                    </div>
                                    
                                    {isToday && <span className={`absolute font-extrabold bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full ${calendarViewMode === 'week' ? 'text-[10px] top-4 right-4' : 'text-[10px] top-3 right-3'}`}>TODAY</span>}
                                    
                                    <div className={`flex-1 ${calendarViewMode === 'week' ? 'flex flex-row gap-3 overflow-x-auto pl-4 items-center' : 'flex flex-col gap-2 overflow-y-auto no-scrollbar'}`}>
                                        {dayEvents.map((evt) => (
                                            <div key={evt.id} onClick={() => handleEventClick(evt)} className={`cursor-pointer font-bold rounded-lg border-l-4 truncate flex items-center gap-2 transition-colors hover:brightness-95 ${calendarViewMode === 'week' ? 'px-4 py-3 text-xs min-w-[180px]' : 'px-2 py-1.5 text-[10px]'} ${THEME_STYLES[evt.theme || 'blue'].bg} ${THEME_STYLES[evt.theme || 'blue'].text} ${THEME_STYLES[evt.theme || 'blue'].border.replace('border-', 'border-l-')}`}>
                                                {evt.type === 'meeting' ? <Video size={calendarViewMode === 'week' ? 16 : 12}/> : <CheckCircle2 size={calendarViewMode === 'week' ? 16 : 12}/>} 
                                                <div className="flex flex-col truncate min-w-0">
                                                    <span className="truncate">{evt.title}</span>
                                                    {calendarViewMode === 'week' && (
                                                        <div className="flex items-center gap-1 opacity-80 font-medium">
                                                            {evt.time && <span>{evt.time}</span>}
                                                            {evt.type === 'task' && <span className="uppercase text-[8px] border border-current px-1 rounded">Task</span>}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        {dayEvents.length === 0 && view === 'team' && calendarViewMode === 'month' && day <= 31 && (
                                            <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-300 hover:text-purple-600"><Plus size={14}/></button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                     </div>
                 </div>
             </div>

             {/* Event Detail Sidebar */}
             <div className={`border-l border-gray-200 bg-white shadow-xl transition-all duration-300 ease-in-out absolute right-0 top-0 bottom-0 z-20 ${selectedEvent ? 'w-80 translate-x-0' : 'w-80 translate-x-full'}`}>
                {selectedEvent ? (
                    <div className="h-full flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-900">Event Details</h3>
                            <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-600"><Plus size={20} className="rotate-45"/></button>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto">
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold mb-4 uppercase tracking-wider ${THEME_STYLES[selectedEvent.theme || 'blue'].bg} ${THEME_STYLES[selectedEvent.theme || 'blue'].text}`}>
                                {selectedEvent.type === 'meeting' ? <Video size={12}/> : <CheckCircle2 size={12}/>}
                                {selectedEvent.type}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                            <div className="text-sm font-bold text-gray-500 mb-6 flex items-center gap-1">
                                <LayoutGrid size={12}/> {selectedEvent.details?.project}
                            </div>
                            
                            <div className="space-y-6">
                                {selectedEvent.time && (
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase mb-1">Time</div>
                                        <div className="flex items-center gap-2 text-gray-700"><Clock size={16}/> {selectedEvent.time} {selectedEvent.details?.duration && `• ${selectedEvent.details.duration}`}</div>
                                    </div>
                                )}
                                {selectedEvent.details?.participants && (
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase mb-2">Participants</div>
                                        <div className="flex -space-x-2">
                                            {selectedEvent.details.participants.map((pid: string) => (<MemberAvatar key={pid} userId={pid} size="xs" />))}
                                        </div>
                                    </div>
                                )}
                                {selectedEvent.details?.assignee && (
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase mb-2">Assignee</div>
                                        <div className="flex items-center gap-2">
                                            <MemberAvatar userId={selectedEvent.details.assignee} size="xs" />
                                            <span className="text-sm font-medium text-gray-700">{users.find(u=>u.id===selectedEvent.details.assignee)?.name}</span>
                                        </div>
                                    </div>
                                )}
                                {selectedEvent.details?.desc && (
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase mb-1">Description</div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{selectedEvent.details.desc}</p>
                                    </div>
                                )}
                                {selectedEvent.details?.description && (
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase mb-1">Task Details</div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{selectedEvent.details.description}</p>
                                    </div>
                                )}
                                {selectedEvent.type === 'task' && (
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                                        <button className="text-sm font-bold text-purple-600 hover:underline">Go to Task Page</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center p-8"><p className="text-gray-400">Select an event</p></div>
                )}
             </div>
        </div>
    );
};

export default CalendarModule;