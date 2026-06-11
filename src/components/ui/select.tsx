import { cn } from "@/utils/cn";

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn("h-10 w-full rounded-md border bg-background px-3 text-sm focus-visible:outline focus-visible:outline-2", props.className)}
    />
  );
}
