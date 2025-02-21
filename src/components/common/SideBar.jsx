import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useStore } from "@/store/chat";
import { Button } from "@/components/ui/button";
import { MessageSquareShare, Trash2 } from "lucide-react";

const SideBar = () => {
  const {
    getGroupedChats,
    createChat,
    deleteChat,
    setCurrentChat,
    currentChatId,
    chats,
  } = useStore();

  const { toggleSidebar } = useSidebar();
  const hasEmptyChat = chats.some((chat) => chat.messages.length === 0);
  const groupedChats = getGroupedChats();

  const handleNewChat = () => {
    if (hasEmptyChat) {
      const emptyChat = chats.find((chat) => chat.messages.length === 0);
      setCurrentChat(emptyChat.id);
    } else {
      toggleSidebar();
      createChat("New Chat");
    }
  };

  const handleClick = (chatId) => {
    setCurrentChat(chatId);
    toggleSidebar();
  };

  return (
    <Sidebar className="w-64 h-screen bg-[#eadac5] dark:bg-[#212327] p-4 bg-[url('/assets/noise.png')] border-r overflow-auto">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="mt-8 sm:mt-0 mb-4">
              <Button
                disabled={hasEmptyChat}
                onClick={handleNewChat}
                className="w-full"
                variant="outline"
              >
                <MessageSquareShare />
                New Chat
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {Object.entries(groupedChats).map(
              ([group, chats]) =>
                chats.length > 0 && (
                  <SidebarMenuItem key={group} className="mb-4">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 capitalize">
                      {group}
                    </h3>
                    <div className="space-y-1">
                      {chats.map((chat) => (
                        <div
                          key={chat.id}
                          className={`flex items-center justify-between p-2 rounded-lg hover:bg-accent cursor-pointer ${
                            currentChatId === chat.id ? "bg-accent" : ""
                          }`}
                          onClick={() => handleClick(chat.id)}
                        >
                          <span className="truncate text-sm">{chat.title}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteChat(chat.id);
                            }}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </SidebarMenuItem>
                )
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideBar;
