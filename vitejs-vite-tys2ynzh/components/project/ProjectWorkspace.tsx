import React, { useState, useEffect } from 'react';
import { Project, User, Meeting, Task, ProjectFile } from '../../types';
import { initialFiles } from '../../data';
import { ProjectSidebar, ProjectOverview, ProjectChatSidebar } from './ProjectLayout';
import { ProjectFilesList, ProjectTasksList, ProjectMeetingsList } from './ProjectLists';
import { TaskDetailView, MeetingDetailView, FileDetailView } from './ProjectDetails';

const ProjectWorkspace = ({ project, onBack, currentUser }: { project: Project, onBack: () => void, currentUser: User }) => {
    const [activeTab, setActiveTab] = useState('tasks'); 
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(true);

    const handleOpenFile = (file: ProjectFile) => {
        setSelectedFile(file);
    };

    useEffect(() => { 
        setSelectedMeeting(null); 
        setSelectedTask(null);
        setSelectedFile(null);
    }, [activeTab]);

    // If file is selected, show file detail view full screen (covering sidebar potentially, or inside main area)
    // Design choice: Hide standard sidebar when editing a file for more space? 
    // For now, let's keep the sidebar but make the file view take the main content area.
    
    if (selectedFile) {
        return (
            <div className="h-full w-full bg-white">
                <FileDetailView 
                    file={selectedFile} 
                    project={project} 
                    currentUser={currentUser} 
                    onBack={() => setSelectedFile(null)} 
                />
            </div>
        );
    }

    return (
        <div className="h-full flex bg-white animate-in fade-in duration-300 w-full">
             <ProjectSidebar project={project} activeTab={activeTab} setActiveTab={setActiveTab} onBack={onBack} />
             
             {activeTab === 'overview' && <ProjectOverview project={project} />}
             
             {activeTab === 'tasks' && !selectedTask && <ProjectTasksList project={project} currentUser={currentUser} onSelectTask={setSelectedTask} />}
             {activeTab === 'tasks' && selectedTask && (
                 <TaskDetailView 
                    task={selectedTask} 
                    onBack={() => setSelectedTask(null)} 
                    currentUser={currentUser} 
                    allFiles={initialFiles}
                    onOpenFile={handleOpenFile}
                    onAddUser={()=>{alert('Mock: User added')}}
                    onUpdateStatus={()=>{alert('Mock: Status updated')}}
                 />
             )}

             {activeTab === 'files' && <ProjectFilesList project={project} files={initialFiles} onOpenFile={handleOpenFile} />}
             
             {activeTab === 'meetings' && !selectedMeeting && <ProjectMeetingsList project={project} onSelectMeeting={setSelectedMeeting} />}
             {activeTab === 'meetings' && selectedMeeting && <MeetingDetailView meeting={selectedMeeting} onBack={() => setSelectedMeeting(null)} />}
             
             {/* Fallback */}
             {(activeTab !== 'overview' && activeTab !== 'tasks' && activeTab !== 'meetings' && activeTab !== 'files') && (<div className="flex-1 p-8 overflow-y-auto"><h2 className="text-2xl font-bold mb-4 capitalize">{activeTab} View</h2><p className="text-gray-500">Content for {activeTab} coming soon...</p></div>)}

             <ProjectChatSidebar project={project} currentUser={currentUser} isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
        </div>
    );
};

export default ProjectWorkspace;