import { cn } from "@/utils/cn";

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn("min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2", props.className)}
    />
  );
}
