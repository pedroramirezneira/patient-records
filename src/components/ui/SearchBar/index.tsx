import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const searchBarVariant = cva(
  "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-foreground border border-border focus:ring-ring transition"
);

type SearchBarVariant = VariantProps<typeof searchBarVariant>;

export type SearchBarProps = SearchBarVariant &
  HTMLAttributes<HTMLInputElement> & {
    placeholder?: string;
  };

export const SearchBar = ({
  placeholder,
  className,
  onChange,
  ...props
}: SearchBarProps) => {
  return (
    <input
      {...props}
      type="text"
      className={searchBarVariant({ className })}
      placeholder={placeholder || "Search..."}
      onChange={onChange}
    />
  );
};
