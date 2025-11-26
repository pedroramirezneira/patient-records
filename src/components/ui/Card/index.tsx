import { useState, type HTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "../Button";

const cardVariant = cva("bg-foreground rounded-xl border border-border");

type CardVariants = VariantProps<typeof cardVariant>;

export type CardProps = HTMLAttributes<HTMLDivElement> &
  CardVariants & {
    expandedContent?: ReactNode;
    initialExpanded?: boolean;
  };

export const Card = ({
  children,
  className,
  expandedContent,
  initialExpanded = false,
  ...props
}: CardProps) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const canExpand = expandedContent;

  return (
    <div
      style={{ cursor: canExpand ? "pointer" : "default" }}
      onClick={() => setIsExpanded((prev) => !prev)}
      className={cardVariant({ className })}
      {...props}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 overflow-x-hidden">{children}</div>

        {canExpand && (
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded((prev) => !prev);
            }}
            className="h-12 w-12"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown />
            </motion.div>
          </Button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {canExpand && isExpanded && (
          <motion.div
            key="expanded-content"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border hover:cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">{expandedContent}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
