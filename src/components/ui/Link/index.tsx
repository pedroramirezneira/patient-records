import { cva, type VariantProps } from "class-variance-authority";

const linkVariant = cva("text-primary hover:underline cursor-pointer");

type LinkVariant = VariantProps<typeof linkVariant>;

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkVariant;
export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <a {...props} className={linkVariant({ className })}>
      {children}
    </a>
  );
};
