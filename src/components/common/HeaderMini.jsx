import { PanelRightOpen } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

const HeaderMini = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className="mx-auto w-full flex justify-start cursor-pointer items-center max-w-6xl px-4 py-2">
      <button
        onClick={toggleSidebar}
        className="flex items-center p-2 gap-2 hover:underline underline-offset-4"
      >
        <PanelRightOpen className="w-8 h-8" />
        <div variant="text" className="text-xl sm:text-2xl font-medium">
          History
        </div>
      </button>
    </div>
  );
};

export default HeaderMini;
