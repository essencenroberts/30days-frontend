// select will be the dropdown with a label and errors

import { useId } from "react";
import type { SelectHTMLAttributes } from "react";

// interface for Select value and label

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;

}

function Select({ label, options, error, placeholder, id, className = '', ...rest }: SelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;

  return(
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-semibold text-ink">{label}</label>

      <select
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={[
          'min-h-12 rounded-xl border bg-white px-4 text-base',
          'focus:border-brand focus:ring-2 focus:ring-brand-light focus:outline-none',
          error ? 'border-red-700' : 'border-gray-300',
          className,
        ].join('')}
        {...rest}
      >
        {placeholder &&(
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* // error */}
      {error && (
        <p
          id={errorId} className="text-sm text-red-700"
        >{error}</p>
      )}
    </div>
  )
}

export default Select;