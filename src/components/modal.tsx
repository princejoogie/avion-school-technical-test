import React, {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Variants, AnimatePresence, motion } from "framer-motion";
import FocusLock from "react-focus-lock";
import { XIcon } from "@heroicons/react/outline";

import { IconButton } from "./icon-button";

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  handleClose: () => void;
  hideCloseButton?: boolean;
  backdropDismiss?: boolean;
  onExitComplete?: [
    "fired" | "completed" | undefined,
    Dispatch<SetStateAction<"fired" | "completed" | undefined>>
  ];
  ariaLabel?: string;
};

type ModalContentProps = HTMLAttributes<HTMLDivElement> & {
  handleClose?: () => void;
  ariaLabel?: string;
};

type BackdropProps = HTMLAttributes<HTMLDivElement> & {
  handleClose?: () => void;
};

const effect: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", duration: 0.3 },
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

const Backdrop = ({ children, handleClose }: BackdropProps) => (
  <motion.div
    className="bg-black bg-opacity-50 fixed flex items-center justify-center z-50 inset-0"
    onClick={handleClose}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

const ModalContent = ({
  className,
  children,
  handleClose,
  ariaLabel,
}: ModalContentProps) => (
  <motion.div
    tabIndex={-1}
    role="dialog"
    aria-modal
    aria-label={ariaLabel}
    className={`relative m-5 p-5 bg-white border rounded-lg shadow-lg ${className}`}
    variants={effect}
    initial="hidden"
    animate="visible"
    exit="exit"
    onClick={(event) => event.stopPropagation()}
  >
    {children}
    {handleClose && (
      <IconButton
        className="absolute p-1 top-2 right-2"
        onClick={handleClose}
        aria-label={`Close ${ariaLabel || "dialog"}`}
      >
        <XIcon className="w-4 h-4" />
      </IconButton>
    )}
  </motion.div>
);

export const Modal = ({
  children,
  className,
  isOpen,
  handleClose,
  hideCloseButton,
  backdropDismiss = true,
  onExitComplete,
  ariaLabel,
}: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [trigger, setTrigger] = onExitComplete ?? [undefined, undefined];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen || event.key !== "Escape") return;

      handleClose();
    },
    [isOpen, handleClose]
  );

  useEffect(() => {
    if (!isOpen) return () => {};

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) return null;

  return createPortal(
    <AnimatePresence
      initial={false}
      exitBeforeEnter
      onExitComplete={() =>
        setTrigger && trigger === "fired" && setTrigger("completed")
      }
    >
      {isOpen && (
        <Backdrop handleClose={backdropDismiss ? handleClose : undefined}>
          <FocusLock>
            <ModalContent
              className={className}
              handleClose={hideCloseButton ? undefined : handleClose}
              ariaLabel={ariaLabel}
            >
              {children}
            </ModalContent>
          </FocusLock>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.getElementById("modal-portal")!
  );
};
