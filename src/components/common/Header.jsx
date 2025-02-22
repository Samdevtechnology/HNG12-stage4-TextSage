import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "./ThemeToggle";
import { useStore } from "@/store/chat";
import { Button } from "../ui/button";
import { MessageSquareShare } from "lucide-react";

const Header = () => {
  const { createChat, setCurrentChat, chats } = useStore();
  const hasEmptyChat = chats.some((chat) => chat.messages.length === 0);

  const handleNewChat = () => {
    if (hasEmptyChat) {
      const emptyChat = chats.find((chat) => chat.messages.length === 0);
      setCurrentChat(emptyChat.id);
    } else {
      createChat("New Chat");
    }
  };

  return (
    <header className="flex justify-between bg-[#f3f4f6] dark:bg-[#404045] shrink-0 w-full z-50 shadow-[0px_0px_0px_0.5px_#dce0e9] dark:shadow-[0px_0px_0px_0.5px_##c0c0c04d] sticky top-0 mx-auto max-w-6xl rounded items-center px-6 py-4">
      <div className="flex gap-8 items-center">
        <span className="flex justify-center items-center">
          <SidebarTrigger />
        </span>
        <div className="flex items-center gap-1">
          <Link href="/">
            <div className="logo text-4xl font-bold">
              <span className="text-[#907AD6] dark:text-[#DABFFF]">Text</span>
              <span className="text-[#FA9F42] dark:text-[#FCAF58]">Sage</span>
            </div>
          </Link>
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
      {!hasEmptyChat && (
        <div className="hidden sm:block">
          <Button
            disabled={hasEmptyChat}
            onClick={handleNewChat}
            className="w-full"
            variant="outline"
          >
            New Chat
            <MessageSquareShare />
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
