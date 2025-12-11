export type FileType = 'doc' | 'slide' | 'board' | 'sheet' | 'JSON' | 'PDF';
export type FileStatus = 'not-started' | 'in-progress' | 'need-help' | 'completed';
export type FileCategory = 'course' | 'project'; 
export type TaskStatus = 'not-started' | 'in-progress' | 'need-review' | 'need-help' | 'completed' | 'overdue';
export type HelpType = 'clarification' | 'dependency' | 'overloaded' | 'instructor';
export type Role = 'Leader' | 'Member';

export interface User { 
    id: string; 
    name: string; 
    avatar: string; 
    role: Role; 
    workloadScore: number; 
}

export interface Task { 
    id: string; 
    title: string; 
    description: string; 
    assigneeIds: string[]; 
    status: TaskStatus; 
    progress: number; 
    dueDate: string; 
    projectDeadline?: string; 
    priority: 'high' | 'medium' | 'low'; 
    relatedFileId?: string; 
    projectId: string; 
    isOverdue?: boolean; 
    relatedFiles?: { name: string; type: string; size: string }[]; 
}

export interface Meeting { 
    id: string; 
    title: string; 
    date: string; 
    startTime: string; 
    duration: string; 
    participants: string[]; 
    type: 'Project' | 'Personal'; 
    status: 'completed' | 'upcoming'; 
    summary?: string; 
    keyDecisions?: string[]; 
    actionItems?: { text: string; assigneeId: string }[]; 
    agenda?: string[]; 
    materials?: { name: string; type: string; size: string }[]; 
    transcript?: { user: string; time: string; text: string }[]; 
    countdownMinutes?: number; 
    recordingUrl?: string; 
    projectTheme?: string; 
    projectName?: string; 
}

export interface Milestone { 
    id: string; 
    title: string; 
    date: string; 
    status: 'completed' | 'upcoming' | 'overdue'; 
    ownerId: string; 
    projectId: string; 
}

export interface ProjectFile { 
    id: string; 
    title: string; 
    type: FileType; 
    projectId: string; 
    status: FileStatus; 
    category: FileCategory; 
    progress: number; 
    members: string[]; 
    lastModified: string; 
    content?: string; 
    helpRequest?: { type: string; message: string; }; 
    activityLogs: ActivityLog[]; 
    milestoneId?: string; 
}

export interface ActivityLog { 
    id: string; 
    userId: string; 
    action: string; 
    timestamp: string; 
    type: 'edit' | 'comment' | 'status_change' | 'help_request' | 'log'; 
    text?: string; 
}

export interface Project { 
    id: string; 
    name: string; 
    description: string; 
    members: User[]; 
    teamProgress: number; 
    personalProgress: number; 
    theme: 'purple' | 'blue' | 'green' | 'red'; 
    milestones: Milestone[]; 
    tasks: Task[]; 
    meetings: Meeting[]; 
}

export interface ThemeStyle {
    bg: string;
    text: string;
    bar: string;
    solid: string;
    light: string;
    border: string;
    ring: string;
}
