import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import ThemeToggle from "./ThemeToggle";
import { useStore } from "@/store/chat";
import { Button } from "../ui/button";
import { PanelRightOpen } from "lucide-react";

const Header = () => {
  const { toggleSidebar } = useSidebar();
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
    <header className="flex justify-between shrink-0 w-full z-50 sticky top-0 mx-auto max-w-6xl bg-gray-50 rounded items-center px-6 py-4">
      <div className="flex gap-8 items-center">
        <span className="flex justify-center items-center">
          <button className="p-0 w-fit" onClick={toggleSidebar}>
            <PanelRightOpen className="w-8 h-8" />
          </button>
        </span>
        <div className="flex gap-1">
          <Link href="/">
            <div className="logo text-4xl font-bold">TextSage</div>
          </Link>
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
      {!hasEmptyChat && (
        <div>
          <Button
            disabled={hasEmptyChat}
            onClick={handleNewChat}
            className="w-full"
            variant="outline"
          >
            New Chat
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
