import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

const buttonVariant = cva(
  "py-2 px-4 rounded-xl font-medium hover:cursor-pointer inline-flex items-center justify-center transition focus:outline-none",
  {
    variants: {
      variant: {
        filled:
          "bg-primary text-foreground hover:bg-primary-hover focus:ring-2 focus:ring-ring",
        outlined:
          "border border-primary text-primary hover:bg-primary-light focus:ring-2 focus:ring-ring",
        ghost:
          "text-primary hover:bg-primary-light focus:ring-2 focus:ring-ring",
        text: "text-primary hover:underline p-0",
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
