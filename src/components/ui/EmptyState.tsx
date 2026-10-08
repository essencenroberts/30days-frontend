// this will be what shows when there's nothing yet 
import type { ReactNode } from "react";

// EmptyState props
interface EmptyStateProps {
  title: string;
  message: string;
  aciton?: ReactNode;
}

// EmptyState function

function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-gray-300 bg-white px-6 py-14 text-center">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="max-w-md text-gray-600">{message}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export default EmptyState;