import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { Button } from "../Button";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";
import { Text } from "../Text";

const modalVariant = cva(
  "fixed absolute inset-0 h-screen w-screen bg-black/50 p-8 z-50 overflow-y-hidden flex items-center justify-center"
);

type ModalVariant = VariantProps<typeof modalVariant>;

export type ModalProps = HTMLAttributes<HTMLDivElement> &
  ModalVariant & {
    title?: string;
    onClose?: () => void;
  };

export const Modal = ({ className, onClose, children, title }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <motion.div
      className={modalVariant({ className })}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={handleBackdropClick}
    >
      <motion.div
        className="bg-foreground border border-border rounded-lg max-w-4xl max-h-full p-8 flex flex-col gap-4 overflow-y-auto w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-center">
          {title && (
            <Text size={"lg"} weight={"bold"}>
              {title}
            </Text>
          )}
          <Button variant={"ghost"} onClick={onClose}>
            <X />
          </Button>
        </div>
        <div className="flex flex-col">{children}</div>
      </motion.div>
    </motion.div>
  );
};
