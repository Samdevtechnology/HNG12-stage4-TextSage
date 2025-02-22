import ChatFlow from "@/components/common/ChatFlow";
import Header from "@/components/common/Header";
import ChatInput from "@/components/form/ChatInput";
import SideBar from "@/components/common/SideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useStore } from "@/store/chat";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Warning from "@/components/dialog/Warning";

const HomePage = () => {
  const currentChat = useStore((state) => state.getCurrentChat());
  const hasMessages = !currentChat || currentChat.messages.length > 0;
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <Warning />
      <SideBar />
      <SidebarInset className="bg-[url('/assets/noise.png')] bg-[#FAEBD7] dark:bg-[#292a2d] flex flex-col h-full min-h-screen">
        <Header />
        <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto rounded-xl">
          {hasMessages ? (
            // Layout when there are messages
            <div className="flex-1 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-6">
                <ChatFlow />
              </div>
              <div className="sticky bottom-0 p-2 pb-0">
                <ChatInput />
              </div>
            </div>
          ) : (
            // Centered layout when empty
            <div
              className={cn(
                `flex-1 flex flex-col h-full justify-center items-center p-4`,
                isMobile && "justify-end"
              )}
            >
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
