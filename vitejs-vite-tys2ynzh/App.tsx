import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CalendarModule from './components/CalendarModule';
import MessagesModule from './components/MessagesModule';
import ProjectWorkspace from './components/project/ProjectWorkspace';
import { mockProjects, users, currentUser } from './data';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const activeProject = mockProjects.find(p => p.id === activeProjectId);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      <Sidebar 
        activeTab={activeProjectId ? 'workspaces' : activeTab} 
        setActiveTab={(tab: string) => { setActiveTab(tab); if(tab!=='workspaces') setActiveProjectId(null); }} 
        collapsed={!!activeProjectId && !!activeProject} 
      />
      <main className="flex-1 h-full overflow-hidden relative flex flex-col">
        {activeProjectId && activeProject ? (
            <ProjectWorkspace project={activeProject} onBack={() => setActiveProjectId(null)} currentUser={currentUser} />
        ) : (
            <>
              {activeTab === 'dashboard' && (
                  <div className="p-8 h-full overflow-y-auto">
                       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {mockProjects.map(p => (
                           <div key={p.id} onClick={() => setActiveProjectId(p.id)} className="bg-white p-6 rounded-xl border border-gray-200 cursor-pointer hover:shadow-lg transition-all group">
                             <div className="flex justify-between items-end mb-4">
                               <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{p.name}</h2>
                               <span className={`text-sm font-bold ${p.theme === 'green' ? 'text-emerald-600' : 'text-blue-600'}`}>{p.teamProgress}%</span>
                             </div>
                             <p className="text-sm text-gray-500 mb-6 line-clamp-2">{p.description}</p>
                             <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                               <div className={`h-full ${p.theme === 'green' ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{width: `${p.teamProgress}%`}}></div>
                             </div>
                             <div className="mt-4 flex -space-x-2">
                               {p.members.map(m => (
                                 <img key={m.id} src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full border-2 border-white" title={m.name} />
                               ))}
                             </div>
                           </div>
                         ))}
                       </div>
                  </div>
              )}
              {activeTab === 'calendar' && (
                  <CalendarModule projects={mockProjects} />
              )}
              {activeTab === 'messages' && (
                  <MessagesModule projects={mockProjects} users={users} currentUser={currentUser} />
              )}
              {(activeTab !== 'dashboard' && activeTab !== 'messages' && activeTab !== 'calendar') && (
                   <div className="h-full flex items-center justify-center text-gray-400">Module: {activeTab}</div>
              )}
            </>
        )}
      </main>
    </div>
  );
};

export default App;
