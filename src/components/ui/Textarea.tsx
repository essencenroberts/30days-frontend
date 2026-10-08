// textarea for loger input includes label and error 
import { useId } from "react";
import type { TextareaHTMLAttributes } from "react";

// interface for Textarea Props
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  showCount?: boolean; // the number to hsow how much user has typed 
}

// Textarea
function Textarea({ label, error, showCount = false, id, maxLength, value, className = '', ...rest }: TextareaProps ) {
  
  const generatedId = useId();
  const textareaId = id || generatedId;
  const errorId = `${textareaId}-error`;

  // characters type
  const charCount = String(value ?? '').length;
  
  return(
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="text-sm font-semibold text-ink">
        {label}
      </label>

      <textarea
        id={textareaId}
        value={value}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={[
          'min-h-28 rounded-xl border bg-white px-4 py-3 text-base',
          'focus:border-brand focus:ring-2 focus:ring-brand-light focus:outline-none',
          error ? 'border-red-700' : 'border-gray-300',
          className,
        ].join(' ')}
        {...rest}
       />

      <div className="flex justify-between gap-4 text-sm">
        {error ? (
          <p id={errorId} className="text-red-700">    {error}
          </p>
        ) : (
          <span />
        )}
        {showCount && maxLength && (
          <span className="text-gray-500">
            {charCount} / {maxLength}
          </span>
        )}
      </div>
    </div>
  )
}