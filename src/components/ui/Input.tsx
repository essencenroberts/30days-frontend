// input file - text box
import { useId } from 'react' // to generate unique id
import type { InputHTMLAttributes } from 'react' // sets rules

// allow Input to accept everying normal <inputs> accept 
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

function Input({ label, error, helperText, id, className ='', ...rest}: InputProps) {
  const generateId = useId();
  const inputId = id || generateId;

  // id for message under box so screen readers and read
  const messageId = `${inputId}-message`;

  return (
    <div className='flex flex-col gap-1.5'>
      {/* use htmlFor to connect lavel to input id */}
      <label htmlFor={inputId} className='text-sm font-semibold text-ink'> 
        {label}
      </label>

      <input
        id={inputId}
        aria-invalid={error || helperText ? messageId : undefined}
        className={[
          'min-h-12 rounded-xl border bg-white px-4 text-base',
          'focus:border-brand focus:ring-2 focus:ring-brand-light focus:outline-none',
          error ? 'border-red-700' : 'border-gray-300',
          className,          
        ].join('')}
        {...rest}
      />

      {/* show error if there is one or the helper text */}
      {error && (
        <p id={messageId} className='text-sm text-red-700'>{error}</p>
      )}
      {!error && helperText && (
        <p id={messageId} className='text-sm text-gray-500'>{helperText}</p>
      )}
    </div>
  );
}

export default Input;