// hooks/use-custom-toast.ts
import { toast } from "@/components/ui/use-toast";

interface ToastOptions {
  title?: string;
  description: string;
  variant?: "default" | "destructive";
}

/**
 * Custom hook for showing toast notifications
 */
export function useCustomToast() {
  const showToast = ({
    title,
    description,
    variant = "default",
  }: ToastOptions) => {
    toast({
      title,
      description,
      variant,
    });
  };

  return {
    toast: showToast,
    success: (description: string, title?: string) =>
      showToast({ description, title, variant: "default" }),
    error: (description: string, title?: string) =>
      showToast({ description, title, variant: "destructive" }),
  };
}
