import { cva, type VariantProps } from "class-variance-authority";
import { Text } from "../Text";
import type { HTMLAttributes } from "react";

const modalVariant = cva(
  "fixed absolute inset-0 h-screen w-screen bg-black/50 p-20 z-50"
);

type ModalVariant = VariantProps<typeof modalVariant>;

export type ModalProps = HTMLAttributes<HTMLDivElement> & ModalVariant;

export const Modal = ({ className }: ModalProps) => {
  return (
    <div className={modalVariant({ className })}>
      <div className="bg-foreground border border-border rounded-lg m-auto max-w-4xl h-full">
        <Text>Modal Content</Text>
      </div>
    </div>
  );
};
