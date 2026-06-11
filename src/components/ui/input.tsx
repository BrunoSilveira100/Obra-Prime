import { cn } from "@/utils/cn";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-2",
        props.className
      )}
    />
  );
}
