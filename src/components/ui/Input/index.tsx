import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const inputVariant = cva(
  "w-full px-4 py-2 border rounded-lg outline-none ring-2 ring-transparent focus:ring-ring bg-foreground border-border transition"
);

const labelVariant = cva("block text-sm font-medium mb-2");

type InputVariant = VariantProps<typeof inputVariant>;

export type InputProps = InputVariant &
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, className, onChange, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={label} className={labelVariant()}>
            {label}
          </label>
        )}
        <input
          {...props}
          ref={ref}
          id={label}
          name={label}
          type="text"
          className={inputVariant({ className })}
          placeholder={placeholder || "Enter text..."}
          onChange={onChange}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
