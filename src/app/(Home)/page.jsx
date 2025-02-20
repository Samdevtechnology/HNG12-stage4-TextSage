"use client";

import ChatHistory from "@/components/ChatFlow";
import Header from "@/components/common/Header";
import ChatInput from "@/components/form/Input";
import Sidebar from "@/components/History";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useStore } from "@/store/chat";

const HomePage = () => {
  const currentChat = useStore((state) => state.getCurrentChat());
  const hasMessages = !currentChat || currentChat.messages.length > 0;

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset className="bg-[url('/assets/noise.png')] flex flex-col h-full min-h-screen">
        <Header />
        <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto rounded-xl">
          {hasMessages ? (
            // Layout when there are messages
            <div className="flex-1 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-6">
                <ChatHistory />
              </div>
              <div className="sticky bottom-0 p-2 pb-0">
                <ChatInput />
              </div>
            </div>
          ) : (
            // Centered layout when empty
            <div className="flex-1 flex flex-col h-full justify-center items-center p-4">
              <div className="w-full max-w-2xl">
                <ChatInput />
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default HomePage;
