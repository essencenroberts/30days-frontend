// reusable button with different looks for edit, delete, save, add etc

import type { ButtonHTMLAttributes } from "react";

// button props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  fullWidth?: boolean;
  isLoading?: boolean;
}
// tailwdind classes for the different styles
const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'border-2 border-ink bg-white text-ink hover:bg-gray-100',
  ghost: 'bg-transparent text-ink hover:bg-gray-100',
  danger: 'bg-red-700 text-white hover:bg-red-800',
};

function Button({
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  type = 'button',
  disabled,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={[
        'inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibolld transition',
        'disabled: cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        fullWidth ? 'w-full' : '',
        className,
      ].join('')}

      {...rest}
    >
      {isLoading ? 'Loading..' : children}
    </button>
  );
}

export default Button;