import { cva, type VariantProps } from "class-variance-authority";
import { User } from "lucide-react";
import { useState } from "react";

const avatarVariant = cva(
  "rounded-full object-cover bg-muted flex items-center justify-center w-12 h-12"
);

type AvatarVariant = VariantProps<typeof avatarVariant>;

export type AvatarProps = React.ImgHTMLAttributes<HTMLImageElement> &
  AvatarVariant;

export const Avatar = ({ className, src, alt }: AvatarProps) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={avatarVariant({ className })}>
        <User color="black" className="" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={avatarVariant({ className })}
      onError={() => setError(true)}
    />
  );
};
