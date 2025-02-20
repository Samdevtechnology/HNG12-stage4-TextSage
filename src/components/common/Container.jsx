import { cn } from "@/lib/utils";

const Container = ({ children, className = "", Variant = "div" }) => {
  return (
    <Variant
    //   className={cn(
    //     `px-6 md:px-8 lg:px-12 w-full max-w-[90rem] mx-auto`,
    //     className
    //   )}
    >
      {children}
    </Variant>
  );
};

export default Container;
