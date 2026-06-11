import { cloneElement, isValidElement } from "react";
import { cn } from "@/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "icon";
  asChild?: boolean;
};

export function Button({ className, variant = "primary", size = "md", asChild, children, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition focus-visible:outline focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" && "bg-primary text-primary-foreground hover:opacity-90",
    variant === "secondary" && "bg-muted text-foreground hover:bg-muted/80",
    variant === "outline" && "border bg-transparent hover:bg-muted",
    variant === "ghost" && "hover:bg-muted",
    variant === "destructive" && "bg-destructive text-destructive-foreground hover:opacity-90",
    size === "md" && "h-10 px-4",
    size === "sm" && "h-8 px-3",
    size === "icon" && "h-10 w-10",
    className
  );

  if (asChild && isValidElement<{ className?: string }>(children)) {
    return cloneElement(children, {
      className: cn(classes, children.props.className)
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
