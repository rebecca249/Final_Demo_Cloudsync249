import { Project, ProjectFile, User, ThemeStyle } from './types';
import { 
    LayoutDashboard, CheckCircle2, Calendar as CalendarIcon, Folders, Plus, Filter, AlertCircle, Grid, 
    ListTodo, UserPlus, HelpCircle, Video, Clock, History, User as UserIcon, Users, ArrowUpDown, MousePointer2, 
    Hash, Paperclip, Smile, MessageSquare, ExternalLink, PieChart, CheckSquare 
} from 'lucide-react';

export const THEME_STYLES: Record<string, ThemeStyle> = {
    purple: { bg: 'bg-purple-100', text: 'text-purple-700', bar: 'bg-purple-600', solid: 'bg-purple-600', light: 'bg-purple-50', border: 'border-purple-200', ring: 'ring-purple-100' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-700', bar: 'bg-blue-600', solid: 'bg-blue-600', light: 'bg-blue-50', border: 'border-blue-200', ring: 'ring-blue-100' },
    green: { bg: 'bg-emerald-100', text: 'text-emerald-700', bar: 'bg-emerald-500', solid: 'bg-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200', ring: 'ring-emerald-100' },
    red: { bg: 'bg-red-100', text: 'text-red-700', bar: 'bg-red-500', solid: 'bg-red-600', light: 'bg-red-50', border: 'border-red-200', ring: 'ring-red-100' }, 
};

export const HELP_CONTENT = {
    'dashboard': {
        title: 'Dashboard Guide',
        items: [
            { icon: LayoutDashboard, text: 'Overview of all your active projects.' },
            { icon: PieChart, text: 'Track team progress at a glance.' },
            { icon: Users, text: 'See team members involved in each project.' },
            { icon: MousePointer2, text: 'Click any Project Card to enter Workspace.' }
        ]
    },
    'files': {
        title: 'Files & Resources',
        items: [
            { icon: Plus, text: 'Click "Upload" to add new materials.' },
            { icon: Filter, text: 'Toggle "Hide Instructor" to focus on team files.' },
            { icon: AlertCircle, text: 'Files needing attention show a red "Need Help" badge.' },
            { icon: Grid, text: 'Group files by Milestone to stay organized.' }
        ]
    },
    'tasks': {
        title: 'Task Management',
        items: [
            { icon: ListTodo, text: 'View tasks by "All" or "My Tasks".' },
            { icon: AlertCircle, text: 'Overdue tasks appear at the top in red.' },
            { icon: UserPlus, text: 'Click task to assign multiple members.' },
            { icon: HelpCircle, text: 'Stuck? Change status to "Need Help" in details.' }
        ]
    },
    'meetings': {
        title: 'Meetings Hub',
        items: [
            { icon: Video, text: 'Join calls directly from the "Upcoming" card.' },
            { icon: Clock, text: 'Countdown appears 1hr before meeting starts.' },
            { icon: History, text: 'Click past meetings to view Recordings & AI Summaries.' },
            { icon: Plus, text: 'Schedule new syncs using the top button.' }
        ]
    },
    'calendar': {
        title: 'Calendar Views',
        items: [
            { icon: UserIcon, text: 'Personal View: Your deadlines & assignments.' },
            { icon: Users, text: 'Team View: All group syncs & milestones.' },
            { icon: ArrowUpDown, text: 'Switch between Month/Week views.' },
            { icon: MousePointer2, text: 'Click any event slot to see details.' }
        ]
    },
    'messages': {
        title: 'Communication',
        items: [
            { icon: Hash, text: 'Use #general for team announcements.' },
            { icon: AlertCircle, text: '#task-help syncs with "Need Help" status.' },
            { icon: Paperclip, text: 'Drag & drop files to share with the team.' },
            { icon: CheckCircle2, text: 'See who read your message with hover receipts.' }
        ]
    },
    'editor': {
        title: 'Editor & Collaboration',
        items: [
            { icon: Smile, text: 'Type / to add elements or emojis.' },
            { icon: MessageSquare, text: 'Chat on the right syncs to #file-chats.' },
            { icon: History, text: 'Changes are auto-saved and logged.' },
            { icon: ExternalLink, text: 'Click "Share" to invite instructors.' }
        ]
    },
    'workspaces': { 
        title: 'Project Workspace',
        items: [
             { icon: PieChart, text: 'Overview: Track progress and contributions.' },
             { icon: CheckSquare, text: 'Tasks: Manage assignments and deadlines.' },
             { icon: Video, text: 'Meetings: Schedule and review syncs.' },
             { icon: Folders, text: 'Files: Access all project materials.' }
        ]
    }
};

export const users: User[] = [
  { id: '1', name: 'Emma Liu', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', role: 'Leader', workloadScore: 85 },
  { id: '2', name: 'Dani Park', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dani', role: 'Member', workloadScore: 45 },
  { id: '3', name: 'Rebecca Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rebecca', role: 'Member', workloadScore: 65 }, 
  { id: '4', name: 'Charlotte Gao', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte', role: 'Member', workloadScore: 60 },
  { id: 'prof', name: 'Prof. Miller', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Prof', role: 'Member', workloadScore: 0 },
  { id: '5', name: 'Yani Tian', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yani', role: 'Member', workloadScore: 92 }, 
];

export const currentUser = users[0];

export const initialFiles: ProjectFile[] = [
  { id: 'f_inst_1', title: 'Assignment 3 Guidelines', type: 'doc', projectId: 'p1', status: 'completed', category: 'course', progress: 100, members: ['prof'], lastModified: 'Oct 10', activityLogs: [], milestoneId: 'ms3' },
  { id: 'f_inst_2', title: 'Course Syllabus & Rubric', type: 'doc', projectId: 'p1', status: 'completed', category: 'course', progress: 100, members: ['prof'], lastModified: 'Oct 1', activityLogs: [] },
  { id: 'f_proj_1', title: 'User Research Report', type: 'doc', projectId: 'p1', status: 'completed', category: 'project', progress: 100, members: ['1', '2'], lastModified: '2 hours ago', activityLogs: [{ id: 'a1', userId: '2', action: 'updated the Introduction', timestamp: '10:42 AM', type: 'edit' }], milestoneId: 'ms1' },
  { id: 'f_proj_2', title: 'User Journey Map', type: 'board', projectId: 'p1', status: 'in-progress', category: 'project', progress: 65, members: ['1', '2'], lastModified: '1 day ago', activityLogs: [], milestoneId: 'ms1' },
  { id: 'f_proj_3', title: 'Final Presentation Deck', type: 'slide', projectId: 'p1', status: 'need-help', category: 'project', progress: 20, members: ['1'], lastModified: '30 mins ago', helpRequest: { type: 'clarification', message: 'Need feedback on slide 4.' }, activityLogs: [], milestoneId: 'ms3' },
  { id: 'f_proj_4', title: 'Budget & Cost Analysis', type: 'sheet', projectId: 'p1', status: 'not-started', category: 'project', progress: 0, members: ['3'], lastModified: '3 days ago', activityLogs: [], milestoneId: 'ms2' },
  { id: 'f_proj_5', title: 'Competitor Analysis', type: 'board', projectId: 'p1', status: 'completed', category: 'project', progress: 100, members: ['2', '4'], lastModified: '5 days ago', activityLogs: [], milestoneId: 'ms1' }
];

export const mockProjects: Project[] = [
    {
      id: 'p1', name: 'UX design project', description: 'Designing the user experience for the new collaborative platform.', members: users.slice(0, 4), teamProgress: 75, personalProgress: 80, theme: 'green',
      milestones: [
          { id: 'ms1', title: 'Research Phase', date: 'Oct 10', status: 'completed', ownerId: '1', projectId: 'p1' },
          { id: 'ms2', title: 'Wireframes', date: 'Oct 15', status: 'completed', ownerId: '2', projectId: 'p1' },
          { id: 'ms3', title: 'Hi-Fi Prototypes', date: 'Oct 20', status: 'upcoming', ownerId: '3', projectId: 'p1' },
      ],
      tasks: [
        { id: 't1', title: 'User Research Analysis', description: 'Analyze results.', assigneeIds: ['1'], status: 'completed', progress: 100, dueDate: 'Oct 12', projectDeadline: 'Oct 15', priority: 'high', projectId: 'p1', relatedFileId: 'f_proj_1' },
        { id: 't-em', title: 'Empathy Maps', description: 'Create user empathy maps.', assigneeIds: ['2'], status: 'completed', progress: 100, dueDate: 'Oct 15', projectDeadline: 'Oct 15', priority: 'high', projectId: 'p1' },
        { id: 't-sd', title: 'Slide Deck Structure', description: 'Outline presentation.', assigneeIds: ['3'], status: 'in-progress', progress: 50, dueDate: 'Oct 20', projectDeadline: 'Oct 20', priority: 'medium', projectId: 'p1', relatedFileId: 'f_proj_3' },
        { id: 't2', title: 'Prototype Interaction', description: 'Wire up flows.', assigneeIds: ['1', '2'], status: 'need-review', progress: 90, dueDate: 'Oct 19', projectDeadline: 'Oct 20', priority: 'high', projectId: 'p1', relatedFileId: 'f_proj_2' },
        { id: 't-ba', title: 'Backend API Integration', description: 'Connect backend.', assigneeIds: ['4'], status: 'need-help', progress: 10, dueDate: 'Oct 30', projectDeadline: 'Oct 30', priority: 'medium', projectId: 'p1', isOverdue: false },
        { id: 't-doc', title: 'Documentation', description: 'Write API docs.', assigneeIds: ['4'], status: 'not-started', progress: 0, dueDate: 'Oct 31', projectDeadline: 'Oct 31', priority: 'low', projectId: 'p1' },
        { id: 't-ux', title: 'Read Chapter 4: UX Metrics', description: 'Read the chapter and summarize key metrics for our project. This will be used in the quiz next week.', assigneeIds: ['1'], status: 'not-started', progress: 0, dueDate: 'Oct 16', projectDeadline: 'Oct 17', priority: 'medium', projectId: 'p1', relatedFiles: [{ name: 'In-class Notes - Week 3.pdf', type: 'PDF', size: '1.2 MB' }, { name: 'UX Metrics Textbook - Ch4.pdf', type: 'PDF', size: '4.5 MB' }] },
      ],
      meetings: [
        { id: 'm1', title: 'Weekly Kick-off', date: 'Dec 02', startTime: '10:00 AM', duration: '1h', participants: ['1', '2', '3', '4'], type: 'Project', status: 'completed', summary: 'Initial kickoff.', keyDecisions: ['Use vertical nav', 'Emerald green theme approved'], actionItems: [{ text: 'Update UI Kit', assigneeId: '2' }], agenda: ['Review Timeline', 'Blockers'], materials: [{ name: 'Kickoff_Deck_v3.pdf', type: 'PDF', size: '2.4 MB' }, { name: 'Research_Findings.docx', type: 'DOC', size: '1.1 MB' }], transcript: [{ user: 'Emma', time: '00:05', text: 'Alright, let\'s get started.' }, { user: 'Dani', time: '00:12', text: 'Yes, I think the deadlines are manageable.' }] },
        { id: 'm3', title: 'Final Presentation Prep', date: 'Dec 10', startTime: '11:00 AM', duration: '2h', participants: ['1', '2', '3', '4'], type: 'Project', status: 'upcoming', agenda: ['Dry run'], countdownMinutes: 45 },
        { id: 'm4', title: 'Design Review', date: 'Dec 12', startTime: '2:00 PM', duration: '1h', participants: ['1', '4'], type: 'Project', status: 'upcoming', agenda: ['Review Wireframes', 'Feedback Session'] },
      ]
    },
    {
        id: 'p2', name: 'Web design project', description: 'Implementation of the e-commerce store backend.', members: [users[0], users[5]], teamProgress: 40, personalProgress: 30, theme: 'blue', milestones: [],
        tasks: [
            { id: 't-web-1', title: 'Database Setup', description: 'Init Postgres.', assigneeIds: ['1'], status: 'in-progress', progress: 60, dueDate: 'Dec 06', priority: 'high', projectId: 'p2' },
            { id: 't-web-5', title: 'Backend API', description: 'Connect backend.', assigneeIds: ['5'], status: 'need-help', progress: 10, dueDate: 'Dec 08', priority: 'medium', projectId: 'p2' }
        ],
        meetings: [
            { id: 'm-web-1', title: 'Client Requirement Sync', date: 'Dec 05', startTime: '1:00 PM', duration: '30m', participants: ['1', '5'], type: 'Project', status: 'upcoming', agenda: ['Requirement check'] },
            { id: 'm-web-2', title: 'Sprint Planning', date: 'Dec 07', startTime: '4:00 PM', duration: '1h', participants: ['1', '5'], type: 'Project', status: 'upcoming', agenda: ['Backlog grooming', 'Role assignment'] }
        ]
    }
];