
type ButtonVariant = 'solid' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonColor = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: ButtonVariant; 
    size?: ButtonSize;
  color?: ButtonColor;
    children: React.ReactNode;
  }

  export const Button = ({
    variant = 'solid', // Default value here instead
    size = 'md',
    color = 'primary',
    children,
    ...props
  }: ButtonProps) => {
    return (
      <button 
      className={`button button--${variant} button--${size} button--${color}`} 
        {...props}
      >
        {children}
      </button>
    );
  };

export default Button;