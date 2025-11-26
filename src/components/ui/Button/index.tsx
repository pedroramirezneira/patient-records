import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

const buttonVariant = cva(
  "py-2 px-4 rounded-xl font-medium hover:cursor-pointer inline-flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-ring",
  {
    variants: {
      variant: {
        filled: "bg-primary text-foreground hover:bg-primary-hover",
        outlined: "border border-primary text-primary hover:bg-primary-light",
        ghost: "text-primary hover:bg-primary-light",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base",
        lg: "text-lg px-5 py-3",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariant>;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants;

export const Button = ({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button {...props} className={buttonVariant({ variant, size, className })}>
      {children}
    </button>
  );
};
