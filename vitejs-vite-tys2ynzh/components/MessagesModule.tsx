import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Hash, AlertCircle, Plus, ImageIcon, Paperclip, Smile, Send, Presentation } from 'lucide-react';
import { Project, User } from '../types';
import { THEME_STYLES } from '../data';
import { MemberAvatar, CloudyLogo } from './Shared';

const MessagesModule = ({ projects, users, currentUser }: { projects: Project[], users: User[], currentUser: User }) => {
    const [activeChannelId, setActiveChannelId] = useState('general-p1');
    const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
    const [inputMessage, setInputMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    
    const emojiList = ['😀', '😂', '😍', '👍', '👎', '🔥', '🎉', '💯', '🚀', '👀', '❤️', '🤔'];
    
    const CHANNEL_MESSAGES: Record<string, any[]> = {
        'general-p1': [
            { id: '1', user: users[1], content: 'Has anyone seen the storyboard updates?', time: '10:00 AM', reactions: ['👀'], readBy: ['1', '3', '4'] },
            { id: '2', user: users[2], content: 'Yes! It looks great. I linked it to the task.', time: '10:05 AM', reactions: ['🔥'], isReply: true, replyTo: 'Referencing Task #t1', readBy: ['1', '2', '4'] },
            { id: '3', user: users[3], content: 'I am having some trouble with the API timeout issue. Can someone help?', time: '10:15 AM', reactions: [], readBy: ['1', '2'], type: 'help' },
            { id: '4', user: currentUser, content: 'I can take a look after lunch.', time: '10:20 AM', reactions: ['👍'], readBy: [] },
            { id: '5', user: users[1], content: 'I uploaded the latest deck.', time: '10:30 AM', type: 'file', fileName: 'Pitch_Deck_v4.pptx', fileType: 'slide', readBy: ['1', '4'] }
        ],
        'general-p2': [
            { id: 'w1', user: users[5], content: 'Hey team, just pushed the initial Postgres schema to the repo.', time: '09:30 AM', reactions: ['🚀'], readBy: ['1'] },
            { id: 'w2', user: currentUser, content: 'Thanks Yani! I will review the PR this afternoon.', time: '09:45 AM', reactions: ['👍'], readBy: ['5'] },
            { id: 'w3', user: users[5], content: 'I am also looking into the Stripe API for payments. Might need some help with the webhooks later.', time: '10:00 AM', type: 'help', readBy: [] },
            { id: 'w4', user: currentUser, content: 'No problem. Let\'s sync on the API endpoints tomorrow morning.', time: '10:15 AM', reactions: [], readBy: [] },
        ]
    };

    const [messages, setMessages] = useState(CHANNEL_MESSAGES['general-p1']);

    useEffect(() => {
        if (CHANNEL_MESSAGES[activeChannelId]) {
            setMessages(CHANNEL_MESSAGES[activeChannelId]);
        } else {
            setMessages([]);
        }
    }, [activeChannelId]);

    useEffect(() => {
        const initialExpanded: Record<string, boolean> = {};
        projects.forEach(p => initialExpanded[p.id] = true);
        setExpandedProjects(initialExpanded);
    }, [projects]);

    const toggleProject = (pId: string) => setExpandedProjects(prev => ({ ...prev, [pId]: !prev[pId] }));

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;
        setMessages([...messages, {
            id: Date.now().toString(),
            user: currentUser,
            content: inputMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            reactions: [],
            readBy: []
        }]);
        setInputMessage('');
    };

    const handleAddEmoji = (emoji: string) => {
        setInputMessage(prev => prev + emoji);
        setShowEmojiPicker(false);
    };

    const activeProject = projects.find(p => activeChannelId.includes(p.id)) || projects[0];
    const theme = THEME_STYLES[activeProject.theme || 'green'];

    return (
        <div className="flex h-full bg-white">
            <div className="w-64 border-r border-gray-200 bg-gray-50/50 flex flex-col">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input type="text" placeholder="Jump to..." className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-purple-300 outline-none"/>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-6">
                    {projects.map(p => (
                        <div key={p.id}>
                            <button onClick={() => toggleProject(p.id)} className="flex items-center gap-2 w-full text-left mb-1 px-2 py-1 hover:bg-gray-100 rounded-lg group">
                                <span className={`w-2 h-2 rounded-full ${THEME_STYLES[p.theme].solid}`}></span>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex-1">{p.name}</span>
                                <ChevronDown size={14} className={`text-gray-400 transition-transform ${expandedProjects[p.id] ? '' : '-rotate-90'}`} />
                            </button>
                            {expandedProjects[p.id] && (
                                <div className="space-y-0.5 ml-2">
                                    <button onClick={() => setActiveChannelId(`general-${p.id}`)} className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm ${activeChannelId === `general-${p.id}` ? 'bg-white shadow-sm text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}><Hash size={14} className="text-gray-400" /> general</button>
                                    <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100"><Hash size={14} className="text-gray-400" /> meeting-notes</button>
                                    <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100"><AlertCircle size={14} className="text-orange-400" /> task-help</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 flex flex-col min-w-0 bg-white">
                <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6"><div><div className="flex items-center gap-2 text-lg font-bold text-gray-900"><Hash size={20} className="text-gray-400" /> general</div></div></div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex gap-4 group ${msg.user.id === currentUser.id ? 'flex-row-reverse' : ''}`}>
                            <MemberAvatar userId={msg.user.id} size="md" />
                            <div className={`flex flex-col max-w-[70%] ${msg.user.id === currentUser.id ? 'items-end' : 'items-start'}`}>
                                <div className="flex items-baseline gap-2 mb-1"><span className="font-bold text-sm text-gray-900">{msg.user.name}</span><span className="text-[10px] text-gray-400">{msg.time}</span></div>
                                <div className={`relative px-4 py-3 rounded-2xl text-sm shadow-sm border ${msg.user.id === currentUser.id ? `bg-${activeProject.theme}-600 text-white` : 'bg-white text-gray-800 border-gray-200'}`}>
                                    {msg.type === 'file' ? (
                                        <div className="flex items-center gap-3 bg-white/90 p-2 rounded-lg text-gray-800"><div className="p-2 bg-orange-100 rounded text-orange-600"><Presentation size={20}/></div><div><div className="font-bold">{msg.fileName}</div><div className="text-xs text-gray-500">2.4 MB • PPTX</div></div></div>
                                    ) : (<p>{msg.content}</p>)}
                                    {msg.type === 'help' && (
                                        <div className="mt-2 pt-2 border-t border-red-100 flex items-center gap-2 text-xs text-red-500 font-bold">
                                            <AlertCircle size={12} /> Requesting Help
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-2 shadow-inner flex items-end gap-2">
                         <div className="flex gap-1 pb-2 pl-1">
                             <button className="p-1.5 text-gray-400 hover:bg-gray-200 rounded transition-colors"><Plus size={18}/></button>
                             <button className="p-1.5 text-gray-400 hover:bg-gray-200 rounded transition-colors"><ImageIcon size={18}/></button>
                             <button className="p-1.5 text-gray-400 hover:bg-gray-200 rounded transition-colors"><Paperclip size={18}/></button>
                         </div>
                         <div className="flex-1 py-2">
                             <input className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400" placeholder={`Message #${activeChannelId.split('-')[0]}...`} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
                         </div>
                         <div className="flex gap-1 pb-2 pr-1 relative">
                             {/* Emoji Picker Popover */}
                             {showEmojiPicker && (
                                <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 shadow-xl rounded-xl p-2 grid grid-cols-4 gap-1 w-40 z-50 animate-in fade-in zoom-in-95 duration-200">
                                    {emojiList.map(emoji => (
                                        <button 
                                            key={emoji} 
                                            onClick={() => handleAddEmoji(emoji)}
                                            className="text-xl hover:bg-gray-100 p-1.5 rounded transition-colors"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                             )}
                             <button 
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className={`p-1.5 rounded transition-colors ${showEmojiPicker ? 'bg-purple-50 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                             >
                                 <Smile size={18}/>
                             </button>
                             <button onClick={handleSendMessage} className={`p-2 ${theme.bg} ${theme.text} rounded-lg hover:brightness-90 transition-all`}><Send size={16}/></button>
                         </div>
                    </div>
                </div>
            </div>
            {/* Right Chat Sidebar with Cloudy AI */}
            <div className="w-72 border-l border-gray-200 bg-white hidden xl:flex flex-col">
                 <div className="p-6 border-b border-gray-100 text-center">
                      <div className={`w-16 h-16 mx-auto ${theme.bg} ${theme.text} rounded-2xl flex items-center justify-center mb-3`}><Hash size={32} /></div>
                      <h2 className="font-bold text-gray-900">#{activeChannelId.split('-')[0]}</h2>
                      <p className="text-xs text-gray-500 mt-1">{activeProject.name}</p>
                 </div>
                 
                 <div className="flex-1 overflow-y-auto p-4 space-y-6">
                      {/* Cloudy AI Assistant Card */}
                      <div className="bg-gradient-to-b from-purple-50 to-white border border-purple-100 rounded-xl p-4 shadow-sm relative overflow-hidden">
                          <div className="flex items-center gap-2 mb-3">
                              <CloudyLogo size={20} className="text-purple-600" />
                              <span className="text-xs font-bold text-purple-700">Cloudy</span>
                              <span className="text-[10px] text-purple-400 bg-purple-50 px-1.5 py-0.5 rounded-full ml-auto">Beta</span>
                          </div>
                          <div className="space-y-3">
                              <div className="bg-purple-50/50 p-2 rounded-lg border border-purple-50">
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    <span className="font-semibold text-purple-800">Daily Summary:</span> The team discussed storyboard updates. Charlotte requested help with the API timeout issue.
                                </p>
                              </div>
                              <div className="flex gap-2">
                                   <button className="text-[10px] bg-white border border-purple-100 text-purple-600 px-2 py-1.5 rounded-lg hover:bg-purple-50 transition-colors flex-1 shadow-sm">Summarize Chat</button>
                                   <button className="text-[10px] bg-white border border-purple-100 text-purple-600 px-2 py-1.5 rounded-lg hover:bg-purple-50 transition-colors flex-1 shadow-sm">Find Tasks</button>
                              </div>
                              <div className="relative">
                                  <input 
                                      className="w-full bg-white border border-purple-100 rounded-lg pl-3 pr-8 py-2 text-xs focus:outline-none focus:border-purple-300 placeholder-purple-300 shadow-sm"
                                      placeholder="Ask Cloudy..."
                                  />
                                  <button className="absolute right-2 top-1.5 text-purple-400 hover:text-purple-600">
                                      <Send size={12} />
                                  </button>
                              </div>
                          </div>
                      </div>

                      <section>
                          <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center justify-between">Members <span className="bg-gray-100 text-gray-600 px-1.5 rounded-full">{activeProject.members.length}</span></h3>
                          <div className="space-y-2">
                              {activeProject.members.map(m => (
                                  <div key={m.id} className="flex items-center gap-2 text-sm"><MemberAvatar userId={m.id} size="xs" /><span className="text-gray-700">{m.name}</span></div>
                              ))}
                          </div>
                      </section>
                 </div>
            </div>
        </div>
    );
};

export default MessagesModule;
