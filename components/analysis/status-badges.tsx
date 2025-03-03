import { Badge } from "@/components/ui/badge";

/**
 * Displays an impact badge with color coding
 */
export function ImpactBadge({ impact }: { impact: string }) {
  const colorMap: Record<string, string> = {
    high: "bg-red-500/20 text-red-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    low: "bg-green-500/20 text-green-400",
  };

  return (
    <Badge
      className={`${
        colorMap[impact] || "bg-gray-500/20 text-gray-400"
      } capitalize`}
    >
      {impact}
    </Badge>
  );
}

/**
 * Displays an effort badge with color coding
 */
export function EffortBadge({ effort }: { effort: string }) {
  const colorMap: Record<string, string> = {
    high: "bg-red-500/20 text-red-400",
    medium: "bg-yellow-500/20 text-yellow-400",
    low: "bg-green-500/20 text-green-400",
  };

  return (
    <Badge
      className={`${
        colorMap[effort] || "bg-gray-500/20 text-gray-400"
      } capitalize`}
    >
      {effort}
    </Badge>
  );
}

/**
 * Displays a status badge for analysis status
 */
export function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    completed: {
      className: "bg-green-500/20 text-green-400",
      label: "Completed",
    },
    pending: {
      className: "bg-yellow-500/20 text-yellow-400",
      label: "Processing",
    },
    failed: {
      className: "bg-red-500/20 text-red-400",
      label: "Failed",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || {
    className: "bg-gray-500/20 text-gray-400",
    label: status,
  };

  return <Badge className={config.className}>{config.label}</Badge>;
}
