import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, 
  MessageSquare, 
  Search, 
  MoreHorizontal, 
  Plus, 
  X,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatFolder {
  id: string;
  name: string;
  chats: Chat[];
  isExpanded?: boolean;
}

interface Chat {
  id: string;
  title: string;
  preview: string;
  isActive?: boolean;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  className?: string;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isOpen,
  onToggle,
  onNewChat,
  className,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [folders, setFolders] = React.useState<ChatFolder[]>([
    {
      id: "work",
      name: "Work chats",
      isExpanded: true,
      chats: [],
    },
    {
      id: "life",
      name: "Life chats",
      isExpanded: true,
      chats: [],
    },
    {
      id: "projects",
      name: "Projects chats",
      isExpanded: true,
      chats: [],
    },
    {
      id: "clients",
      name: "Clients chats",
      isExpanded: true,
      chats: [],
    },
  ]);

  const [individualChats] = React.useState<Chat[]>([
    {
      id: "plan-trip",
      title: "Plan a 3-day trip",
      preview: "A 3-day trip to see the northern lights in Norway...",
      isActive: false,
    },
    {
      id: "loyalty-program",
      title: "Ideas for a customer loyalty program",
      preview: "Here are seven ideas for a customer loyalty...",
    },
    {
      id: "help-pick",
      title: "Help me pick",
      preview: "Here are some gift ideas for your friend doing...",
    },
  ]);

  const toggleFolder = (folderId: string) => {
    setFolders(folders.map(folder => 
      folder.id === folderId 
        ? { ...folder, isExpanded: !folder.isExpanded }
        : folder
    ));
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : "-100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed lg:relative z-50 lg:z-auto",
          "w-80 h-full",
          "bg-sidebar border-r border-sidebar-border",
          "flex flex-col",
          "lg:translate-x-0",
          className
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border-2 border-primary-foreground flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                </div>
              </div>
              <h1 className="font-medium text-sidebar-foreground">My Chats</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-sidebar-foreground/60 hover:text-sidebar-foreground">
                <MoreHorizontal className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                className="lg:hidden p-1.5 text-sidebar-foreground/60 hover:text-sidebar-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sidebar-foreground/40" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-sidebar-accent rounded-lg pl-10 pr-4 py-2.5 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/40 border-none focus:outline-none focus:ring-2 focus:ring-sidebar-primary"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Folders */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider">
                Folders
              </h2>
              <div className="flex items-center gap-1">
                <button className="p-1 text-sidebar-foreground/40 hover:text-sidebar-foreground">
                  <Plus className="w-3 h-3" />
                </button>
                <button className="p-1 text-sidebar-foreground/40 hover:text-sidebar-foreground">
                  <MoreHorizontal className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {folders.map((folder) => (
                <div key={folder.id}>
                  <button
                    onClick={() => toggleFolder(folder.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent text-left group"
                  >
                    <Folder className="w-4 h-4 text-sidebar-foreground/60" />
                    <span className="flex-1 text-sm text-sidebar-foreground">
                      {folder.name}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-sidebar-accent rounded">
                      <MoreHorizontal className="w-3 h-3 text-sidebar-foreground/40" />
                    </button>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Chats */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider">
                Chats
              </h2>
              <button className="p-1 text-sidebar-foreground/40 hover:text-sidebar-foreground">
                <MoreHorizontal className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-1">
              {individualChats.map((chat) => (
                <motion.button
                  key={chat.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "w-full flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-sidebar-accent text-left group",
                    chat.isActive && "bg-sidebar-accent"
                  )}
                >
                  <MessageSquare className="w-4 h-4 text-sidebar-foreground/60 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-sidebar-foreground font-medium mb-1 truncate">
                      {chat.title}
                    </div>
                    <div className="text-xs text-sidebar-foreground/60 line-clamp-2">
                      {chat.preview}
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-sidebar-accent rounded flex-shrink-0">
                    <MoreHorizontal className="w-3 h-3 text-sidebar-foreground/40" />
                  </button>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            New chat
          </button>
        </div>
      </motion.aside>
    </>
  );
};