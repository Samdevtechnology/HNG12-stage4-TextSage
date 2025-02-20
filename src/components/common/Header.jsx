import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import Theme from "./Themetoggle";

const Header = () => {
  return (
    <header className="flex justify-between shrink-0 items-center p-3">
      <span>
        <SidebarTrigger />
      </span>
      <Link href="/">
        <div className="logo text-4xl font-bold">TextSage</div>
      </Link>
      <div>
        <Theme />
      </div>
    </header>
  );
};

export default Header;
