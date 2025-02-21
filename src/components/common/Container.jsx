import { cn } from "@/lib/utils";

const Container = ({ children, className = "", Variant = "div" }) => {
  return <Variant className={cn(``, className)}>{children}</Variant>;
};

export default Container;
