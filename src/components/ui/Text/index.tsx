import { cva, type VariantProps } from "class-variance-authority";

const textVariant = cva("text-base", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
  },
});

type TextVariants = VariantProps<typeof textVariant>;

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> &
  TextVariants;

export const Text = ({
  size,
  weight,
  className,
  children,
  ...props
}: TextProps) => {
  return (
    <p {...props} className={textVariant({ size, weight, className })}>
      {children}
    </p>
  );
};
