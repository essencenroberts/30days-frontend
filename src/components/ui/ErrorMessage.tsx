// error box "try agin" button

import Button from "./Buttons";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void; 
}

// errorMessage function
function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div role="alert" className="flex flex-col items-start gap-3 rounded-2xl border border-red-200bg-red-50 p-5">
      <p className="font-semibold text-red-800">Something went wrong</p>
      <p className="text-sm text-red-700">{message}</p>
      {onRetry && (
        <Button variant="secondary">
          Try again
        </Button>
      )}
    </div>
  );
}

export default ErrorMessage;