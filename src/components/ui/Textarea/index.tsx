import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const textareaVariant = cva(
  "w-full px-4 py-2 border rounded-lg outline-none ring-2 ring-transparent focus:ring-ring bg-foreground border-border transition resize-vertical min-h-40",
  {
    variants: {
      error: {
        true: "border-red-500 focus:ring-red-500",
        false: "border-border focus:ring-ring",
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

const labelVariant = cva("block text-sm font-medium mb-2");

const errorTextVariant = cva("text-sm text-red-500 mt-1");

type TextareaVariant = VariantProps<typeof textareaVariant>;

export type TextareaProps = TextareaVariant &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    errorMessage?: string;
  };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { placeholder, className, onChange, label, error, errorMessage, ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={label} className={labelVariant()}>
            {label}
          </label>
        )}
        <textarea
          {...props}
          ref={ref}
          id={label}
          name={label}
          className={textareaVariant({ error, className })}
          placeholder={placeholder || "Enter text..."}
          onChange={onChange}
        />
        {error && errorMessage && (
          <p className={errorTextVariant()}>{errorMessage}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
