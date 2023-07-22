import * as React from 'react';

enum ButtonVariant {
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
}

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button
        className={`outline-solid active:bg-fg-80 mb-8 transform rounded-lg bg-fg px-3 py-2 font-primary text-bg  transition-all duration-300 hover:bg-fg/90 active:shadow-none ${className}`}
        {...rest}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
